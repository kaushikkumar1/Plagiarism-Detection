const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const PlagarismData = require('../models/contestPlagiarismDataModel')
const Contest = require('../models/contest');
var fs = require('fs');
const scraperConfig = require('../config/scraperConfig');

const template = require('lodash.template');
const async = require('async');
const hackerrankLib = require('../lib/hackerrankLib');
const judgeSubmissionsUrl = template(scraperConfig.hackerrank.hr_judge_submissions_url);

const log4js = require('log4js');
const log = log4js.getLogger('hrSubmissionsCrawler');
var config =require('../config/config').get_active_config();
log.level = config.log4jsLevel;
var hackerank_contest_submission = require('../crawlers/hackerrank_contest_submissions');



exports.getContestDetail = async function (req, res) {
    try {
        let user = req.body;
        user.user_id = req.user._id;
        let find_contest =await Contest.findOne({contest_name:req.body.contest_name});
        if(find_contest){ 
           await Contest.updateOne({contest_name:req.body.contest_name},req.body);
        } else{
             var new_contest = new Contest(req.body);
             new_contest=await new_contest.save();
             console.log(new_contest);
        }
        let model = {offset: 0, limit: 100, contest_name: user.contest_name};
        const headers = {
            'User-Agent': scraperConfig.common.agent,
            'cookie' : (user._hrank_session)
        };

        if(scraperConfig.hackerrank.contest_running){
            res.status(200).send({status:"running",data:scraperConfig.hackerrank.contest_running});
        } else{
            hackerrankLib.getOffsetAndPageCount(judgeSubmissionsUrl,model,headers, function(err, data){
                if(err) {
                    console.log("Error");
                    res.status(200).send({status:"error",data:"invalid session id or contest name"});
                }
                else { 
                    console.log("No Error")
                    scraperConfig.hackerrank.contest_running=user.contest_name;
                    hackerank_contest_submission.crawler(user);

                    res.status(200).send({status:"started crawling",data:user.contest_name});
                }
            });
        }
    } catch {
        console.log(error);
        res.status(500).send({
            status:"error",
            data:error
        });
    }
}


exports.getContestsOfUser = async function (req, res) {
    try {
        console.log(req.user);
        let user_contests = await Contest.find({user_id:req.user._id});
        res.status(200).send({data:user_contests});     
    } catch(error) {
        console.log(error);
        res.status(500).send({status:"error", data:error});
    }
}



exports.getProblemsOfContest = async function (req, res) {
    try {
        console.log(req.body);
        let contest_name = [];
        let contest_id = [];
        for(let i =0; i< req.body.contests.length; i++) {
            contest_name.push(req.body.contests[i].contest_name);
        }

        contest_id = await Submission.distinct('contest_id',{contest_name:{$in:contest_name}});

        let crawled_problems =await PlagarismData.distinct('problem_name',{contestId:{$in:contest_id}})

        let queryO={contest_name:{$in:contest_name}}
    
        let problem_names= await  Submission.aggregate([{
                $match: queryO
            },{
                $group: {
                    _id: {
                        problem_names: "$problem_name",
                        problem_id: "$problem_id"
                    }
                }
        }]);


        let problems = [];
        for(let i=0;i<problem_names.length;i++){
            let temp = {};
            temp.item_id=problem_names[i]._id.problem_id;
            temp.item_text=problem_names[i]._id.problem_names;
            problems.push(temp);
        }

        res.status(200).send({
            data:problems,
            crawled_problems,
        });     
    } catch(error) {
        console.log(error);
        res.status(500).send({status:"error", data:error});
    }
}
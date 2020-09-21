const template = require('lodash.template');
const submissionModel = require('../models/submissionModel');
const async = require('async');
const dbconnect = require('../db/connect');
const scraperConfig = require('../config/scraperConfig');
const hackerrankLib = require('../lib/hackerrankLib');
const utilityLib = require('../lib/utilityLib');
const judgeSubmissionsUrl = template(scraperConfig.hackerrank.hr_judge_submissions_url);
const codeSubmissionsUrl = template(scraperConfig.hackerrank.hr_submission_id_to_code_url);
const itemLib = require('../lib/itemLib');
const chalk =require('chalk');

const log4js = require('log4js');
const log = log4js.getLogger('hrSubmissionsCrawler');
var config =require('../config/config').get_active_config();
log.level = config.log4jsLevel;
// var contest_name = 'bz-p2-contest';

var submissionIdx = 1;
dbconnect.connect(false);
module.exports.crawlContestSubmissions = function(contest_name, hackerrank_options){
    try{
        let model = {offset: 0, limit: 100, contest_name: contest_name};
        hackerrankLib.getOffsetAndPageCount(judgeSubmissionsUrl,model, hackerrank_options.headers, function(err, res){
            var totalSubmissions = res.total;
            var allPages = [];
            for (var page = 0; page <= res.pages; page++)
                allPages.push(page);
            async.eachSeries(allPages, function(currentPage, next){
                model.offset = currentPage * model.limit;
                hackerrankLib.getCurrentLeaderboardPage(judgeSubmissionsUrl, model, hackerrank_options.headers, function(err, result){
                    var leaderboardUsers = result.models;
                    async.eachSeries(leaderboardUsers, function(currentLBUser, nextLB){
                        log.info("PAGE : %d of %d SUBMISSION %d of %d SUBMISSIONID: ", currentPage, res.pages, submissionIdx++, totalSubmissions, currentLBUser.id);
                        var searchQuery = {
                            site_submission_id: currentLBUser.id,
                            site_name: 'HACKERRANK'
                        };
                        itemLib.getSingleItemByQuery(searchQuery, submissionModel, function(err, submissionDbItem){
                            if(submissionDbItem){
                                console.log("SKIPPING STORING OF " + currentLBUser.id);
                                if(hackerrank_options.preempt_if_submission_id_found)
                                    nextLB({message: 'Exiting as submission id is already found'});
                                else
                                    nextLB();
                                //setTimeout(() => {  nextLB();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));                    
                            }
                            else{
                                model.site_submission_id = currentLBUser.id;
                                var s = new Date(parseInt(currentLBUser.created_at)*1000).toLocaleDateString("en-US");
                                s=s.replace("/", "-");
                                s=s.replace("/", "-");
                                //var tempName=model.contest_name+"-"+s;
                                var tempName = contest_name;
                                console.log(tempName);
                                console.log( chalk.red(tempName));
                                var submissionObject = {
                                    submission_code: '',
                                    contest_name : tempName,
                                    site_name: 'HACKERRANK',
                                    site_submission_id: currentLBUser.id,
                                    contest_id: currentLBUser.contest_id,
                                    problem_id: currentLBUser.challenge_id,
                                    site_user_id: currentLBUser.hacker_id,
                                    submission_status: currentLBUser.status,
                                    submission_language: currentLBUser.language,
                                    site_user_handle: currentLBUser.hacker_username,
                                    in_contest_bounds: currentLBUser.in_contest_bounds,
                                    submission_status_code: currentLBUser.status_code,
                                    problem_name: currentLBUser.challenge.name,
                                    problem_view_link: currentLBUser.challenge.slug,
                                    created_at_ms: currentLBUser.created_at,
                                    updated_at_ms: currentLBUser.inserttime,
                                    misc_notes: JSON.stringify(currentLBUser.testcase_message)
                                };
                                if(hackerrank_options.fetch_code){
                                    hackerrankLib.getSubmissionCode(codeSubmissionsUrl, model, hackerrank_options.headers, function(err, result){
                                        submissionObject.submission_code = result.submission_code;
                                        itemLib.createitem(submissionObject, submissionModel, function(err, res){
                                            //console.log(submissionObject);
                                            setTimeout(() => {  nextLB();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));                    
                                        });
                                    });  
                                }
                                else{
                                    itemLib.createitem(submissionObject, submissionModel, function(err, res){
                                        //console.log(submissionObject);
                                        nextLB();
                                        //setTimeout(() => {  nextLB();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));                    
                                    });
                                }
                            }
                        });
                    }, 
                    function(err){
                        if(err)
                            next(err);
                        else
                            setTimeout(() => {  next();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));                    
                    });
              });
            },
            function(err){
                console.log(JSON.stringify(err));
                console.log("Crawling Completed");
                dbconnect.disconnect();
            });
        });
    }
    catch(error){
        console.log(error);
    }
}


const headers = {
    'User-Agent': scraperConfig.common.agent,
    'cookie' : (scraperConfig.hackerrank.cookie)
};

var hackerrank_options = { headers: headers, fetch_code: false, preempt_if_submission_id_found: true};
var contest_name = 'bz-p2-contest';
module.exports.crawlContestSubmissions(contest_name, hackerrank_options);

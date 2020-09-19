const template = require('lodash.template');
const scraperConfig = require('../config/scraperConfig');
const vjudgeLib = require('../lib/vjudgeLib');
const async = require('async');
const submissionModel = require('../models/submissionModel');
const itemLib = require('../lib/itemLib');
const utilityLib = require('../lib/utilityLib');

const judgeSubmissionsUrl = template(scraperConfig.vjudge.vj_judge_submissions_url);
const contestDetailsUrl = template(scraperConfig.vjudge.vj_contest_details_url);


const log4js = require('log4js');
const log = log4js.getLogger('vjSubmissionsCrawler');
var config =require('../config/config').get_active_config();
log.level = config.log4jsLevel;
var contest_id = '394708';
let model = {offset: 0, limit: 20, contest_id: contest_id, res: 0, in_contest: true };

const dbconnect = require('../db/connect');
dbconnect.connect(false);

var options = {preempt_if_submission_id_found: false};
var submissionIdx = 1;
vjudgeLib.getContestDetails(contestDetailsUrl, model, function(err, contestDetails){
    console.log("VJUDGE ERR: " + err);
    console.log("CONTEST DETAILS: " + contestDetails);
    if(contestDetails){
        var contest_name = contestDetails.title;
        console.log("CONTEST: "+contest_name);
        var allPages = [];
        for (var page = 0; page <= 100; page++)
            allPages.push(page);
        async.eachSeries(allPages, function(currentPage, next){
            model.offset = currentPage * model.limit;
            vjudgeLib.getCurrentLeaderboardPage(judgeSubmissionsUrl, model, function(err, res){
                if(res.models.length == 0){
                    console.log("We are done");
                    next({'message': 'We are done'});
                }
                else{
                    var leaderboardUsers = res.models;
                    async.eachSeries(leaderboardUsers, function(currentLBUser, nextLB){
                        log.info("PAGE : %d SUBMISSION %d SUBMISSIONID: ", 1+currentPage, submissionIdx++, currentLBUser.runId);
                        var searchQuery = {
                            site_submission_id: currentLBUser.runId,
                            site_name: 'VJUDGE'
                        };
                        itemLib.getSingleItemByQuery(searchQuery, submissionModel, function(err, submissionDbItem){
                            console.log(err);
                            if(submissionDbItem){
                                console.log("SKIPPING STORING OF " + currentLBUser.runId);
                                if(options.preempt_if_submission_id_found)
                                    nextLB({message: 'Exiting as submission id is already found'});
                                else
                                    nextLB();
                            }
                            else{
                                model.site_submission_id = currentLBUser.runId;
                                var submissionObject = {
                                    submission_code: '',
                                    contest_name : contest_name,
                                    site_name: 'VJUDGE',
                                    site_submission_id: currentLBUser.runId,
                                    contest_id: currentLBUser.contestId,
                                    problem_id: currentLBUser.problemId,
                                    site_user_id: currentLBUser.userId,
                                    submission_status: currentLBUser.status,
                                    submission_status_normalized: currentLBUser.statusCanonical,
                                    submission_language: currentLBUser.language,
                                    submission_language_normalized: currentLBUser.languageCanonical,
                                    site_user_handle: currentLBUser.userName,
                                    submission_status_code: currentLBUser.statusType,
                                    memory_used: currentLBUser.memory,
                                    is_public: currentLBUser.access,
                                    time_taken: currentLBUser.runtime,
                                    created_at_ms: currentLBUser.time,
                                };
                                var searchQuery = {site_submission_id: currentLBUser.runId, site_name: submissionObject.site_name};
                                itemLib.createOrUpdateByQuery(searchQuery, submissionModel, submissionObject, function(err, res){
                                     nextLB();
                                });
                            }
                        });
                    }, 
                    function(err){
                        if(err)
                            next(err);
                        else
                            setTimeout(() => {  next();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));                    
                    });
                }
            }, function(err){
                console.log(err);
                dbconnect.disconnect();
            });
        });
    }
})

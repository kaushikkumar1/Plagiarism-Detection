const template = require('lodash.template');
const scraperConfig = require('../config/scraperConfig');
const vjudgeLib = require('../lib/vjudgeLib');
const async = require('async');

const judgeSubmissionsUrl = template(scraperConfig.vjudge.vj_judge_submissions_url);
const contestDetailsUrl = template(scraperConfig.vjudge.vj_contest_details_url);


const log4js = require('log4js');
const log = log4js.getLogger('vjSubmissionsCrawler');
var config =require('../config/config').get_active_config();
log.level = config.log4jsLevel;
var contest_id = '394708';
let model = {offset: 0, limit: 20, contest_id: contest_id, res: 0, in_contest: true };

vjudgeLib.getContestDetails(contestDetailsUrl, model, function(err, contestDetails){
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
                console.log(res);
                next();
            }
        }, function(err){
            console.log(err);
        });
    });
})

const template = require('lodash.template');
const scraperConfig = require('../config/scraperConfig');
const interviewbitLib = require('../lib/interviewbitLib');
const utilityLib = require('../lib/utilityLib');
const itemLib = require('../lib/itemLib');
const submissionsStatsModel = require('../models/submissionsStatsModel');

const dbconnect = require('../db/connect');
dbconnect.connect(false);

const headers = {
    'User-Agent': scraperConfig.common.agent
};

const userProfilePageUrl = template(scraperConfig.interviewbit.ib_user_profile_url);

var userHandleToCrawl = 'shruthichouhan2001';
let model = {site_user_handle: userHandleToCrawl, interviewbit_username: userHandleToCrawl };


interviewbitLib.getUserStats(userProfilePageUrl, model, headers, function(err, crawledStats){
    console.log(JSON.stringify(crawledStats));
    crawledStats['created_at_date_string'] = utilityLib.normalizedDateString(new Date());
    var searchQuery = {site_name: crawledStats.site_name, site_user_handle: crawledStats.site_user_handle, created_at_date_string: crawledStats.created_at_date_string};
    itemLib.getSingleItemByQuery(searchQuery, submissionsStatsModel, function(err, submissionStatItem){
        if(submissionStatItem){
            console.log(submissionStatItem._id);
            crawledStats['_id'] = submissionStatItem._id;
            crawledStats['updated_at'] = new Date();
            itemLib.updateItem(crawledStats, submissionsStatsModel, function(err, res){
                //console.log(submissionObject);
                //setTimeout(() => {  nextLB();  }, randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));    
                dbconnect.disconnect();                
            });
        }
        else{
            itemLib.createitem(crawledStats, submissionsStatsModel, function(err, res){
                //console.log(submissionObject);
                //setTimeout(() => {  nextLB();  }, randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));    
                dbconnect.disconnect();                
            });
        }
    });
})

const template = require('lodash.template');
const scraperConfig = require('../config/scraperConfig');
const leetcodeLib = require('../lib/leetcodeLib');
const utilityLib = require('../lib/utilityLib');
const itemLib = require('../lib/itemLib');
const moment = require('moment');
const async = require('async');

const submissionsStatsModel = require('../models/submissionsStatsModel');

const dbconnect = require('../db/connect');
const codingProfilesModel = require('../models/codingProfilesModel');


dbconnect.connect(false);

const headers = {
    'User-Agent': scraperConfig.common.agent
};


const userProfilePageUrl = template(scraperConfig.leetcode.profile_url);
var site_name = 'LEETCODE';


module.exports.crawlAndUpdateDB = function(userHandleToCrawl, connect_to_db, cb){
    if(connect_to_db){
        dbconnect.connect(false);
    }
    let model = {site_user_handle: userHandleToCrawl, leetcode_username: userHandleToCrawl };
    leetcodeLib.getUserStats(userProfilePageUrl, model, headers, function(err, crawledStats){
        if(crawledStats){
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
                        //setTimeout(() => {  nextLB();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));    
                        if(connect_to_db)
                            dbconnect.disconnect();   
                        cb(err, res);             
                    });
                }
                else{
                    itemLib.createitem(crawledStats, submissionsStatsModel, function(err, res){
                        //console.log(submissionObject);
                        //setTimeout(() => {  nextLB();  }, utilityLib.randInRange(scraperConfig.hackerrank.hr_leaderboard_crawling_min_delay_milliseconds, scraperConfig.hackerrank.hr_leaderboard_crawling_max_delay_milliseconds));    
                        if(connect_to_db)
                            dbconnect.disconnect();      
                            cb(err, res);        
                    });
                }
            });
        }
        else{
            cb({'error': 'some error occured'}, null);
        }
    })
}

function unitTestCrawlAndUpdateDB(){
    var userHandleToCrawl ='sandywadhwa';
    module.exports.crawlAndUpdateDB(userHandleToCrawl, true, function(){

    })
}
// unitTestCrawlAndUpdateDB();


module.exports.pickNextUserCrawlAndUpdateDB = function(connect_to_db, cb){
    var backinMins = moment(new Date()).subtract(scraperConfig.common.maximum_fetch_window_in_minutes, 'm').toDate();
    var query = {site_name: site_name , is_handle_valid: {$ne: false}, is_crawler_active: {$ne: false}};
    query['$or'] = [{last_crawled_at: {$lt: backinMins}}, {last_crawled_at: null}];
    //query['user_roll_number'] = '18H51A0491';
    if(connect_to_db)
        dbconnect.connect(false);
    itemLib.getSingleItemByQuery(query, codingProfilesModel, function(err, userObject){
        if(userObject){
            module.exports.crawlAndUpdateDB(userObject.site_user_handle, false, function(err, res){
                userObject.last_crawled_at = new Date();
                if(err)
                    userObject.is_handle_valid = false;
                itemLib.updateItem(userObject, codingProfilesModel, function(){
                    if(connect_to_db)
                        dbconnect.disconnect();
                    cb();
                });
            });
        }
        else{
            console.log("NO MORE USERS TO CRAWL FOR TODAY");
            if(connect_to_db)
                dbconnect.disconnect();
            cb();
        }
    });
}

// // UNIT TEST
function crawlUnitTest(){
    dbconnect.connect(false);
    module.exports.pickNextUserCrawlAndUpdateDB(false, function(){
        console.log("DONE");
        dbconnect.disconnect();
    })
}

//crawlUnitTest();


function crawlLoop(n, connect_to_db){
    var allPages = [];
    for (var page = 1; page <= n; page++)
        allPages.push(page);
    if(connect_to_db)
        dbconnect.connect(false);
    async.eachSeries(allPages, function(currentPage, next){
        module.exports.pickNextUserCrawlAndUpdateDB(false, function(){
            var timeoutDurationInMs = utilityLib.randInRange(scraperConfig.common.min_crawling_delay, scraperConfig.common.max_crawling_delay);
            console.log('Timeout for '+timeoutDurationInMs + " ms")
            setTimeout(() => {  next();  }, timeoutDurationInMs);
        })
    }, function(err){
        console.log("COMPLETED CRAWLING");
        if(connect_to_db)
            dbconnect.disconnect();
    });
}


function getCountToCrawl(cb){
    var backinMins = moment(new Date()).subtract(scraperConfig.common.maximum_fetch_window_in_minutes, 'm').toDate();
    var query = {site_name: site_name , is_handle_valid: {$ne: false}, is_crawler_active: {$ne: false}};
    query['$or'] = [{last_crawled_at: {$lt: backinMins}}, {last_crawled_at: null}];
    itemLib.getItemByQuery(query, codingProfilesModel, function(err, res){
        if(err)
            cb(0);
        else
            cb(res.length);
    })
}

function dailyCrawlRun(){
    getCountToCrawl(function(cnt){
        console.log("GOT COUNT AS  "+cnt);
        crawlLoop(cnt);
    })
}

dailyCrawlRun();

const scraperConfig = require('../config/scraperConfig');
const template = require('lodash.template');
const utilityLib = require('../lib/utilityLib');
const codechefLib = require('../lib/codechefLib');
const dbconnect = require('../db/connect');
const itemLib = require('../lib/itemLib');
const submissionsStatsModel = require('../models/submissionsStatsModel');
const codingProfilesModel = require('../models/codingProfilesModel');
const moment = require('moment');
const async = require('async');


var site_name = 'CODECHEF';
var libToUse = codechefLib;

const headers = {
    'User-Agent': scraperConfig.common.agent
};

const userProfilePageUrl = template(scraperConfig[site_name].user_profile_url);

var connect_to_db = true;

if(connect_to_db)
    dbconnect.connect(false);



module.exports.crawlAndUpdateDB = function(userHandleToCrawl, cb){
    let model = {site_name: site_name, site_user_handle: userHandleToCrawl };

    libToUse.getUserStats(userProfilePageUrl, model, headers, function(err, crawledStats){
        // console.log("getUserStats ERR: "+err);
        // console.log("getUserStats crawledStats: "+crawledStats);
        if(err)
            cb(err, null);
        else{
            if(crawledStats){
                crawledStats['created_at_date_string'] = utilityLib.normalizedDateString(new Date());
                var searchQuery = {site_name: crawledStats.site_name, site_user_handle: crawledStats.site_user_handle, created_at_date_string: crawledStats.created_at_date_string};
                itemLib.getSingleItemByQuery(searchQuery, submissionsStatsModel, function(err, submissionStatItem){
                    // console.log("getSingleItemByQuery ERR: "+err);
                    // console.log("getSingleItemByQuery submissionStatItem: "+submissionStatItem);
                    if(submissionStatItem){
                        console.log("CREATE UPDATED ITEM: " + submissionStatItem._id);
                        crawledStats['_id'] = submissionStatItem._id;
                        crawledStats['updated_at'] = new Date();
                        itemLib.updateItem(crawledStats, submissionsStatsModel, function(err, res){
                            if(err)
                                console.log("UPDATE ITEM ERR: "+err);
                            cb(err, res);             
                        });
                    }
                    else{
                        itemLib.createitem(crawledStats, submissionsStatsModel, function(err, res){
                            if(err)
                                console.log("CREATE ITEM ERR: "+err);
                            cb(err, res);        
                        });
                    }
                });
            }
            else{
                cb({'error': 'some error occured'}, null);
            }
        }
    })
}

function unitTestCrawlAndUpdateDB(){
    var userHandleToCrawl = 'hemanth_1';
    module.exports.crawlAndUpdateDB(userHandleToCrawl, function(){
        if(connect_to_db)
            dbconnect.disconnect();  
    })
}
//unitTestCrawlAndUpdateDB();


module.exports.pickNextUserCrawlAndUpdateDB = function(cb){
    var backinMins = moment(new Date()).subtract(scraperConfig.common.maximum_fetch_window_in_minutes, 'm').toDate();
    var query = {site_name: site_name , is_handle_valid: {$ne: false}, is_crawler_active: {$ne: false}};
    query['$or'] = [{last_crawled_at: {$lt: backinMins}}, {last_crawled_at: null}];
    //query['user_roll_number'] = '18H51A0491';
    itemLib.getSingleItemByQuery(query, codingProfilesModel, function(err, userObject){
        if(userObject){
            module.exports.crawlAndUpdateDB(userObject.site_user_handle, function(err, res){
                userObject.last_crawled_at = new Date();
                if(err)
                    userObject.is_handle_valid = false;
                itemLib.updateItem(userObject, codingProfilesModel, function(){
                    cb();
                });
            });
        }
        else{
            console.log("NO MORE USERS TO CRAWL FOR TODAY");
            cb();
        }
    });
}

// UNIT TEST
function crawlUnitTest(){
    module.exports.pickNextUserCrawlAndUpdateDB(function(){
        console.log("DONE");
        if(connect_to_db)
           dbconnect.disconnect();
    })
}

//crawlUnitTest();


function crawlLoop(n){
    var allPages = [];
    for (var page = 1; page <= n; page++)
        allPages.push(page);
    async.eachSeries(allPages, function(currentPage, next){
        module.exports.pickNextUserCrawlAndUpdateDB(function(){
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

// UNIT TEST
//crawlLoop(1);

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

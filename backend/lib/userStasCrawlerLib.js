const requestLib = require('./requestLib');
const utilityLib = require('./utilityLib');
const itemLib = require('./itemLib');
const submissionsStatsModel = require('../models/submissionsStatsModel');
const codingProfilesModel = require('../models/codingProfilesModel');
const moment = require('moment');
const scraperConfig = require('../config/scraperConfig');

module.exports.getUserStats = function (urlTemplate, model, headers, pageParser, callback) {
    try {
        requestLib.makeWebPageSourceRequest(urlTemplate(model), headers, function (err, pageBody, statusCode) {
            var objToReturn = {site_name: model.site_name, crawled_by_server: require('os').hostname(), site_user_handle: model.site_user_handle};
            if(statusCode==404){
                objToReturn.misc_notes = 'User Handle is invalid';
                callback({error: objToReturn.misc_notes}, objToReturn);
            }
            else{
                pageParser.parsePageSource(pageBody, function(err, jsonObject){
                    if(err){
                        objToReturn.misc_notes = 'User Handle is invalid';
                        callback({error: objToReturn.misc_notes}, objToReturn);
                    }
                    else{
                        var mergedObjToReturn = utilityLib.mergeJSONObjects({}, objToReturn, jsonObject);
                        callback(err, mergedObjToReturn);
                    }
                })
            }
        });
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}



module.exports.crawlAndUpdateDB = function(userHandleToCrawl, siteOptions, cb){
    let model = {site_name: siteOptions.site_name, site_user_handle: userHandleToCrawl };
    module.exports.getUserStats(siteOptions.userProfilePageUrl, model, siteOptions.site_headers, siteOptions.site_parser , function(err, crawledStats){
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
    module.exports.crawlAndUpdateDB(userHandleToCrawl, siteOptions, function(){
        if(connect_to_db)
            dbconnect.disconnect();  
    })
}
//unitTestCrawlAndUpdateDB();



module.exports.pickNextUserCrawlAndUpdateDB = function(siteOptions, cb){
    var backinMins = moment(new Date()).subtract(scraperConfig.common.maximum_fetch_window_in_minutes, 'm').toDate();
    var query = {site_name: siteOptions.site_name , is_handle_valid: {$ne: false}, is_crawler_active: {$ne: false}};
    query['$or'] = [{last_crawled_at: {$lt: backinMins}}, {last_crawled_at: null}];
    //query['user_roll_number'] = '18H51A0491';
    itemLib.getSingleItemByQuery(query, codingProfilesModel, function(err, userObject){
        if(userObject){
            module.exports.crawlAndUpdateDB(userObject.site_user_handle, siteOptions, function(err, res){
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
    module.exports.pickNextUserCrawlAndUpdateDB(siteOptions, function(){
        console.log("DONE");
        if(connect_to_db)
           dbconnect.disconnect();
    })
}

//crawlUnitTest();

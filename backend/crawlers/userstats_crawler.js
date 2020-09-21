const scraperConfig = require('../config/scraperConfig');
const utilityLib = require('../lib/utilityLib');
const userStasCrawlerLib = require('../lib/userStasCrawlerLib');
const itemLib = require('../lib/itemLib');
const codingProfilesModel = require('../models/codingProfilesModel');
const crawlerUpdatesModel = require('../models/crawlerUpdatesModel');

const async = require('async');
const moment = require('moment');

function crawlLoop(n, siteOptions, cb){
    var allPages = [];
    for (var page = 1; page <= n; page++)
        allPages.push(page);
    async.eachSeries(allPages, function(currentPage, next){
        userStasCrawlerLib.pickNextUserCrawlAndUpdateDB(siteOptions, function(){
            var timeoutDurationInMs = utilityLib.randInRange(scraperConfig.common.min_crawling_delay, scraperConfig.common.max_crawling_delay);
            console.log('Timeout for '+timeoutDurationInMs + " ms")
            setTimeout(() => {  next();  }, timeoutDurationInMs);
        })
    }, function(err){
        console.log("COMPLETED CRAWLING");
        var updateStatusObj = {
            site_name:siteOptions.site_name,
            status: "COMPLETED CRAWLING"
        };
        itemLib.createitem(updateStatusObj, crawlerUpdatesModel, function(err, res){
            cb();
        })
    });
}

// UNIT TEST
//crawlLoop(1);

function getCountToCrawl(siteOptions, cb){
    var backinMins = moment(new Date()).subtract(scraperConfig.common.maximum_fetch_window_in_minutes, 'm').toDate();
    var query = {site_name: siteOptions.site_name , is_handle_valid: {$ne: false}, is_crawler_active: {$ne: false}};
    query['$or'] = [{last_crawled_at: {$lt: backinMins}}, {last_crawled_at: null}];
    itemLib.getItemByQuery(query, codingProfilesModel, function(err, res){
        if(err){
            console.log("ERR getItemByQuery "+err);
        }
        if(err)
            cb(0);
        else
            cb(res.length);
    })
}

module.exports.dailyCrawl = function(siteOptions, cb){
    getCountToCrawl(siteOptions, function(cnt){
        console.log("GOT COUNT AS  "+cnt);
        crawlLoop(cnt, siteOptions, cb);
    })
}


//module.exports.dailyCrawl(siteOptions);
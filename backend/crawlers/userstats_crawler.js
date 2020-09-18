const scraperConfig = require('../config/scraperConfig');
const template = require('lodash.template');
const utilityLib = require('../lib/utilityLib');
const userStasCrawlerLib = require('../lib/userStasCrawlerLib');
const dbconnect = require('../db/connect');
const itemLib = require('../lib/itemLib');
const codingProfilesModel = require('../models/codingProfilesModel');
const leetcodeParser = require('../lib/parsers/leetcodeParser');
const interviewbitParser = require('../lib/parsers/interviewbitParser');

const async = require('async');
const moment = require('moment');

var leetcodeSiteOptions = {
    site_name : 'LEETCODE',
    site_parser : leetcodeParser,
    userProfilePageUrl: template(scraperConfig['LEETCODE'].user_profile_url),
    site_headers : {'User-Agent': scraperConfig.common.agent}
};

var interviewbitOptions = {
    site_name : 'INTERVIEWBIT',
    site_parser : interviewbitParser,
    userProfilePageUrl: template(scraperConfig['INTERVIEWBIT'].user_profile_url),
    site_headers : {'User-Agent': scraperConfig.common.agent}
};

function crawlLoop(n, siteOptions){
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
        if(siteOptions.connect_to_db)
            dbconnect.disconnect();
    });
}

// UNIT TEST
//crawlLoop(1);

function getCountToCrawl(siteOptions, cb){
    var backinMins = moment(new Date()).subtract(scraperConfig.common.maximum_fetch_window_in_minutes, 'm').toDate();
    var query = {site_name: siteOptions.site_name , is_handle_valid: {$ne: false}, is_crawler_active: {$ne: false}};
    query['$or'] = [{last_crawled_at: {$lt: backinMins}}, {last_crawled_at: null}];
    itemLib.getItemByQuery(query, codingProfilesModel, function(err, res){
        if(err)
            cb(0);
        else
            cb(res.length);
    })
}

module.exports.dailyCrawl = function(siteOptions){
    getCountToCrawl(siteOptions, function(cnt){
        console.log("GOT COUNT AS  "+cnt);
        crawlLoop(cnt, siteOptions);
    })
}


//module.exports.dailyCrawl(siteOptions);
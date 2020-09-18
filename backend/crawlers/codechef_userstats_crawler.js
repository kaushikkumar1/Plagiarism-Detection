const scraperConfig = require('../config/scraperConfig');
const template = require('lodash.template');
const utilityLib = require('../lib/utilityLib');
const userStasCrawlerLib = require('../lib/userStasCrawlerLib');
const dbconnect = require('../db/connect');
const itemLib = require('../lib/itemLib');
const codingProfilesModel = require('../models/codingProfilesModel');
const codechefParser = require('../lib/parsers/codechefParser');

const async = require('async');
const moment = require('moment');


var site_name = 'CODECHEF';

var codechefSiteOptions = {
    site_name : site_name,
    site_parser : codechefParser,
    userProfilePageUrl: template(scraperConfig[site_name].user_profile_url),
    site_headers : {'User-Agent': scraperConfig.common.agent}
};

var siteOptions = codechefSiteOptions;

var connect_to_db = true;

if(connect_to_db)
    dbconnect.connect(false);



function crawlLoop(n){
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

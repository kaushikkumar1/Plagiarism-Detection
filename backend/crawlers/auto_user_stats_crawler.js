var schedule = require('node-schedule');
const userStasCrawlerLib = require('../lib/userStasCrawlerLib');
const template = require('lodash.template');
const util = require('util');
const utilityLib = require('../lib/utilityLib');
const scraperConfig = require('../config/scraperConfig');
const dbconnect = require('../db/connect');

var lbCrawlSchedule = util.format("*/%d * * * *", scraperConfig.LEETCODE.crawl_interval_in_minutes);
var ccCrawlSchedule = util.format("*/%d * * * *", scraperConfig.CODECHEF.crawl_interval_in_minutes);
var ibCrawlSchedule = util.format("*/%d * * * *", scraperConfig.INTERVIEWBIT.crawl_interval_in_minutes);

dbconnect.connect(false);

function crawlWithDelay(siteOptions, cb){
    // Make little unpredictable 
    var timeoutDurationInMs = utilityLib.randInRange(scraperConfig.common.auto_crawling_min_timeout_delay_ms, scraperConfig.common.auto_crawling_max_timeout_delay_ms);
    console.log("Timeout duration: "+timeoutDurationInMs);
    setTimeout(() => {  
        userStasCrawlerLib.pickNextUserCrawlAndUpdateDB(siteOptions, function(done, res){
            cb();
        })
    }, timeoutDurationInMs);
}
var lbJob = schedule.scheduleJob(lbCrawlSchedule, function(){
    var siteOptions = {
        site_name : 'LEETCODE',
        site_parser : require('../lib/parsers/leetcodeParser'),
        userProfilePageUrl: template(scraperConfig['LEETCODE'].user_profile_url),
        site_headers : {'User-Agent': scraperConfig.common.agent},
        connect_to_db: false
    };
    console.log("LB UPDATE START");
    crawlWithDelay(siteOptions, function(){
        console.log("LB UPDATE END");
    });
});

var ccJob = schedule.scheduleJob(ccCrawlSchedule, function(){
    var siteOptions = {
        site_name : 'CODECHEF',
        site_parser : require('../lib/parsers/codechefParser'),
        userProfilePageUrl: template(scraperConfig['CODECHEF'].user_profile_url),
        site_headers : {'User-Agent': scraperConfig.common.agent},
        connect_to_db: false
    };
    console.log("CC UPDATE START");
    crawlWithDelay(siteOptions, function(){
        console.log("CC UPDATE END");
    });
});

var ibJob = schedule.scheduleJob(ibCrawlSchedule, function(){
    var siteOptions = {
        site_name : 'INTERVIEWBIT',
        site_parser : require('../lib/parsers/interviewbitParser'),
        userProfilePageUrl: template(scraperConfig['INTERVIEWBIT'].user_profile_url),
        site_headers : {'User-Agent': scraperConfig.common.agent},
        connect_to_db: false
    };
    console.log("IB UPDATE START");
    crawlWithDelay(siteOptions, function(){
        console.log("IB UPDATE END");
    });
});

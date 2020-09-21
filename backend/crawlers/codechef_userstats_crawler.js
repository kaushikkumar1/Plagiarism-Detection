const template = require('lodash.template');
const userStatsCrawler = require('./userstats_crawler');
const scraperConfig = require('../config/scraperConfig');
const codechefParser = require('../lib/parsers/codechefParser');
const dbconnect = require('../db/connect');

var connect_to_db_local_run = true;

var siteOptions = {
    site_name : 'CODECHEF',
    site_parser : codechefParser,
    userProfilePageUrl: template(scraperConfig['CODECHEF'].user_profile_url),
    site_headers : {'User-Agent': scraperConfig.common.agent},
    connect_to_db: false
};


module.exports.crawl = function(connect_to_db){
    if(connect_to_db)
        dbconnect.connect(false);
    userStatsCrawler.dailyCrawl(siteOptions, function(){
        if(connect_to_db)
           dbconnect.disconnect();
    });
}


module.exports.crawl(connect_to_db_local_run);
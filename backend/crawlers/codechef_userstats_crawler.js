const template = require('lodash.template');
const userStatsCrawler = require('./userstats_crawler');
const scraperConfig = require('../config/scraperConfig');
const codechefParser = require('../lib/parsers/codechefParser');
const dbconnect = require('../db/connect');

var connect_to_db = true;

if(connect_to_db)
    dbconnect.connect(false);

var codechefSiteOptions = {
    site_name : 'CODECHEF',
    site_parser : codechefParser,
    userProfilePageUrl: template(scraperConfig['CODECHEF'].user_profile_url),
    site_headers : {'User-Agent': scraperConfig.common.agent},
    connect_to_db: false
};

userStatsCrawler.dailyCrawl(codechefSiteOptions, function(){
    dbconnect.disconnect();
});
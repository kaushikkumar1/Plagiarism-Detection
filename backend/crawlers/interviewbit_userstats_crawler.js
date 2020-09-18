const template = require('lodash.template');
const userStatsCrawler = require('./userstats_crawler');
const scraperConfig = require('../config/scraperConfig');
const dbconnect = require('../db/connect');

var connect_to_db = true;

if(connect_to_db)
    dbconnect.connect(false);

var interviewbitSiteOptions = {
    site_name : 'INTERVIEWBIT',
    site_parser : require('../lib/parsers/interviewbitParser'),
    userProfilePageUrl: template(scraperConfig['INTERVIEWBIT'].user_profile_url),
    site_headers : {'User-Agent': scraperConfig.common.agent},
    connect_to_db: false
};

userStatsCrawler.dailyCrawl(interviewbitSiteOptions);
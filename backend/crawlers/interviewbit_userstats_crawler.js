const template = require('lodash.template');
const scraperConfig = require('../config/scraperConfig');
const interviewbitLib = require('../lib/interviewbitLib');

const headers = {
    'User-Agent': scraperConfig.common.agent
};

const userProfilePageUrl = template(scraperConfig.interviewbit.ib_user_profile_url);

var userHandleToCrawl = 'shruthichouhan2001';
let model = {site_user_handle: userHandleToCrawl, interviewbit_username: userHandleToCrawl };

interviewbitLib.getUserStats(userProfilePageUrl, model, headers, function(err, crawledStats){
    console.log(JSON.stringify(crawledStats));
})

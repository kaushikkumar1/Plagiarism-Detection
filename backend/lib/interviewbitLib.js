const cheerio = require('cheerio');
const requestLib = require('./requestLib');
const config = require('../config/scraperConfig');

module.exports.getUserStats = function (urlTemplate, model, headers, callback) {
    try {
        requestLib.makeWebPageSourceRequest(urlTemplate(model), headers, function (err, pageBody, statusCode) {
            var objToReturn = {site_name: "INTERVIEWBIT", site_user_handle: model.site_user_handle};
            const $ = cheerio.load(pageBody);
            var username = $(config.interviewbit.ib_selectors.username_selector).text().trim();
            if(!username || username.length==0)
                return callback('error occured '+model.interviewbit_username, null);
            if(statusCode==404)
                objToReturn.misc_notes = 'User has not enabled public profile viewing or Handle is invalid';
            else{
                var rank = $(config.interviewbit.ib_selectors.rank_selector).text().trim();
                var score = $(config.interviewbit.ib_selectors.score_selector).text().trim();
                if(username && username.length > 0){
                    objToReturn.created_at = new Date();
                    objToReturn.score = score;
                    objToReturn.rank = rank;
                    objToReturn.misc_notes = ''; // Clear if previous crawling didn't have public profile view enabled
                }
            }
            callback(err, objToReturn);
        });
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}
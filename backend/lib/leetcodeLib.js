const cheerio = require('cheerio');
const requestLib = require('./requestLib');
const config = require('../config/scraperConfig');

module.exports.getUserStats = function (urlTemplate, model, headers, callback) {
    try {
        requestLib.makeWebPageSourceRequest(urlTemplate(model), headers, function (err, pageBody, statusCode) {
            var objToReturn = {site_name: "LEETCODE", site_user_handle: model.site_user_handle};
            const $ = cheerio.load(pageBody);
            //console.log("BODY: " +pageBody);
           
            var username = $(config.leetcode.lc_selectors.username_selector).text() || "";
            username = username.trim();
            //console.log("USERNAME "+username);
            if(!username || username.length==0)
                return callback('error occured '+model.site_user_handle, null);
            if(statusCode==404)
                objToReturn.misc_notes = 'User Handle is invalid';
            else{
                var rating = $(config.leetcode.lc_selectors.rating_selector).text() || "-1";
                rating = rating.trim();
                var solved_count = $(config.leetcode.lc_selectors.solved_question_selector).text() || "0/100";
                solved_count = solved_count.trim().split("/")[0].trim();
                var acceptance_percentage = $(config.leetcode.lc_selectors.acceptance_rate_selector).text() || "12.0 %";
                acceptance_percentage = acceptance_percentage.trim().split('%')[0].trim();
                var global_ranking = $(config.leetcode.lc_selectors.global_ranking_selector).text() || "37844 / 141298";
                global_ranking = global_ranking.trim().split('/')[0].trim();
                var contests_participated = $(config.leetcode.lc_selectors.contests_finished_selector).text() || "";
                contests_participated = contests_participated.trim();
                var contribution_points = $(config.leetcode.lc_selectors.contribution_points_selector).text() || "";
                contribution_points = contribution_points.trim();
                if(username && username.length > 0){
                    objToReturn.created_at = new Date();
                    objToReturn.acceptance_percentage = acceptance_percentage;
                    objToReturn.global_rank = global_ranking;
                    objToReturn.user_rating = rating;
                    objToReturn.contests_participated = contests_participated;
                    objToReturn.contribution_points = contribution_points;
                    objToReturn.solved_count = solved_count;
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
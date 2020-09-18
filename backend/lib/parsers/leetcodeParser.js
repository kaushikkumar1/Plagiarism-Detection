const { select } = require('async');
const cheerio = require('cheerio');
const config = require('../../config/scraperConfig');
const utilityLib = require('../utilityLib');

module.exports.parsePageSource = function(pageBody, callback){

    const $ = cheerio.load(pageBody);

    var selectors = config.LEETCODE.selectors;

    var username = $(selectors.username_selector).text().trim();
    if(!username || username.length==0)
        return callback('error occured', null);

    var objToReturn = {};

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

    objToReturn.acceptance_percentage = acceptance_percentage;
    objToReturn.global_rank = global_ranking;
    objToReturn.user_rating = rating;
    objToReturn.contests_participated = contests_participated;
    objToReturn.contribution_points = contribution_points;
    objToReturn.solved_count = solved_count;

    callback(null, objToReturn);
}
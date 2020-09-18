const cheerio = require('cheerio');
const config = require('../../config/scraperConfig');
const utilityLib = require('../utilityLib');

module.exports.parsePageSource = function(pageBody, callback){

    const $ = cheerio.load(pageBody);

    var username = $(config.CODECHEF.cc_selectors.username_selector).text().trim();
    if(!username || username.length==0)
        return callback('error occured '+model.interviewbit_username, null);

    var objToReturn = {};

    var rating = $(config.CODECHEF.cc_selectors.rating_selector).text() || "";
    var fully_solved_count = $(config.CODECHEF.cc_selectors.fully_solved_selector).text() || "Fully Solved (0)";
    var star_rating =($(config.CODECHEF.cc_selectors.star_rating_selector).text() || '1★').split('★')[0];
    var global_rank = ($(config.CODECHEF.cc_selectors.global_rank_selector).text() || "").trim();
    var country_rank = ($(config.CODECHEF.cc_selectors.country_rank_selector).text() || "").trim();
    fully_solved_count = fully_solved_count.split("(")[1].trim();
    fully_solved_count = fully_solved_count.split(")")[0].trim();
            //console.log("fully_solved_count: "+fully_solved_count);
    objToReturn.codechef_rating = rating;
    objToReturn.codechef_profile_solved_count = fully_solved_count;
    objToReturn.codechef_country_rank = country_rank;
    objToReturn.codechef_global_rank = global_rank;
    objToReturn.codechef_star_rating = star_rating;

    var ratingInt = utilityLib.stringToInt(rating);
    var solvedCountInt = utilityLib.stringToInt(fully_solved_count);
    var calculatedScore = solvedCountInt*10;
    if(ratingInt>=1300)
        calculatedScore += ((ratingInt-1300)*(ratingInt-1300))/30;
    objToReturn.codechef_calculated_score = Math.round(calculatedScore);
    callback(null, objToReturn);
}
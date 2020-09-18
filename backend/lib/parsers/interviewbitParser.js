const { select } = require('async');
const cheerio = require('cheerio');
const config = require('../../config/scraperConfig');
const utilityLib = require('../utilityLib');

module.exports.parsePageSource = function(pageBody, callback){

    const $ = cheerio.load(pageBody);

    var selectors = config.INTERVIEWBIT.selectors;

    var username = $(selectors.username_selector).text().trim();
    if(!username || username.length==0)
        return callback('error occured', null);

    var objToReturn = {};

    var rank = $(config.interviewbit.ib_selectors.rank_selector).text().trim();
    var score = $(config.interviewbit.ib_selectors.score_selector).text().trim();

    objToReturn.score = score;
    objToReturn.rank = rank;

    callback(null, objToReturn);
}
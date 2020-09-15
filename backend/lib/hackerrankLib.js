var scraperConfig =require('../config/scraperConfig');
const template = require('lodash.template');
const requestLib = require('./requestLib');

const headers = {
    'User-Agent': scraperConfig.common.agent,
    'cookie' : scraperConfig.hackerrank.cookie
};

module.exports.getOffsetAndPageCount = function(urlTemplate, model, callback) {
    requestLib.makeAPIRequest(urlTemplate(model), headers, function(err, jsonBody){
        callback(err, {total: jsonBody.total, pages: parseInt(jsonBody.total / model.limit) })
    });
}

module.exports.getCurrentLeaderboardPage = function(urlTemplate, model, callback) {
    requestLib.makeAPIRequest(urlTemplate(model), headers, function(err, jsonBody){
        callback(err, {models: jsonBody.models})
    });
}

module.exports.getSubmissionCode = function(urlTemplate, model, callback) {
    requestLib.makeAPIRequest(urlTemplate(model), headers, function(err, jsonBody){
        callback(err, {submission_id: jsonBody.model.id, submission_code: jsonBody.model.code});
    });    
}

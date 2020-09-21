var scraperConfig =require('../config/scraperConfig');
const template = require('lodash.template');
const requestLib = require('./requestLib');

const headers = {
    'User-Agent': scraperConfig.common.agent,
    'cookie' : scraperConfig.VJUDGE.cookie
};


module.exports.getContestDetails = function(urlTemplate, model, callback){
    requestLib.makeAPIRequest(urlTemplate(model), headers, function(err, jsonBody){
        callback(err, jsonBody)
    });
}

module.exports.getCurrentLeaderboardPage = function(urlTemplate, model, callback) {
    requestLib.makeAPIRequest(urlTemplate(model), headers, function(err, jsonBody){
        callback(err, {models: jsonBody.data})
    });
}

module.exports.getSubmissionCode = function(urlTemplate, model, callback) {
    requestLib.makeAPIRequest(urlTemplate(model), headers, function(err, jsonBody){
        callback(err, {submission_id: jsonBody.model.id, submission_code: jsonBody.model.code});
    });    
}

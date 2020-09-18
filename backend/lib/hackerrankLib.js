const template = require('lodash.template');
const requestLib = require('./requestLib');



module.exports.getOffsetAndPageCount = function (urlTemplate, model, headers, callback) {

    try {
        requestLib.makeAPIRequest(urlTemplate(model), headers, function (err, jsonBody) {
            callback(err, {
                total: jsonBody.total,
                pages: parseInt(jsonBody.total / model.limit)
            })
        });
    } catch (error) {
        console.log(error);

    }
}

module.exports.getCurrentLeaderboardPage = function (urlTemplate, model, headers, callback) {
    try {
        requestLib.makeAPIRequest(urlTemplate(model), headers, function (err, jsonBody) {
            callback(err, {
                models: jsonBody.models
            })
        });
    } catch (error) {
        console.log(error);

    }
}

module.exports.getSubmissionCode = function (urlTemplate, model, headers, callback) {
    try {
        requestLib.makeAPIRequest(urlTemplate(model), headers, function (err, jsonBody) {
            callback(err, {
                submission_id: jsonBody.model.id,
                submission_code: jsonBody.model.code
            });
        });
    } catch (error) {
        console.log(error);

    }
}
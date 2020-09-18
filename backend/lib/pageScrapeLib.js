const requestLib = require('./requestLib');
const utilityLib = require('./utilityLib');

module.exports.getUserStats = function (urlTemplate, model, headers, pageParser, callback) {
    try {
        requestLib.makeWebPageSourceRequest(urlTemplate(model), headers, function (err, pageBody, statusCode) {
            var objToReturn = {site_name: model.site_name, crawled_by_server: require('os').hostname(), site_user_handle: model.site_user_handle};
            if(statusCode==404){
                objToReturn.misc_notes = 'User Handle is invalid';
                callback({error: objToReturn.misc_notes}, objToReturn);
            }
            else{
                pageParser.parsePageSource(pageBody, function(err, jsonObject){
                    if(err){
                        objToReturn.misc_notes = 'User Handle is invalid';
                        callback({error: objToReturn.misc_notes}, objToReturn);
                    }
                    else{
                        var mergedObjToReturn = utilityLib.mergeJSONObjects({}, objToReturn, jsonObject);
                        callback(err, mergedObjToReturn);
                    }
                })
            }
        });
    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}
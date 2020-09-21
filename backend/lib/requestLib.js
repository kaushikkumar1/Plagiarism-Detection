const request = require('request');
const log4js = require('log4js');
const log = log4js.getLogger('requestLib');
var config = require('../config/config').get_active_config();
log.level = config.log4jsLevel;
//log.level = 'DEBUG';

module.exports.makeAPIRequest = function (url, headers, callback) {
    module.exports.makeWebPageSourceRequest(url, headers, function(err, result){
        try {
            var jsonResult = JSON.parse(result);
            log.debug('JSON: %s', JSON.stringify(jsonResult));
            callback(err, jsonResult);
        } catch (error) {
            console.log(error);
            callback(error, null);
        }
    })
}

module.exports.makeWebPageSourceRequest = function (url, headers, callback) {
    try {
        request(url, {
            'headers': headers
        }, function (err, response, body) {
            if (err) {
                log.fatal(err);
                callback(err, null);
            } else {
                log.debug(JSON.stringify(headers));
                log.info('%s RESPONSE CODE %d', url, response.statusCode);
                log.debug('PAGE SOURCE: %s', JSON.stringify(body));
                var pageSourceCode = body;
                callback(err, pageSourceCode, response.statusCode);
            }
        });

    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}
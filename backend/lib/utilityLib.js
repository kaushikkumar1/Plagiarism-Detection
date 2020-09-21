const { until } = require("async");

const util = require('util');

module.exports.normalizedDateString = function(inputDate){
    var date = new Date(inputDate);
    var dd = String(date.getUTCDate()).padStart(2, '0');
    var mm = String(date.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getUTCFullYear();
    return util.format('%s-%s-%s', yyyy, mm, dd);
}

module.exports.randInRange = function(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

module.exports.stringToInt = function(strVal, defValue){
    if(!defValue)
        defValue = 0;
    return isNaN(parseInt(strVal)) ? defValue : parseInt(strVal);   
}

// pass it first empty object and then any number of json objects
// it'll return merged of all
// mergeJSONObjects({}, obj1, obj2, obj3);
module.exports.mergeJSONObjects = function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
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
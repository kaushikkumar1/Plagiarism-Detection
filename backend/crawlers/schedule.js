const hackerank_contest_submission = require('./hackerrank_contest_submissions');
const dbconnect = require('../db/connect');
dbconnect.connect(false);


var user ={
    contest_name:"bz-p2-contest",                   //specify the contest_name to run locally
    _hrank_session:"_hrank_session=66dbff301590e472cc2566683ec7364ad2ab30c5fdcc2e8c24c9decebea727cdf3933e2d76781d9e137132ab75843f73e9d21aecffd9f71ec1dda50afeeda04f;"                   //specify the cookie over here to run locally
}


 hackerank_contest_submission.crawler(user);





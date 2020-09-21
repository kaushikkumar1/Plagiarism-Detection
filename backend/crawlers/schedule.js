const cron = require('node-cron');
const Contest = require('../models/contest');
var temp_contest_name, temp_cookie;
var hackerank_contest_submission=require('./hackerrank_contest_submissions');


cron.schedule(' */56 * * * *', async () => {

    try{

    const user = await Contest.findOne({crawlingPending:true}).sort({
        lrTime: 1
    }).limit(1);

    if (user) {
        await Contest.findOneAndUpdate({
            "_id": user._id
        }, {
            $set: {
                "lrTime": new Date()
            }
        })

        hackerank_contest_submission.crawler(user);
    }

    // var user ={
    //     contest_name:"XXXXXXXXXXXXX",                   //specify the contest_name to run locally
    //     _hrank_session:"XXXXXXXXXXX"                   //specify the cookie over here to run locally
    // }
    // hackerank_contest_submission.crawler(user);       //


    console.log(new Date());
}catch(error){
    console.log({error:error})
}
});

// document.querySelectorAll('#code-content')[0].innerText
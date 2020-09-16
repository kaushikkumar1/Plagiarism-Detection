const cron = require('node-cron');
const Contest = require('../models/contest');
var temp_contest_name, temp_cookie;
var hackerank_contest_submission=require('./hackerrank_contest_submissions');


cron.schedule(' */45 * * * *', async () => {

    try{

    const user = await Contest.findOne({crawlingPending:true}).sort({
        lrTime: 1
    }).limit(1);

    if (user) {

        temp_contest_name = user.contest_name;
        temp_cookie = user.cookie;

        await Contest.findOneAndUpdate({
            "_id": user._id
        }, {
            $set: {
                "lrTime": new Date()
            }
        })
        hackerank_contest_submission.crawler(user);
    }

    console.log(new Date());
}catch(error){
    console.log({error:error})
}
});

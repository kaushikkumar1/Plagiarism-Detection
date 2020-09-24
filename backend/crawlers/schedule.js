const cron = require('node-cron');
const Contest = require('../models/contest');
const submissionModel = require('../models/submissionModel');
var temp_contest_name, temp_cookie;
var hackerank_contest_submission = require('./hackerrank_contest_submissions');


cron.schedule(' */56 * * * *', async () => {

    try {

        const user = await Contest.findOne({
            crawlingPending: true
        }).sort({
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
    } catch (error) {
        console.log(error);
    }
});





























// var fun = async ()=>{
    //     var update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600954200", $lt:"1600957800"}},{in_contest_bounds:true}); //24st september  7 to 8pm                  ////done
//     console.log(update_data,"1");
    //     var update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600867800", $lt:"1600871400"}},{in_contest_bounds:true}); //23st september  7 to 8pm                  ////done
//     console.log(update_data,"1");
//     var update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600695000", $lt:"1600698600"}},{in_contest_bounds:true}); //21st september  7 to 8pm                  ////done
//     console.log(update_data,"1");
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600520400", $lt:"1600524000"}},{in_contest_bounds:true}); //19st september  6:30 to 730pm    ////
//     console.log(update_data,"2");
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600435800", $lt:"1600439400"}},{in_contest_bounds:true}); //18st september  7 to 8pm            ////
//     console.log(update_data,"3");
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600349400", $lt:"1600353000"}},{in_contest_bounds:true}); //17st september  7 to 8pm
//     console.log(update_data,"4");
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600263000", $lt:"1600266600"}},{in_contest_bounds:true}); //16st september  7 to 8pm
//     console.log(update_data,"5");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1600090200", $lt:"1600093800"}},{in_contest_bounds:true}); //14st september  7 to 8pm
//     console.log(update_data,"6");    
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1599917400", $lt:"1599919200"}},{in_contest_bounds:true}); //12st september  7 to 7:30pm
//     console.log(update_data,"7");    
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1599744600", $lt:"1599746400"}},{in_contest_bounds:true}); //10st september  7 to 7:30pm
//     console.log(update_data,"8");   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1599571800", $lt:"1599573600"}},{in_contest_bounds:true}); //8st september  7 to 7:30pm  
//     console.log(update_data,"9");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1599312600", $lt:"1599314400"}},{in_contest_bounds:true}); //5st september  7 to 7:30pm
//     console.log(update_data,"10");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1599139800", $lt:"1599141600"}},{in_contest_bounds:true}); //3st september  7 to 7:30pm
//     console.log(update_data,"11");   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1598963400", $lt:"1599138000"}},{in_contest_bounds:true}); //1st september  6 to 6:30pm
//     console.log(update_data,"12");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1598707800", $lt:"1598709600"}},{in_contest_bounds:true}); //29th aug  7 to 7:30pm
//     console.log(update_data,"13");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1598535000", $lt:"1598536800"}},{in_contest_bounds:true}); //27st aug  7 to 7:30pm
//     console.log(update_data,"14");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1598362200", $lt:"1598364000"}},{in_contest_bounds:true}); //25st aug  7 to 7:30pm
//     console.log(update_data,"15");   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1598103000", $lt:"1598104800"}},{in_contest_bounds:true}); //22st aug  7 to 7:30pm
//     console.log(update_data,"16");    
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1597930200", $lt:"1597932000"}},{in_contest_bounds:true}); //20st aug  7 to 7:30pm
//     console.log(update_data,"17");    
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1597757400", $lt:"1597759200"}},{in_contest_bounds:true}); //18st aug  7 to 7:30pm
//     console.log(update_data,"18");  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1597503600", $lt:"1597505400"}},{in_contest_bounds:true}); //15st aug   8:30 to 9pm
//     console.log(update_data,"19");   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1597330800", $lt:"1597332600"}},{in_contest_bounds:true}); //13st aug   8:30 to 9pm
//     console.log(update_data,"20");   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1597158000", $lt:"1597159800"}},{in_contest_bounds:true}); //11st aug   8:30 to 9pm
//     console.log(update_data,"21");   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1596898800", $lt:"1596900600"}},{in_contest_bounds:true}); //8st aug    8:30 to 9pm //// TCS CODEBITA CONTEST
//     console.log(update_data,22);  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1596726000", $lt:"1596727800"}},{in_contest_bounds:true}); //6st aug   8:30 to 9pm
//     console.log(update_data,23);  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1596553200", $lt:"1596555000"}},{in_contest_bounds:true}); //4st aug   8:30 to 9pm
//     console.log(update_data,24); 
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1596294000", $lt:"1596295800"}},{in_contest_bounds:true}); //1st aug   8:30 to 9pm
//     console.log(update_data,25);  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1596121200", $lt:"1596123000"}},{in_contest_bounds:true}); //30jul  8:30 to 9pm
//     console.log(update_data,26);   
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1595948400", $lt:"1595950200"}},{in_contest_bounds:true}); //28jul  8:30 to 9pm
//     console.log(update_data,27);    
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1595689200", $lt:"1595691000"}},{in_contest_bounds:true}); //25 jul   8:30 to 9pm
//     console.log(update_data,28);  
//      update_data= await submissionModel.updateMany({site_name:"HACKERRANK",created_at_ms :{$gte :"1595516400", $lt:"1595518200"}},{in_contest_bounds:true}); //23 jul  8:30 to 9pm


// // 12 september and 8th august submission not there

//  console.log(update_data);


// // var update_data= await submissionModel.updateMany({site_name:"HACKERRANK"},{in_contest_bounds:false});
// // console.log(update_data);
// // }
// }
// fun();

//     console.log(new Date());
// }catch(error){
//     console.log({error:error})
// }
// });

// var user ={
//     contest_name:"bz-p2-contest",                   //specify the contest_name to run locally
//     _hrank_session:"_hrank_session=66dbff301590e472cc2566683ec7364ad2ab30c5fdcc2e8c24c9decebea727cdf3933e2d76781d9e137132ab75843f73e9d21aecffd9f71ec1dda50afeeda04f;"                   //specify the cookie over here to run locally
// }
// hackerank_contest_submission.crawler(user);  
// document.querySelectorAll('#code-content')[0].innerText
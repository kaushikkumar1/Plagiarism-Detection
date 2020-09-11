const request = require("request-promise");
const cheerio = require("cheerio");
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Submission = require("../models/submissionModel");
var json2xls = require('json2xls');
var fs = require('fs');

const ObjectsToCsv = require('objects-to-csv');
const { TIMEOUT } = require("dns");
const e = require("express");

// CREATE PLAGIARISM DATA FOR FRONTEND
exports.contestResult = async function (req, res) {
    try {

        var problem = ["ProblemName","UserNameOne","MatchPercentOne","UserNameTwo","MatchPercentTwo","TotalMatchedLine","SubmissionIdOne","SubmissionIdTwo","MossViewLink"];
        var resultArray=[];

        var data = await PlagirismData.find({
            contestName: req.body.contest_name
        });

       
          for(var i=0;i<data.length;i++){
              var ele=data[i];
              var profileOne=("https://www.hackerrank.com/"+ele.userNameOne);
              var profileTwo=("https://www.hackerrank.com/"+ele.userNameTwo);

              if(ele.userNameOne==ele.userNameTwo)
              continue;
              var obj={
                problemName:ele.problem_name,
                UserNameOne:ele.userNameOne,
                MatchPercentOne:ele.matchPercentOne,
                UserNameTwo:ele.userNameTwo,
                MatchPercentTwo:ele.matchPercentTwo,
                TotalMatchedLine:ele.matchedLine,
                SubmissionIdOne:ele.submissionIdOne,
                SubmissionIdTwo:ele.submissionIdTwo,
                MossViewLink:ele.mossViewLink,
                problemId:ele.problemId,
                profileOne,
                profileTwo
              }
              
              resultArray.push(obj);

          }

        // console.log(data[0]);
        res.status(200).send({
            problem:problem,
            msg:resultArray
        })


        // res.status(200).send({
        //     problem: problemArray,
        //     msg: resultArray
        // });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

//CREATE RESULT IN CSV FILE
exports.contestResultCSV = async function (req, res) {
   
    try {

        var problem = ["ProblemName","UserNameOne","MatchPercentOne","UserNameTwo","MatchPercentTwo","TotalMatchedLine","SubmissionIdOne","SubmissionIdTwo","MossViewLink"];
        var resultArray=[];

        var data = await PlagirismData.find({
            contestName: req.body.contest_name
        });

       
          for(var i=0;i<data.length;i++){
              var ele=data[i];
              var profileOne=("https://www.hackerrank.com/"+ele.userNameOne);
              var profileTwo=("https://www.hackerrank.com/"+ele.userNameTwo);

              if(ele.userNameOne==ele.userNameTwo)
              continue;
              var obj={
                problemName:ele.problem_name,
                UserNameOne:ele.userNameOne,
                MatchPercentOne:ele.matchPercentOne,
                UserNameTwo:ele.userNameTwo,
                MatchPercentTwo:ele.matchPercentTwo,
                TotalMatchedLine:ele.matchedLine,
                SubmissionIdOne:ele.submissionIdOne,
                SubmissionIdTwo:ele.submissionIdTwo,
                MossViewLink:ele.mossViewLink,
              }
              
              resultArray.push(obj);

          }

                   
        //   var xls = json2xls(resultArray);

        //  await fs.writeFileSync('./Result/'+req.body.contest_name+'_result.xlsx', xls, 'binary');

        res.status(200).send({
            msg:resultArray
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }


  
}



//GET SUBMISSION BY ID

exports.submissionCode =async function(req,res){

    try{
        //  console.log(req.query,req.params);
        var submission =await Submission.findOne({site_submission_id:req.params.id});

        res.status(200).send(submission);

    }catch(error){
        console.log(error);
        res.status(500).send({error});
    }
}


// exports.contestResult = async function (req, res) {
//     try {

//         result = {};
//         problem = {};

//         var data = await PlagirismData.find({
//             contestName: req.body.contest_name
//         });

//         for (var i = 0; i < data.length; i++) {

//             problem[data[i].problemId] = 1;

//             if (result[data[i].userNameOne] == null) {
//                 result[data[i].userNameOne] = {};
//                 result[data[i].userNameOne][data[i].problemId] = {};

//                 result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
//                 result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
//                 result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
//                 result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
//                 result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;
//             } else {

//                 if (result[data[i].userNameOne][data[i].problemId] == null) {
//                     result[data[i].userNameOne][data[i].problemId] = {};

//                     result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
//                     result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
//                     result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
//                     result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
//                     result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;
//                 } else if (parseInt(result[data[i].userNameOne][data[i].problemId]["matchPercent"]) < data[i].matchPercentOne) {
//                     result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
//                     result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
//                     result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
//                     result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
//                     result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;

//                 }

//             }
//             if (result[data[i].userNameTwo] == null) {
//                 result[data[i].userNameTwo] = {};
//                 result[data[i].userNameTwo][data[i].problemId] = {};

//                 result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
//                 result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
//                 result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
//                 result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
//                 result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;
//             } else {

//                 if (result[data[i].userNameTwo][data[i].problemId] == null) {
//                     result[data[i].userNameTwo][data[i].problemId] = {};

//                     result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
//                     result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
//                     result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
//                     result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
//                     result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;
//                 } else if (parseInt(result[data[i].userNameTwo][data[i].problemId]["matchPercent"]) < data[i].matchPercentTwo) {

//                     result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
//                     result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
//                     result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
//                     result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
//                     result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;

//                 }

//             }
//         }

//         var resultArray = [];
//         for (var key in result) {

//             var temp = [];
//             temp.push(key);

//             for (var k in problem) {

//                 if (result[key][k]) {
//                     temp.push(result[key][k].mossViewLink);
//                     temp.push(result[key][k].matchPercent+"%");
//                     temp.push(result[key][k].submissionIdYour);
//                     temp.push(result[key][k].submissionIdOther);
//                     temp.push(result[key][k].matchedLine);
//                 } else {
//                     temp.push("NA");
//                     temp.push("NA");
//                     temp.push("NA");
//                     temp.push("NA");
//                     temp.push("NA");
//                 }

//             }

//             resultArray.push(temp);
//         }

//         // console.log(resultArray);
//         var problemArray=["UserName"];

//         for(var key in problem)   {
//             problemArray.push(key)
//             problemArray.push("Match Percent");
//             problemArray.push("Your Submission Id");
//             problemArray.push("Patner Submission Id");
//             problemArray.push("Matched Line");

//         }

//         res.status(200).send({
//             problem: problemArray,
//             msg: resultArray
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error);
//     }
// };
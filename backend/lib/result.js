const request = require("request-promise");
const cheerio = require("cheerio");
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Submission = require("../models/submissionModel");
var json2xls = require('json2xls');
var fs = require('fs');
var child_process = require('child_process');
var ScrapLib = require('./scrapMoss');
const chalk = require('chalk');


const ObjectsToCsv = require('objects-to-csv');
const {
    TIMEOUT
} = require("dns");
const e = require("express");
const {
    stdout,
    stderr
} = require("process");

// CREATE PLAGIARISM DATA FOR FRONTEND
exports.contestResult = async function (req, res) {
    try {

        var problem = ["ProblemName", "UserNameOne", "MatchPercentOne", "UserNameTwo", "MatchPercentTwo", "TotalMatchedLine", "SubmissionIdOne", "SubmissionIdTwo", "MossViewLink"];
        var resultArray = [];

        var data = await PlagirismData.find({
            contestName: req.body.contest_name
        });


        for (var i = 0; i < data.length; i++) {
            var ele = data[i];
            var profileOne = ("https://www.hackerrank.com/" + ele.userNameOne);
            var profileTwo = ("https://www.hackerrank.com/" + ele.userNameTwo);

            if (ele.userNameOne == ele.userNameTwo)
                continue;
            var obj = {
                _id:ele._id,
                problemName: ele.problem_name,
                UserNameOne: ele.userNameOne,
                MatchPercentOne: ele.matchPercentOne,
                UserNameTwo: ele.userNameTwo,
                MatchPercentTwo: ele.matchPercentTwo,
                TotalMatchedLine: ele.matchedLine,
                SubmissionIdOne: ele.submissionIdOne,
                SubmissionIdTwo: ele.submissionIdTwo,
                MossViewLink: ele.mossViewLink,
                problemId: ele.problemId,
                profileOne,
                profileTwo,
                copied:ele.copied
            }

            resultArray.push(obj);

        }

        // console.log(data[0]);
        res.status(200).send({
            problem: problem,
            msg: resultArray
        })


       

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

//CREATE RESULT IN CSV FILE
exports.contestResultCSV = async function (req, res) {

    try {

        var problem = ["ProblemName", "UserNameOne", "MatchPercentOne", "UserNameTwo", "MatchPercentTwo", "TotalMatchedLine", "SubmissionIdOne", "SubmissionIdTwo", "MossViewLink"];
        var resultArray = [];

        var data = await PlagirismData.find({
            contestName: req.body.contest_name
        });


        for (var i = 0; i < data.length; i++) {
            var ele = data[i];
            var profileOne = ("https://www.hackerrank.com/" + ele.userNameOne);
            var profileTwo = ("https://www.hackerrank.com/" + ele.userNameTwo);

            if (ele.userNameOne == ele.userNameTwo)
                continue;
            var obj = {
                problemName: ele.problem_name,
                UserNameOne: ele.userNameOne,
                MatchPercentOne: ele.matchPercentOne,
                UserNameTwo: ele.userNameTwo,
                MatchPercentTwo: ele.matchPercentTwo,
                TotalMatchedLine: ele.matchedLine,
                SubmissionIdOne: ele.submissionIdOne,
                SubmissionIdTwo: ele.submissionIdTwo,
                MossViewLink: ele.mossViewLink,
            }

            resultArray.push(obj);

        }


        //   var xls = json2xls(resultArray);

        //  await fs.writeFileSync('./Result/'+req.body.contest_name+'_result.xlsx', xls, 'binary');

        res.status(200).send({
            msg: resultArray
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }



}

//GET SUBMISSION BY ID
exports.submissionCode = async function (req, res) {

    try {
        //  console.log(req.query,req.params);
        var submission = await Submission.findOne({
            site_submission_id: req.params.id
        });

        res.status(200).send(submission);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}

// USING CHILD PROCESS EXECUTE THE UPLOADING OF FILE AND GET THE RESULT
exports.childProcess = async function (req, res) {
    try {

        fs.readFile("./PlagarismFile/commandToRunCpp.txt", 'utf8', function (err, data) {
            if (err) throw err;
            console.log(chalk.blue("READ THE COMMAND AND RUNNING IT WITH UPLOADING THE DATA"),data);

            child_process.exec("cd plagarismFile &" + data, function (error, stdout, stderr) {
                 if(error) console.log(error);
                 console.log(stdout);
                var str = stdout.split(' ');
                var len = str[str.length - 1].length;
                str = str[str.length - 1].substring(11, len - 2);
                console.log(chalk.blue("DATA UPLODAD TO MOSS AND RECIEVED THE MOSS REPORT LINK"), str);

                //call the scrap function for scraping the data
                ScrapLib.ScrapContestPlagiarismData(str, (data) => {

                    console.log(chalk.blue("SAVED THE DATA TO DB BY SCRAPING THE MOSS REPOERT "), "TASK COMPLETED CPP");

                                       


                                fs.readFile("./PlagarismFile/commandToRunPython.txt", 'utf8', function (err, data) {
                                    if (err) throw err;
                                    console.log(chalk.blue("READ THE COMMAND AND RUNNING IT WITH UPLOADING THE DATA"),data);
                        
                                    child_process.exec("cd plagarismFile &" + data, function (error, stdout, stderr) {
                                        if(error) console.log(error);
                                        console.log(stdout);
                                        var str = stdout.split(' ');
                                        var len = str[str.length - 1].length;
                                        str = str[str.length - 1].substring(11, len - 2);
                                        console.log(chalk.blue("DATA UPLODAD TO MOSS AND RECIEVED THE MOSS REPORT LINK"), str);
                        
                                        //call the scrap function for scraping the data
                                        ScrapLib.ScrapContestPlagiarismData(str, (data) => {
                        
                                            console.log(chalk.blue("SAVED THE DATA TO DB BY SCRAPING THE MOSS REPOERT "), "TASK COMPLETED PYTHON");
                        
                                                      

                                                                    fs.readFile("./PlagarismFile/commandToRunJava.txt", 'utf8', function (err, data) {
                                                                        if (err) throw err;
                                                                        console.log(chalk.blue("READ THE COMMAND AND RUNNING IT WITH UPLOADING THE DATA"),data);
                                                            
                                                                        child_process.exec("cd plagarismFile &" + data, function (error, stdout, stderr) {
                                                                            if(error) console.log(error);
                                                                            console.log(stdout);
                                                                            var str = stdout.split(' ');
                                                                            var len = str[str.length - 1].length;
                                                                            str = str[str.length - 1].substring(11, len - 2);
                                                                            console.log(chalk.blue("DATA UPLODAD TO MOSS AND RECIEVED THE MOSS REPORT LINK"), str);
                                                            
                                                                            //call the scrap function for scraping the data
                                                                            ScrapLib.ScrapContestPlagiarismData(str, (data) => {
                                                            
                                                                                console.log(chalk.blue("SAVED THE DATA TO DB BY SCRAPING THE MOSS REPOERT "), "TASK COMPLETED JAVA");
                                                            
                                                                                            



                                                                                                    fs.readFile("./PlagarismFile/commandToRunC.txt", 'utf8', function (err, data) {
                                                                                                        if (err) throw err;
                                                                                                        console.log(chalk.blue("READ THE COMMAND AND RUNNING IT WITH UPLOADING THE DATA"),data);
                                                                                            
                                                                                                        child_process.exec("cd plagarismFile &" + data, function (error, stdout, stderr) {
                                                                                                            if(error) console.log(error);
                                                                                                            console.log(stdout);
                                                                                                            var str = stdout.split(' ');
                                                                                                            var len = str[str.length - 1].length;
                                                                                                            str = str[str.length - 1].substring(11, len - 2);
                                                                                                            console.log(chalk.blue("DATA UPLODAD TO MOSS AND RECIEVED THE MOSS REPORT LINK"), str);
                                                                                            
                                                                                                            //call the scrap function for scraping the data
                                                                                                            ScrapLib.ScrapContestPlagiarismData(str, (data) => {
                                                                                            
                                                                                                                console.log(chalk.blue("SAVED THE DATA TO DB BY SCRAPING THE MOSS REPOERT "), "TASK COMPLETED C");
                                                                                            
                                                                                            
                                                                                                                res.status(200).send({
                                                                                                                    MSG: "TASK COMPLETED SUCCESSFULLY"
                                                                                                                });
                                                                                            
                                                                                                            });
                                                                                            
                                                                                                        });
                                                                                                    });
                                                            
                                                                            });
                                                            
                                                                        });
                                                                    });
            
                                        });
                        
                                    });
                                });

                });

            });
        });

    } catch (error) {
        return res.status(500).send({
            error
        });
    }
}

//DELETE ALL THE GENERATED FILES ONCES IT IS COMPLETED
exports.deleteFiles = async function (req, res) {
    try {
        var filesTobeDeleted = req.body.files;

        console.log(req.body);

        filesTobeDeleted.forEach(filePath => {
            fs.unlinkSync("./PlagarismFile/" + filePath);
            return;
        });

        console.log(chalk.redBright("files deleted successfully"));

        res.status(200).send({
            msg: "files Deleted SUCCESSFULLY"
        });


    } catch (error) {
        res.status(500).send({
            error
        });
    }
}
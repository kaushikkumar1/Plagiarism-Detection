const request = require("request-promise");
const cheerio = require("cheerio");
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Submission = require("../models/submissionModel");
var json2xls = require('json2xls');
var fs = require('fs');

const ObjectsToCsv = require('objects-to-csv');

// CREATE PLAGIARISM DATA FOR FRONTEND
exports.contestResult = async function (req, res) {
    try {

        result = {};
        problem = {};

        var data = await PlagirismData.find({
            contestName: req.body.contest_name
        });

        for (var i = 0; i < data.length; i++) {

            problem[data[i].problemId] = 1;

            if (result[data[i].userNameOne] == null) {
                result[data[i].userNameOne] = {};
                result[data[i].userNameOne][data[i].problemId] = {};

                result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
                result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
                result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;
            } else {

                if (result[data[i].userNameOne][data[i].problemId] == null) {
                    result[data[i].userNameOne][data[i].problemId] = {};

                    result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
                    result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
                    result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;
                } else if (parseInt(result[data[i].userNameOne][data[i].problemId]["matchPercent"]) < data[i].matchPercentOne) {
                    result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
                    result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
                    result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;

                }

            }
            if (result[data[i].userNameTwo] == null) {
                result[data[i].userNameTwo] = {};
                result[data[i].userNameTwo][data[i].problemId] = {};

                result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
                result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
                result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;
            } else {

                if (result[data[i].userNameTwo][data[i].problemId] == null) {
                    result[data[i].userNameTwo][data[i].problemId] = {};

                    result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
                    result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
                    result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;
                } else if (parseInt(result[data[i].userNameTwo][data[i].problemId]["matchPercent"]) < data[i].matchPercentTwo) {

                    result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
                    result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
                    result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;

                }

            }
        }

        var resultArray = [];
        for (var key in result) {

            var temp = [];
            temp.push(key);

            for (var k in problem) {

                if (result[key][k]) {
                    temp.push(result[key][k].mossViewLink);
                    temp.push(result[key][k].matchPercent+"%");
                    temp.push(result[key][k].submissionIdYour);
                    temp.push(result[key][k].submissionIdOther);
                    temp.push(result[key][k].matchedLine);
                } else {
                    temp.push("NA");
                    temp.push("NA");
                    temp.push("NA");
                    temp.push("NA");
                    temp.push("NA");
                }

            }

            resultArray.push(temp);
        }

        // console.log(resultArray);
        var problemArray=["UserName"];

        for(var key in problem)   {
            problemArray.push(key)
            problemArray.push("Match Percent");
            problemArray.push("Your Submission Id");
            problemArray.push("Patner Submission Id");
            problemArray.push("Matched Line");

        }

        res.status(200).send({
            problem: problemArray,
            msg: resultArray
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

//CREATE RESULT IN CSV FILE
exports.contestResultCSV = async function (req, res) {
    try {

        result = {};
        problem = {};

        var data = await PlagirismData.find({
            contestName: req.body.contest_name
        });

        for (var i = 0; i < data.length; i++) {

            problem[data[i].problemId] = 1;

            if (result[data[i].userNameOne] == null) {
                result[data[i].userNameOne] = {};
                result[data[i].userNameOne][data[i].problemId] = {};

                result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
                result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
                result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;
            } else {

                if (result[data[i].userNameOne][data[i].problemId] == null) {
                    result[data[i].userNameOne][data[i].problemId] = {};

                    result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
                    result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
                    result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;
                } else if (parseInt(result[data[i].userNameOne][data[i].problemId]["matchPercent"]) < data[i].matchPercentOne) {
                    result[data[i].userNameOne][data[i].problemId]["submissionIdYour"] = data[i].submissionIdOne;
                    result[data[i].userNameOne][data[i].problemId]["submissionIdOther"] = data[i].submissionIdTwo;
                    result[data[i].userNameOne][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameOne][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameOne][data[i].problemId]["matchedLine"] = data[i].matchedLine;

                }

            }
            if (result[data[i].userNameTwo] == null) {
                result[data[i].userNameTwo] = {};
                result[data[i].userNameTwo][data[i].problemId] = {};

                result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
                result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
                result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;
            } else {

                if (result[data[i].userNameTwo][data[i].problemId] == null) {
                    result[data[i].userNameTwo][data[i].problemId] = {};

                    result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
                    result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
                    result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;
                } else if (parseInt(result[data[i].userNameTwo][data[i].problemId]["matchPercent"]) < data[i].matchPercentTwo) {

                    result[data[i].userNameTwo][data[i].problemId]["submissionIdYour"] = data[i].submissionIdTwo;
                    result[data[i].userNameTwo][data[i].problemId]["submissionIdOther"] = data[i].submissionIdOne;
                    result[data[i].userNameTwo][data[i].problemId]["matchPercent"] = data[i].matchPercentTwo;
                    result[data[i].userNameTwo][data[i].problemId]["mossViewLink"] = data[i].mossViewLink;
                    result[data[i].userNameTwo][data[i].problemId]["matchedLine"] = data[i].matchedLine;

                }

            }
        }

        var resultArray = [];
        for (var key in result) {

            var temp = {};
            temp.UserName=key;

            for (var k in problem) {
                var keyone="mossViewLink"+k;
                var keytwo="MatchPercent"+k;
                var keythree="YourSubmissionId"+k;
                var keyfour="PatnerSubmissionId"+k;
                var keyfive="MatchedLine"+k;


                if (result[key][k]) {
                    temp[keyone]=result[key][k].mossViewLink;
                    temp[keytwo]=(result[key][k].matchPercent+"%");
                    temp[keythree]=result[key][k].submissionIdYour;
                    temp[keyfour]=(result[key][k].submissionIdOther);
                    temp[keyfive]=(result[key][k].matchedLine);
                } else {
                    temp[keyone]=("NA");
                    temp[keytwo]=("NA");
                    temp[keythree]=("NA");
                    temp[keyfour]=("NA");
                    temp[keyfive]=("NA");
                }

            }

            resultArray.push(temp);
        }

          var xls = json2xls(resultArray);

         await fs.writeFileSync('./Result/'+req.body.contest_name+'_result.xlsx', xls, 'binary');
         res.xls('data.xlsx', resultArray);

        // res.status(200).send({
        //     msg: "xlsx file created in Result file"
        // });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
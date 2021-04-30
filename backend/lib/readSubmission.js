const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Profile = require('../models/codingProfilesModel');
const Contest = require('../models/contest');
var fs = require('fs');
const mapData = require("../files/map.json");    //json file which has all the mapping 


exports.readSubmissionData = async function (req, res) {
    try {

        submissionData.forEach(element => {

            var new_submission = new Submission({
                site_submission_timestamp: element.site_submission_timestamp,
                site_submission_id: element.site_submission_id,
                contest_id: element.contest_id,
                contest_name: element.contest_name,
                problem_name: element.problem_name,
                problem_view_link: element.problem_view_link,
                submission_code: element.submission_code,
                submission_status: element.submission_status,
                submission_status_code: element.submission_status_code,
                submission_points: element.submission_points,
                submission_language: element.submission_language,
                submission_view_link: element.submission_view_link,
                site_user_handle: element.site_user_handle,
                site_user_id: element.site_user_id,
                site_name: element.site_name,
                problem_id: element.problem_id,
                in_contest_bounds: element.in_contest_bounds,
                misc_notes: element.misc_notes
            })
            // new_submission.contest_name = new_submission.contest_name + "12-09-2020";

            new_submission.save();
            // console.log(new_submission);

        });
        res.status(200).send("sucess");

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

//GET ALL THE UNIQUE CONTEST
exports.uniqueContests = async function (req, res) {

    try {

        var distinct_contests = await Submission.distinct('plagiarism_contest_name',{in_contest_bounds: true });

        res.status(200).send(distinct_contests);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
    }
}

exports.generateFileForSubmission = async function (req, res) {
    try {
        console.log(req.body.item)
        // console.log(new Date());

        var string_command_c = "perl moss.pl -l c one.c "
        var string_command_cpp = "perl moss.pl -l cc one.cpp ";
        var string_command_java = "perl moss.pl -l java one.java ";
        var string_command_python = "perl moss.pl -l python one.py ";

        var allFiels = [];

        var submission_data = await Submission.find({
            problem_id: req.body.problem_id,
            in_contest_bounds: true
        });

        // console.log(submission_data);


        submission_data.forEach(async element => {

            var new_submission = new Submission({
                site_submission_timestamp: element.site_submission_timestamp,
                site_submission_id: element.site_submission_id,
                contest_id: element.contest_id,
                contest_name: element.contest_name,
                problem_name: element.problem_name,
                problem_view_link: element.problem_view_link,
                submission_code: element.submission_code,
                submission_status: element.submission_status,
                submission_status_code: element.submission_status_code,
                submission_points: element.submission_points,
                submission_language: element.submission_language,
                submission_view_link: element.submission_view_link,
                site_user_handle: element.site_user_handle,
                site_user_id: element.site_user_id,
                site_name: element.site_name,
                problem_id: element.problem_id,
                in_contest_bounds: element.in_contest_bounds,
                misc_notes: element.misc_notes
            })

            var language_Str = new_submission.submission_language;
            console.log(language_Str);

            if (language_Str.includes("cpp")) { //if the code is in cpp language

                string_command_cpp = string_command_cpp + new_submission.site_submission_id + ".cpp ";

                await fs.appendFile("./PlagarismFile/" + new_submission.site_submission_id + ".cpp", new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }); //save the code in a file with filename as submission id
                allFiels.push(new_submission.site_submission_id + ".cpp")
            } else if (language_Str.includes("c")) { //if the code is in c language

                string_command_c = string_command_c + new_submission.site_submission_id + ".c ";

                await fs.appendFile("./PlagarismFile/" + new_submission.site_submission_id + ".c", new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }); //save the code in a file with filename as submission id
                allFiels.push(new_submission.site_submission_id + ".c")

            } else if (language_Str.includes("python")) { //if the code is in python language

                string_command_python = string_command_python + new_submission.site_submission_id + ".py ";

                await fs.appendFile("./PlagarismFile/" + new_submission.site_submission_id + ".py", new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }); //save the code in a file with filename as submission id
                allFiels.push(new_submission.site_submission_id + ".py")

            } else if (language_Str.includes("java")) { //if the code is in java language

                string_command_java = string_command_java + new_submission.site_submission_id + ".java ";

                await fs.appendFile("./PlagarismFile/" + new_submission.site_submission_id + ".java", new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }); //save the code in a file with filename as submission id
                allFiels.push(new_submission.site_submission_id + ".java")

            }

        });

        await fs.appendFile("./PlagarismFile/" + "commandToRunC.txt", string_command_c, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        await fs.appendFile("./PlagarismFile/" + "commandToRunCpp.txt", string_command_cpp, function (err) {
            if (err) throw err;
            console.log('Saved!');
        }); //save the command need to be run in commandToRun.txt file
        await fs.appendFile("./PlagarismFile/" + "commandToRunPython.txt", string_command_python, function (err) {
            if (err) throw err;
            console.log('Saved!');
        }); //save the command need to be run in commandToRun.txt file
        await fs.appendFile("./PlagarismFile/" + "commandToRunJava.txt", string_command_java, function (err) {
            if (err) throw err;
            console.log('Saved!');
        }); //save the command need to be run in commandToRun.txt file
        allFiels.push("commandToRunC.txt")
        allFiels.push("commandToRunCpp.txt");
        allFiels.push("commandToRunPython.txt");
        allFiels.push("commandToRunJava.txt");
        // save the command need to be run in commandToRun.txt file
         console.log(allFiels);
        res.status(200).send({
            command: string_command_c + "\n" + string_command_cpp + "\n" + string_command_python + "\n" + string_command_java,
            files: allFiels
        });

    } catch (error) { //if error through error and return
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.uniqueGeneratedContestReport = async function (req, res) {
    try {
        var contest_name = await Contest.distinct('contest_name',{user_id:req.user._id});
        var contest_id = await Submission.distinct('contest_id',{contest_name:{$in:contest_name}});
        contest_id = await PlagirismData.distinct('contestId',{'contestId':{$in:contest_id}});
        var distinct_contests = await Submission.distinct('contest_name',{contest_id:{$in:contest_id}});
        console.log(distinct_contests);

        res.status(200).send(distinct_contests);
    } catch (error) {
        console.log(error);
        res.status(200).send(error);
    }
}

//get all submission of the user 
exports.getAllSubmissionOfUser = async function (req, res) {
    try {



        var new_user_handle=[];

        let all_username = await Profile.aggregate(
            [
                {
                    $match: {
                        user_roll_number: req.body.user_handle,
                        site_name:{$in:['HACKERRANK','VJUDGE']}
                    }
                },
                {
                    $group: {
                        _id: {
                            site_name: "$site_name",
                            site_user_handle: "$site_user_handle"
                        }
                    }
                },{
                    $project:{
                        site_user_handle:"$_id.site_user_handle"
                    }
                }
            ]
        )

        for(var i=0;i<all_username.length;i++)
        {
            new_user_handle.push(all_username[i]._id.site_user_handle);
        }
        console.log(new_user_handle);


        var query = {
            site_user_handle: {$in: new_user_handle}
        };

        console.log(req.body);
        var offset=(req.body.page*req.body.limit);
        
        Submission.paginate(query, {
            offset: offset || 0,
            limit: req.body.limit || 10,
            sort : {created_at_ms :-1}
        }, function (err, result) {
            result.page=req.body.page || 0;
            
        res.status(200).send(
            result
        );
            // result.docs
            // result.total
            // result.limit - 10
            // result.offset - 20
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}
const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
var fs = require('fs');

exports.readSubmissionData = async function (req, res) {
    try {

        submissionData.forEach(element => {

            var new_submission = new Submission({
                site_submission_timestamp         : element.site_submission_timestamp,
                site_submission_id                : element.site_submission_id,
                contest_id                        : element.contest_id,
                contest_name                      : element.contest_name,
                problem_name                      : element.problem_name,
                problem_view_link                 : element.problem_view_link,
                submission_code                   : element.submission_code,
                submission_status                 : element.submission_status,
                submission_status_code            : element.submission_status_code,
                submission_points                 : element.submission_points,
                submission_language               : element.submission_language,
                submission_view_link              : element.submission_view_link,
                site_user_handle                  : element.site_user_handle,
                site_user_id                      : element.site_user_id,
                site_name                         : element.site_name,
                problem_id                        : element.problem_id,
                in_contest_bounds                 : element.in_contest_bounds,
                misc_notes                        : element.misc_notes
            })

            new_submission.save();
            
        });
        res.status(200).send("sucess");

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

exports.uniqueContests = async function(req,res){

    try{
               
        var distinct_contests=await Submission.distinct('contest_name');

        res.status(200).send(distinct_contests);
        }
    catch(error){
        console.log(error);
        res.status(200).send(error);
    }
}

exports.generateFileForSubmission = async function (req, res) {
    try {
        
        var string_command_c="perl moss.pl -l c "
        var string_command_cpp="perl moss.pl -l cc ";
        var string_command_java="perl moss.pl -l java ";
        var string_command_python="perl moss.pl -l python ";

        var submission_data=await Submission.find({contest_name:req.body.contest_name});


        submission_data.forEach(async element => {

            var new_submission = new Submission({
                site_submission_timestamp         : element.site_submission_timestamp,
                site_submission_id                : element.site_submission_id,
                contest_id                        : element.contest_id,
                contest_name                      : element.contest_name,
                problem_name                      : element.problem_name,
                problem_view_link                 : element.problem_view_link,
                submission_code                   : element.submission_code,
                submission_status                 : element.submission_status,
                submission_status_code            : element.submission_status_code,
                submission_points                 : element.submission_points,
                submission_language               : element.submission_language,
                submission_view_link              : element.submission_view_link,
                site_user_handle                  : element.site_user_handle,
                site_user_id                      : element.site_user_id,
                site_name                         : element.site_name,
                problem_id                        : element.problem_id,
                in_contest_bounds                 : element.in_contest_bounds,
                misc_notes                        : element.misc_notes
            })
            
            var language_Str=new_submission.submission_language;
            console.log(language_Str);
          
            if(language_Str.includes("cpp")){                   //if the code is in cpp language

                string_command_cpp=string_command_cpp + new_submission.site_submission_id + ".cpp ";

                await fs.appendFile("./PlagarismFile/"+new_submission.site_submission_id+".cpp" , new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });                                                         //save the code in a file with filename as submission id
                
            }
            else if(language_Str.includes("c")){                //if the code is in c language

                string_command_c=string_command_c + new_submission.site_submission_id + ".c ";

                await fs.appendFile("./PlagarismFile/"+new_submission.site_submission_id+".c" , new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });                                                         //save the code in a file with filename as submission id
                
            }
            else if(language_Str.includes("python")){           //if the code is in python language

                string_command_python=string_command_python + new_submission.site_submission_id + ".py ";

                await fs.appendFile("./PlagarismFile/"+new_submission.site_submission_id+".py" , new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });                                                         //save the code in a file with filename as submission id
                
            }
            else if(language_Str.includes("java")){             //if the code is in java language

                string_command_java=string_command_java + new_submission.site_submission_id + ".java ";

                await fs.appendFile("./PlagarismFile/"+new_submission.site_submission_id+".java" , new_submission.submission_code, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });                                                         //save the code in a file with filename as submission id
                
            }
            
        });

        await fs.appendFile("./PlagarismFile/"+"commandToRun.txt" , string_command_c +"\n"+ string_command_cpp+"\n"+string_command_python+"\n"+string_command_java, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });                                                               //save the command need to be run in commandToRun.txt file

        res.status(200).send({command:string_command_c +"\n"+ string_command_cpp+"\n"+string_command_python+"\n"+string_command_java});

    } catch (error) {           //if error through error and return
        console.log(error);
        return res.status(500).send(error);
    }
};

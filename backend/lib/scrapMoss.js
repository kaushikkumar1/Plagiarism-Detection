const request = require("request-promise");
const cheerio = require("cheerio");
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Submission = require("../models/submissionModel");


// CREATE PLAGIARISM DATA
exports.ScrapContestPlagiarismData = async function (req, res) {
    try {

        var url = req.body.url;
        url=url.trim();
        var new_submissionOne=[], new_submissionTwo=[];
        var new_submissionOneId,new_submissionTwoId;
        var matchPercentOne, matchPercentTwo;


        await request.get(url,async (error, response, html) => {
            if (!error && response.statusCode == 200) {

                var $ = cheerio.load(html);
            


                await $("body > table > tbody > tr > td").each(async (i, e) => {
                    var str = $(e).text();

                    if (i % 3 == 0) {
                        var res = str.split(" ");
                        var id = res[0].split(".");
                        matchPercentOne = parseInt(res[1].substring(1, res[1].length - 3));
                        new_submissionOneId = id[0];

                    } else if (i % 3 == 1) {
                        var res = str.split(" ");
                        var id = res[0].split(".");
                        matchPercentTwo = parseInt(res[1].substring(1, res[1].length - 3));
                        new_submissionTwoId = id[0];

                    } else {

                        var matchingLine = parseInt(str);
                        // console.log(matchingLine);
                        new_submissionOne.push({new_submissionOneId,matchPercentOne,new_submissionTwoId,matchPercentTwo,matchingLine});
                      
                    }
                })

            }

            for(var i=0;i<new_submissionOne.length;i++){

                 var newone_submissionOne = await Submission.findOne({ site_submission_id: new_submissionOne[i].new_submissionOneId});
                 var newtwo_submissionTwo= await Submission.findOne({ site_submission_id: new_submissionOne[i].new_submissionTwoId});

                //  console.log(newone_submissionOne.site_submission_id,newtwo_submissionTwo.site_submission_id);


                   var new_PDO =new PlagirismData({
                            contestName               :newone_submissionOne.contest_name,
                            contestId                 :newone_submissionOne.contest_id,
                            problemId                 :newone_submissionOne.problem_id,
                            language                  :newone_submissionOne.submission_language,
                            problem_name              :newone_submissionOne.problem_name,

                            userNameOne               :newone_submissionOne.site_user_handle,  
                            submissionIdOne           :newone_submissionOne.site_submission_id,
                            matchPercentOne           :new_submissionOne[i].matchPercentOne,

                            userNameTwo               :newtwo_submissionTwo.site_user_handle,
                            submissionIdTwo           :newtwo_submissionTwo.site_submission_id,
                            matchPercentTwo           :new_submissionOne[i].matchPercentTwo,

                            mossViewLink              :(url+"/match"+(i)+".html"),
                            matchedLine               :new_submissionOne[i].matchingLine

                        })
                      //  console.log(new_PDO);
                       new_PDO.save();
            }

            res.status(200).send({msg:"successfully scraped data"});
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
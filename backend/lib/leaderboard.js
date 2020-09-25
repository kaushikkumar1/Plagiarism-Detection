const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const submissionsStatsModel = require("../models/submissionsStatsModel");
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Contest = require('../models/contest');
const paginate = require('mongoose-pagination');
var fs = require('fs');
const mapData = require("../files/map.json");    //json file which has all the mapping 
const ScoreLib = require("../lib/scoreLib");

exports.getLeaderBoardData = async function (req, res) {

    try {
        console.log(req.body);

        var page = req.body.page;
        var limit = req.body.limit;

        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},problem_id:'181363'}
        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},contest_id:'111223',site_user_handle:'17H51A0526'}
        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},contest_id:'111223',in_contest_bounds:true}
        var query = {
            in_contest_bounds: true
        }

        var ans = await Submission.aggregate(
            [{
                    $match: query
                },
                {
                    $group: {
                        _id: {
                            problem_id: "$problem_id",
                            user_name: "$site_user_handle"
                        },
                        maxP: {
                            $max: "$submission_points"
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            user_name: "$_id.user_name"
                        },
                        total: {
                            $sum: "$maxP"
                        }
                    }
                },
                {
                    $sort: {
                        total: -1
                    }
                }

            ]
        )



// for(var j=0;j<ans.length;j++)
// {
//         for(var i=0;i<mapData.length;i++)
//         {
//             if(mapData[i].hackerrank_username==ans[j]._id.user_name)
//             {
//                 if(mapData[i].interviewbit_handle!=null)
//                 {
//                     var new_site_detail = await submissionsStatsModel.findOne({site_user_handle: mapData[i].interviewbit_handle,site_name: "INTERVIEWBIT"})
//                     .sort({ created_at: -1});
//                     // console.log(new_site_detail,mapData[i].interviewbit_handle);
//                     if(new_site_detail!=null){
//                     ScoreLib.interviewbitScore(new_site_detail.score, async (err,data)=>{
//                         if(!err)
//                         {
//                         // console.log(mapData[i].interviewbit_handle,data);
//                         ans[j].interviewbitScore=data.score;
//                         }
//                     })}
//                 }
//                 break;
//             }
//         }

// }

        var result = await ans.slice((page * limit), (page * limit) + limit);

        // console.log(new_user_handle);

        res.status(200).send({
            total: ans.length,
            page: page,
            limit: limit,
            data: result
        })


    } catch {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}

//get detail of different site codechef leetcode and interviebit
exports.getUserDetailOfDifferentSites = async function (req, res) {

    try {


        var new_user_handle = [];

        var distinct_Sites = await submissionsStatsModel.distinct('site_name');
        console.log(distinct_Sites);


        for (var i = 0; i < mapData.length; i++) {
            if (mapData[i].hackerrank_username == req.body.user_handle) {

                if (mapData[i].codechef_handle)
                    new_user_handle.push([mapData[i].codechef_handle, "CODECHEF"]);
                if (mapData[i].new_leetcode)
                    new_user_handle.push([mapData[i].new_leetcode, "LEETCODE"]);
                if (mapData[i].interviewbit_handle)
                    new_user_handle.push([mapData[i].interviewbit_handle, "INTERVIEWBIT"]);

                break;
            }

        }

        console.log(new_user_handle);


        var site_result = [];

        for (var i = 0; i < new_user_handle.length; i++) {
            var cur_site_name = new_user_handle[i];
            var new_site_detail = await submissionsStatsModel.findOne({
                site_user_handle: cur_site_name[0],
                site_name: cur_site_name[1]
            }).sort({
                created_at: -1
            })
            site_result.push(new_site_detail);
        }

        // console.log(site_result)


        res.status(200).send({
            site_result
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}
const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const PlagirismData = require("../models/contestPlagiarismDataModel");
const profile = require('../models/codingProfilesModel')
const Contest = require('../models/contest');
const paginate = require('mongoose-pagination');
var fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const Profile = require('../models/codingProfilesModel');
const submissionsStatsModel = require("../models/submissionsStatsModel");
const mapData = require("../files/map.json");    //json file which has all the mapping 

exports.getDayLevelReport = async function (req, res) {

    try {
        console.log(req.body);

        // var updated_record= await Submission.updateMany({created_at_ms :{$lte:9999999999} }, { $mul: { created_at_ms : 1000 } });
        // console.log(updated_record);

        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},problem_id:'181363'}
        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},contest_id:'111223',site_user_handle:'17H51A0526'}


        var new_user_handle=[];
        new_user_handle.push(req.body.user_handle);

        for(var i=0;i<mapData.length;i++)
        {
            if(mapData[i].hackerrank_username==req.body.user_handle)
            {
                if(mapData[i].vjudge_username)
                new_user_handle.push(mapData[i].vjudge_username);
                break;
            }
        }

        console.log(new_user_handle);


        var query = {
            submission_status: 'Accepted',
            site_user_handle: {$in: new_user_handle}
        };

        var ans = await Submission.aggregate(
            [{
                    $match: query
                },
                {
                    $project: {
                        date: {
                            $add: [new Date(0), {
                                $multiply: ["$created_at_ms"]
                            }]
                        },
                        user_name: "$site_user_handle",
                        problem_id: "$problem_id"
                    },
                },
                {
                    $project: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$date"
                            }
                        },
                        user_name: "$user_name",
                        problem_id: "$problem_id"
                    }
                },
                {
                    $group: {
                        _id: {
                            handle: "$user_name",
                            date: "$date",
                            problem_id: "$problem_id"
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            handle: "$_id.user_name",
                            date: "$_id.date",
                        },
                        accepted_count: {
                            $sum: 1
                        }
                    }
                },
                // { $sort : { _id.date : -1} }
            ]
        )

        res.status(200).send({
            total: ans.length,
            data: ans
        })


    } catch {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}

//just to check 
exports.getAllSubmission = async (req, res) => {

    try {


        const schema = {
            'name': {
                prop: 'name',
                type: String
            },
            'roll_number': {
                prop: 'roll_number',
                type: String
            },
            'vjudge_username': {
                prop: 'vjudge_username',
                type: String
            },
            'hackerrank_username': {
                prop: 'hackerrank_username',
                type: String
            },
            'hackerrank_usernames': {
                prop: 'hackerrank_usernames',
                type: String
            }
        }
        var new_dis_pro = await Profile.find({});
        // console.log(new_dis_pro);

        var mapdata = {};

        for (var i = 0; i < new_dis_pro.length; i++) {
            var ele = new_dis_pro[i];

            if (mapdata[ele.user_roll_number] == null) {
                mapdata[ele.user_roll_number] = {};
                mapdata[ele.user_roll_number][ele.site_name] = ele.site_user_handle;
            } else {
                mapdata[ele.user_roll_number][ele.site_name] = ele.site_user_handle;
            }

        }
        // console.log(mapdata);
        readXlsxFile('./backend/files/Maping Data.xlsx', {
            schema
        }).then(async ({
            rows,
            errors
        }) => {
            //   readXlsxFile('./backend/files/Maping Data.xlsx').then((rows) => {
            // console.log(rows);
            // `rows` is an array of rows
            // each row being an array of cells.

            for (var i = 0; i < rows.length; i++) {
                if (mapdata[rows[i].roll_number] != null) {
                    rows[i].codechef_handle = mapdata[rows[i].roll_number]['CODECHEF'];
                    rows[i].interviewbit_handle = mapdata[rows[i].roll_number]['INTERVIEWBIT'];
                    rows[i].new_leetcode = mapdata[rows[i].roll_number]['LEETCODE'];
                }
            }




        
        })
       

        res.status(200).send({
            mapdata
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
}
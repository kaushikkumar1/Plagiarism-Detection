const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const submissionsStatsModel = require("../models/submissionsStatsModel");
const Profile = require('../models/codingProfilesModel');
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Contest = require('../models/contest');
const paginate = require('mongoose-pagination');
var fs = require('fs');
const mapData = require("../files/map.json"); //json file which has all the mapping 
const ScoreLib = require("../lib/scoreLib");
const {
    all
} = require("../routes/allRoutes");
const {
    profile
} = require("console");
const {
    runInNewContext
} = require("vm");


function cmp(a, b) {
    if (a.total > b.total)
        return -1;
    return 1;
}

exports.getLeaderBoardData = async function (req, res) {

    try {
        console.log(req.body);

        var page = req.body.page;
        var limit = req.body.limit;


        let codechefScore = {};
        let leetcodeScore = {};
        let interviebitScore = {};
        let hackerrankScore = {};
        let vjudgeScore = {};

        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},problem_id:'181363'}
        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},contest_id:'111223',site_user_handle:'17H51A0526'}
        // var query ={site_name:'HACKERRANK',submission_points:{$gt:0},contest_id:'111223',in_contest_bounds:true}
        var query = {
            in_contest_bounds: true,
            site_name: {
                $in: ['HACKERRANK', 'VJUDGE']
            }
        }

        var ans = await Submission.aggregate(
            [{
                    $match: query
                },
                {
                    $group: {
                        _id: {
                            site_name: "$site_name",
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
                            site_name: "$_id.site_name",
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

        for (let i = 0; i < ans.length; i++) {
            let ele = ans[i];

            if (ele._id.site_name == 'VJUDGE')
                vjudgeScore[ele._id.user_name] = ele.total;
            else if (ele._id.site_name == 'HACKERRANK')
                hackerrankScore[ele._id.user_name] = ele.total;
        }

        //   console.log(hackerrankScore,vjudgeScore);
        //interviewbit score calculation
        var query = {
            site_name: 'INTERVIEWBIT'
        }

        let interviewbit_score = await submissionsStatsModel.aggregate(
            [{
                    $match: query
                },
                {
                    $sort: {
                        created_at: 1
                    }
                },
                {

                    $group: {
                        _id: {
                            site_name: "$site_name",
                            site_user_handle: "$site_user_handle"
                        },
                        lastSalesDate: {
                            $last: "$created_at"
                        },
                        score: {
                            $last: "$score"
                        },
                    }

                }

            ]
        )

        for (let i = 0; i < interviewbit_score.length; i++) {
            let ele = interviewbit_score[i];
            ScoreLib.interviewbitScore(ele.score, ele._id.site_user_handle, (error, data) => {
                interviebitScore[data.handle] = data.score;
            })
            // console.log(ele);
        }

        // console.log(interviebitScore);
        //    console.log(interviewbit_score);


        //leetcode score calculation
        var query = {
            site_name: 'LEETCODE'
        }

        let leetcode_scores = await submissionsStatsModel.aggregate(
            [{
                    $match: query
                },
                {
                    $sort: {
                        created_at: 1
                    }
                },
                {

                    $group: {
                        _id: {
                            site_name: "$site_name",
                            site_user_handle: "$site_user_handle"
                        },
                        lastSalesDate: {
                            $last: "$created_at"
                        },
                        solved_count: {
                            $last: "$solved_count"
                        },
                    }

                }

            ]
        )

        for (let i = 0; i < leetcode_scores.length; i++) {
            let ele = leetcode_scores[i];
            ScoreLib.leetcodeScore(ele.solved_count, ele._id.site_user_handle, (error, data) => {
                leetcodeScore[data.handle] = data.score;
            })
            // console.log(ele);
        }

        // console.log(leetcodeScore);
        // console.log(leetcode_scores);

        //codechef score calcultaion
        var query = {
            site_name: 'CODECHEF'
        }

        let codechef_scores = await submissionsStatsModel.aggregate(
            [{
                    $match: query
                },
                {
                    $sort: {
                        created_at: 1
                    }
                },
                {

                    $group: {
                        _id: {
                            site_name: "$site_name",
                            site_user_handle: "$site_user_handle"
                        },
                        lastSalesDate: {
                            $last: "$created_at"
                        },
                        solved_count: {
                            $last: "$solved_count"
                        },
                        user_rating: {
                            $last: "$user_rating"
                        }
                    }

                }

            ]
        )
        //    console.log(codechef_scores);

        for (let i = 0; i < codechef_scores.length; i++) {
            let ele = codechef_scores[i];
            ScoreLib.codechefScore(ele.solved_count, ele.user_rating, ele._id.site_user_handle, (error, data) => {
                codechefScore[data.handle] = data.score;
            })
        }
        // console.log(codechefScore);


        var query = {
            site_name: {
                $in: ['CODECHEF', 'LEETCODE', 'INTERVIEWBIT', 'HACKERRANK', 'VJUDGE']
            },
            // user_roll_number: {
            //     $in: all_roll_numbers
            // }
        };


        var all_leetcode_interviewbit_hackerrank_handle = await Profile.aggregate(
            [{
                    $match: query
                },
                {
                    $group: {
                        _id: {
                            handle: "$site_user_handle",
                            site_name: "$site_name",
                            user_roll_number: "$user_roll_number"
                        }
                    }
                }
            ]
        )

        // console.log(all_leetcode_interviewbit_hackerrank_handle);

        let mapresult = {}

        for (let i = 0; i < all_leetcode_interviewbit_hackerrank_handle.length; i++) {
            let ele = all_leetcode_interviewbit_hackerrank_handle[i];
            if (ele._id.site_name == 'INTERVIEWBIT') {
                if (mapresult[ele._id.user_roll_number] == null) {
                    mapresult[ele._id.user_roll_number] = {};
                    mapresult[ele._id.user_roll_number]['INTERVIEWBIT'] = interviebitScore[ele._id.handle];
                } else {
                    mapresult[ele._id.user_roll_number]['INTERVIEWBIT'] = interviebitScore[ele._id.handle];

                }
            } else if (ele._id.site_name == 'CODECHEF') {
                if (mapresult[ele._id.user_roll_number] == null) {
                    mapresult[ele._id.user_roll_number] = {};
                    mapresult[ele._id.user_roll_number]['CODECHEF'] = codechefScore[ele._id.handle];
                } else {
                    mapresult[ele._id.user_roll_number]['CODECHEF'] = codechefScore[ele._id.handle];

                }
            } else if (ele._id.site_name == 'LEETCODE') {
                if (mapresult[ele._id.user_roll_number] == null) {
                    mapresult[ele._id.user_roll_number] = {};
                    mapresult[ele._id.user_roll_number]['LEETCODE'] = leetcodeScore[ele._id.handle];
                } else {
                    mapresult[ele._id.user_roll_number]['LEETCODE'] = leetcodeScore[ele._id.handle];

                }
            } else if (ele._id.site_name == 'HACKERRANK') {
                if (mapresult[ele._id.user_roll_number] == null) {
                    mapresult[ele._id.user_roll_number] = {};
                    mapresult[ele._id.user_roll_number]['HACKERRANK'] = hackerrankScore[ele._id.handle];
                } else {
                    mapresult[ele._id.user_roll_number]['HACKERRANK'] = hackerrankScore[ele._id.handle];

                }
            } else if (ele._id.site_name == 'VJUDGE') {
                if (mapresult[ele._id.user_roll_number] == null) {
                    mapresult[ele._id.user_roll_number] = {};
                    mapresult[ele._id.user_roll_number]['VJUDGE'] = vjudgeScore[ele._id.handle];
                } else {
                    mapresult[ele._id.user_roll_number]['VJUDGE'] = vjudgeScore[ele._id.handle];

                }
            }
        }

        // console.log(mapresult);


        let final_result = [];

        for (key in mapresult) {
            let ele = mapresult[key];
            let temp = {};
            temp.roll_number = key;
            temp.hackerrank_score = ele.HACKERRANK;
            temp.vjudge_score = ele.VJUDGE;
            temp.interviewbit_score = ele.INTERVIEWBIT;
            temp.leetcode_score = ele.LEETCODE;
            temp.codechef_score = ele.CODECHEF;
            temp.total = 0;
            if (temp.hackerrank_score)
                temp.total += temp.hackerrank_score;

            if (temp.vjudge_score)
                temp.total += temp.vjudge_score;

            if (temp.interviewbit_score)
                temp.total += temp.interviewbit_score;

            if (temp.leetcode_score)
                temp.total += temp.leetcode_score;

            if (temp.codechef_score)
                temp.total += temp.codechef_score;

            temp.total = Math.round(temp.total * 100) / 100; //rounding down to two decimal place

            final_result.push(temp);
        }


        final_result.sort(cmp);
        let total_length = final_result.length

        final_result = await final_result.slice((page * limit), (page * limit) + limit);

        // console.log(new_user_handle);

        res.status(200).send({
            total: total_length,
            page: page,
            limit: limit,
            data: final_result
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
        // console.log(distinct_Sites);



        let all_username = await Profile.aggregate(
            [{
                    $match: {
                        user_roll_number: req.body.user_handle
                    }
                },
                {
                    $group: {
                        _id: {
                            site_name: "$site_name",
                            site_user_handle: "$site_user_handle"
                        }
                    }
                }
            ]
        )

        for (var i = 0; i < all_username.length; i++) {

            if (all_username[i]._id.site_name == 'CODECHEF')
                new_user_handle.push([all_username[i]._id.site_user_handle, "CODECHEF"]);
            if (all_username[i]._id.site_name == 'LEETCODE')
                new_user_handle.push([all_username[i]._id.site_user_handle, "LEETCODE"]);
            if (all_username[i]._id.site_name == 'INTERVIEWBIT')
                new_user_handle.push([all_username[i]._id.site_user_handle, "INTERVIEWBIT"]);

        }
        // console.log(all_username);
        // console.log("check",new_user_handle);


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
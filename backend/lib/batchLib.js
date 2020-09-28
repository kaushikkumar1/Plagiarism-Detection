const e = require('express');
const Batch = require('../models/batchProfilesModel');
const profile = require('../models/codingProfilesModel');
const Submission = require('../models/submissionModel');


function cmp(a, b) {
    if (a.totalScore > b.totalScore)
        return -1;
    return 1;
}
//get all unique batch
exports.uniqueBatch = async (req, res) => {

    try {

        var all_batch = await Batch.distinct('batch_name');
        res.status(200).send({
            all_batch
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}

// get data of a perticular batch 
exports.getDataOfBatch = async (req, res) => {

    try {

        var mapRollNumber = {}
        mapRollNumber['HACKERRANK'] = {};
        mapRollNumber['VJUDGE'] = {};
        var result = {};

        var all_roll_numbers = await Batch.distinct('user_roll_number', {
            batch_name: req.body.batch_name
        });

        // console.log(all_roll_numbers);

        var vjudge_submission= await Submission.find({site_name:"VJUDGE"}).limit(1);
        // console.log(vjudge_submission);

        var query = {
            site_name: {
                $in: ['HACKERRANK', 'VJUDGE']
            },
            user_roll_number: {
                $in: all_roll_numbers
            }
        };


        var all_hackerrank_vjudge_user_name = await profile.aggregate(
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

        // console.log(all_hackerrank_vjudge_user_name);

        var all_vjudge_hackerrank_handle = [];


        for (var i = 0; i < all_hackerrank_vjudge_user_name.length; i++) {
            var ele = all_hackerrank_vjudge_user_name[i];
            all_vjudge_hackerrank_handle.push(ele._id.handle);

            mapRollNumber[ele._id.site_name][ele._id.handle] = ele._id.user_roll_number;

        }

        var query = {
            site_name: {
                $in: ['HACKERRANK', 'VJUDGE']
            },
            site_user_handle: {
                $in: all_vjudge_hackerrank_handle
            },
            in_contest_bounds: true
        };

        //updating the accepted submission of vjudge with score of hundred and marking in_contest_bound true
        var updated_vjudge_score= await Submission.updateMany({site_name:"VJUDGE",submission_status:"Accepted"},{submission_points:100,in_contest_bounds: true });
        console.log(updated_vjudge_score);

        var all_score = await Submission.aggregate(
            [{
                    $match: query
                }, {
                    $group: {
                        _id: {
                            problem_id: "$problem_id",
                            site_name: "$site_name",
                            site_user_handle: "$site_user_handle"
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
                            site_user_handle: "$_id.site_user_handle"
                        },
                        score: {
                            $sum: "$maxP"
                        }
                    }
                }
            ]
        )


        for (var i = 0; i < all_score.length; i++) {
            var roll_number = mapRollNumber[all_score[i]._id.site_name][all_score[i]._id.site_user_handle];
            all_score[i].roll_number = roll_number;

            if (result[roll_number] == null)
                result[roll_number] = {};

            result[roll_number][all_score[i]._id.site_name] = all_score[i];
        }

        var final_result = [];


        for (key in result) {
            roll_number = key;
            element = result[key];
            var data = {}
            data.roll_number = roll_number;
            data.totalScore = 0;


            if (element.VJUDGE) {
                data.vjudge_score = element.VJUDGE.score;
                data.vjudge_username = element.VJUDGE._id.site_user_handle;
                data.totalScore = element.VJUDGE.score + data.totalScore;
            }

            if (element.HACKERRANK) {
                data.hackerrank_score = element.HACKERRANK.score;
                data.hackerrank_username = element.HACKERRANK._id.site_user_handle;
                data.totalScore = element.HACKERRANK.score + data.totalScore;
            }

            if(element.HACKERRANK==null || element.VJUDGE==null)
            {
                for (var i = 0; i < all_hackerrank_vjudge_user_name.length; i++) {

                    var ele = all_hackerrank_vjudge_user_name[i];

                    if(roll_number==ele._id.user_roll_number && ele._id.site_name=="HACKERRANK")
                    data.hackerrank_username=ele._id.handle;

                    if(roll_number==ele._id.user_roll_number && ele._id.site_name=="VJUDGE")
                    data.vjudge_username=ele._id.handle;

                    // all_vjudge_hackerrank_handle.push(ele._id.handle);
        
                    // mapRollNumber[ele._id.site_name][ele._id.handle] = ele._id.user_roll_number;
        
                }


            }
            data.totalScore=Math.round(data.totalScore*100)/100;

            final_result.push(data);
        }

        final_result.sort(cmp);

        res.status(200).send({
            final_result
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}





//final_result data
// {
//     "roll_number": "18H51A05M8",
//     "score": 5590.91,
//     "vjudge_score": 0,
//     "vjudge_username": "VJUDGE",
//     "hackerrank_score": 5590.91,
//     "hackerrank_username": "HACKERRANK"
// },

//result data

//  {
//     "VJUDGE": {
//         "_id": {
//             "site_name": "VJUDGE",
//             "site_user_handle": "sidreds06"
//         },
//         "score": 0,
//         "roll_number": "18H51A04K0"
//     },
//     "HACKERRANK": {
//         "_id": {
//             "site_name": "HACKERRANK",
//             "site_user_handle": "18H51A04K0"
//         },
//         "score": 5311.24,
//         "roll_number": "18H51A04K0"
//     }
// },
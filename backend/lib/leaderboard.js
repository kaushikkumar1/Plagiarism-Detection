const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Contest = require('../models/contest');
const paginate = require('mongoose-pagination');
var fs = require('fs');


exports.getLeaderBoardData = async function (req, res) {

    try {
        console.log(req.body);

        var page = req.body.page;
        var limit = req.body.limit;

        // // Submission.paginate({}, { offset: 0, limit: 10 }, function(err, result) {
        // //     console.log(result)
        // //     // result.docs
        // //     // result.total
        // //     // result.limit - 10
        // //     // result.offset - 20
        // // });
        // // // var distinct_user = await Submission.distinct('site_user_handle');
        // // // console.log(distinct_user);

        // // Submission
        // //     .find()
        // //     .paginate(1, 10)
        // //     .exec(function (err, docs) {
        // //         console.log('docs: ', docs)
        // //     });
        var ans = await Submission.aggregate(
            [  
                {
                    $group: {
                        _id:        { problem_id:"$problem_id" , user_name: "$site_user_handle" },
                        maxP:{ $max:"$submission_points"}
                    }
                },
                {
                    $group: {
                        _id:        { user_name: "$_id.user_name"},
                        total :     { $sum: "$maxP"}
                    }
                },
                { $sort : { total : -1} }

            ]
        )


         var result = await ans.slice((page * limit), (page * limit) + limit);

        res.status(200).send({
            total: ans.length,
            page: page,
            limit: limit,
            data: result
        })

        // var ans=await Submission.updateMany({submission_points:null},{submission_points:0});

        // res.status(200).send({ans:"ok"});

    } catch {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}

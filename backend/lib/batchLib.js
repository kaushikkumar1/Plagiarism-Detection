const Batch =require('../models/batchProfilesModel');
const profile = require('../models/codingProfilesModel');
const Submission= require('../models/submissionModel');

//get all unique batch
exports.uniqueBatch = async (req,res)=>{

    try{

        var all_batch = await Batch.distinct('batch_name');
        res.status(200).send({all_batch});

    }catch(error)
    {
        console.log(error);
        res.status(500).send({error});
    }
}

// get data of a perticular batch 
exports.getDataOfBatch = async (req,res)=>{

    try{

      var mapRollNumber={}
      mapRollNumber['HACKERRANK']={};
      mapRollNumber['VJUDGE']={};

      var all_roll_numbers = await Batch.distinct('user_roll_number',{batch_name:req.body.batch_name});

        var query = {
            site_name: {$in : ['HACKERRANK','VJUDGE']},
            user_roll_number : {$in: all_roll_numbers}
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
                            user_roll_number:"$user_roll_number"
                        }
                    }
                }
            ]
        )

        var all_vjudge_hackerrank_handle=[];


        for(var i=0;i<all_hackerrank_vjudge_user_name.length;i++)
        {
            var ele=all_hackerrank_vjudge_user_name[i];
            all_vjudge_hackerrank_handle.push(ele._id.handle);

            mapRollNumber[ele._id.site_name][ele._id.handle]=ele._id.user_roll_number;

        }

        var query = {
            site_name: {$in : ['HACKERRANK','VJUDGE']},
            site_user_handle : {$in: all_vjudge_hackerrank_handle}
        };

        var all_score = await Submission.aggregate(
            [{
                    $match: query
                },
                {
                    $group: {
                        _id: {
                            site_name: "$site_name",
                            site_user_handle:"$site_user_handle"
                        }, 
                        score: {
                            $sum: "$submission_points"
                        }
                    }
                }
            ]
        )


        for(var i=0;i<all_score.length;i++)
        {
            var roll_number =mapRollNumber[all_score[i]._id.site_name][all_score[i]._id.site_user_handle];
            all_score[i].roll_number=roll_number;
         }
         
        res.status(200).send({all_score});


    }catch(error)
    {
        console.log(error);
        res.status(500).send({error});
    }
}
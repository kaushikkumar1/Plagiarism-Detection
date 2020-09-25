const Batch =require('../models/batchProfilesModel');
const profile = require('../models/codingProfilesModel');

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

      var all_roll_numbers = await Batch.distinct('user_roll_number',{batch_name:req.body.batch_name});

        var query = {
            site_name: {$in : ['HACKERRANK','VJUDGE']},
            user_roll_number : {$in: all_roll_numbers}
        };


        var all_hackerrank_user_name = await profile.aggregate(
            [{
                    $match: query
                },
                {
                    $group: {
                        _id: {
                            handle: "$site_user_handle",
                            site_name: "$site_name",
                        }
                    }
                }
            ]
        )
        res.status(200).send({all_hackerrank_user_name});


    }catch(error)
    {
        console.log(error);
        res.status(500).send({error});
    }
}
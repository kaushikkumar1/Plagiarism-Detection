const mongoose = require("mongoose");

const plagarismDataSchema = mongoose.Schema({

    contestName               :{ type: String, required: true },
    contestId                 :{ type: String },
    problemId                 :{ type: String },
    problem_name              :{ type: String },
    language                  :{ type: String },

    userNameOne               :{ type: String },  
    submissionIdOne           :{ type: String },
    matchPercentOne           :{ type: Number },

    userNameTwo               :{ type: String },
    submissionIdTwo           :{ type: String },
    matchPercentTwo           :{ type: Number },

    mossViewLink              :{ type: String },
    matchedLine               :{ type: Number },
    copied                    :{type:Boolean,default: false }
})

plagarismDataSchema.index({ submissionIdOne: 1, submissionIdTwo: 1 }, { unique: true });


module.exports = mongoose.model("PlagarismData", plagarismDataSchema);
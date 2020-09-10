const mongoose = require("mongoose");

const plagarismResultSchema = mongoose.Schema({

    contestName                  :{type :String, required: true  },
    problemId                    :{type :String},
    noOfLineMatched              :{type :Number},

    userName                     :{type :String},       //first person's data who got caught in palagarism
    profileUrl                   :{type :String},
    matchPercent                 :{type :Number},
    codeOne                      :{type :String},
    codeTwo                      :{type :String},
    mossViewLink                 :{type :Number},
})

module.exports = mongoose.model("PlagarismResult", plagarismResultSchema);
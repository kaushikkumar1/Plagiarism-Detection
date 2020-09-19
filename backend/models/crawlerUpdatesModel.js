const mongoose =require('mongoose');
const Schema = mongoose.Schema;
var crawlerUpdateSchema = new Schema({
    site_name                         : { type: String,  required: true, enum: ['CODECHEF', 'CODEFORCES', 'HACKERRANK', 'HACKEREARTH', 'INTERVIEWBIT', 'LEETCODE', 'MENTORPICK', 'SPOJ', 'UVA', 'VJUDGE']},
    status                            : String,
    created_at                        : {type: Date, default: Date.now },
    updated_at                        : {type: Date }
})

module.exports = mongoose.model("CrawlerUpdate", crawlerUpdateSchema);
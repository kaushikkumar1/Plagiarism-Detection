const mongoose =require('mongoose');
const Schema = mongoose.Schema;
var submissionStatsSchema = new Schema({
    user_id                           : { type: Schema.Types.ObjectId, ref: 'user'},
    site_name                         : { type: String,  required: true, enum: ['CODECHEF', 'CODEFORCES', 'HACKERRANK', 'HACKEREARTH', 'INTERVIEWBIT', 'LEETCODE', 'MENTORPICK', 'SPOJ', 'UVA', 'VJUDGE']},
    site_user_handle                  : String,
    site_user_id                      : String,
    solved_count                      : Number,
    score                             : Number,
    rank                              : Number,
    user_rating                       : Number,
    star_rating                       : Number,
    country_rank                      : Number,
    global_rank                       : Number,
    crawled_by_server                 : String,
    misc_notes                        : String,
    created_at_date_string            : String,
    created_at_ms                     : Number,
    updated_at_ms                     : Number,
    created_at                        : {type: Date, default: Date.now },
    updated_at                        : {type: Date }
})

module.exports = mongoose.model("SubmissionStat", submissionStatsSchema);
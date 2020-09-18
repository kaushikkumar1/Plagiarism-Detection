const mongoose =require('mongoose');
const Schema = mongoose.Schema;
var codingProfileSchema = new Schema({
    user_id                           : { type: Schema.Types.ObjectId, ref: 'User'},
    site_name                         : { type: String,  required: true, enum: ['CODECHEF', 'CODEFORCES', 'HACKERRANK', 'HACKEREARTH', 'INTERVIEWBIT', 'LEETCODE', 'MENTORPICK', 'SPOJ', 'UVA', 'VJUDGE']},
    site_user_handle                  : { type: String, required: true},
    is_crawler_active                 : { type: Boolean, default: true},
    last_crawled_at                   : { type: Date },
    is_handle_valid                   : { type: Boolean },
    remarks                           : String
});

codingProfileSchema.index({ site_name: 1, site_user_handle: 1 }, { unique: true });

module.exports = mongoose.model("CodingProfile", codingProfileSchema);
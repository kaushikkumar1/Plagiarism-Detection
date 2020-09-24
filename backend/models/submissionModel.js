const mongoose =require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var submissionSchema = new mongoose.Schema({
    user_id                           : { type: Schema.Types.ObjectId, ref: 'User'},
    site_submission_timestamp         : Date,
    site_submission_id                : {type: Number, unique:true, require: true},
    contest_id                        : String,
    contest_name                      : String,
    plagiarism_contest_name           : String,
    problem_name                      : String,
    problem_view_link                 : String,
    submission_code                   : String,
    submission_status                 : String,
    submission_status_code            : Number,
    submission_status_normalized      : String,
    submission_points                 : {type:Number , default:0},
    submission_language               : String,
    submission_language_normalized    : String,
    submission_view_link              : String,
    site_user_handle                  : String,
    site_user_id                      : String,
    site_name                         : String,
    problem_id                        : String,
    in_contest_bounds                 : Boolean,
    misc_notes                        : String,
    memory_used                       : Number,
    time_taken                        : Number,
    is_public                         : String,
    created_at_ms                     : Number,
    updated_at_ms                     : Number,
    created_at                        : {type: Date, default: Date.now },
    updated_at                        : {type: Date }
})

submissionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Submission", submissionSchema);
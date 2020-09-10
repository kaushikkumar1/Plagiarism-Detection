const mongoose =require('mongoose');
var submissionSchema = new mongoose.Schema({
    // user_id:                        { type: Schema.Types.ObjectId, ref: 'user', required: true },

    site_submission_timestamp         : Date,
    site_submission_id                : {type: Number, unique:true, require: true},
    contest_id                        : String,
    contest_name                      : String,
    problem_name                      : String,
    problem_view_link                 : String,
    submission_code                   : String,
    submission_status                 : String,
    submission_status_code            : Number,
    submission_points                 : String,
    submission_language               : String,
    submission_view_link              : String,
    site_user_handle                  : String,
    site_user_id                      : String,
    site_name                         : String,
    problem_id                        : String,
    in_contest_bounds                 : Boolean,
    misc_notes                        : String,
    created_at_ms                     : Number,
    updated_at_ms                     : Number,
    submission_entry_created_at       : {type: Date, default: Date.now },
    submission_entry_updated_at       : {type: Date }
})

module.exports = mongoose.model("Submission", submissionSchema);
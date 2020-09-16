const mongoose = require('mongoose');

// SCHEMA OF THE USER ( HOSTEL OWNER )
const contestSchema = new mongoose.Schema({
    contest_name: {
        type: String,
        unique:true,
        required: true
    },
    _hrank_session: {
        type: String,
        required: true
    },
    crawlingPending: {
        type: Boolean,
        default: true
    },
    lrTime:{
        type:Date,
        default:new Date(0)
    },
    islongContest:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Contest', contestSchema);
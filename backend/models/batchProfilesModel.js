const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BatchSchemaProfiles = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user_roll_number: {
        type: String,
        required: true
    },
    batch_name: {
        type: String,
        required: true
    },
    sub_batch_name: {
        type: String
    }
});


BatchSchemaProfiles.index({
    user_roll_number: 1,
    user_batch_name: 1
}, {
    unique: true
});


module.exports = mongoose.model("BatchProfiles", BatchSchemaProfiles);
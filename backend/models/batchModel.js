const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BatchSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user_roll_number: {
        type: String,
        required: true
    },
    user_batch_name: {
        type: string,
        required: true
    },
});


BatchSchema.index({
    user_roll_number: 1,
    user_batch_name: 1
}, {
    unique: true
});


module.exports = mongoose.model("Batch", BatchSchema);
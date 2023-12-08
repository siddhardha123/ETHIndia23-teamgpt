const mongoose = require('mongoose');

const rulesSchema = new mongoose.Schema({
    org_id: {
        type: String,
        required: true,
        unique: true
    },
    rules: {
        type: Object,
        required: true
    },
    is_latest: {
        type: Boolean,
        default: true
    }
});

const Rules = mongoose.model('Rules', rulesSchema);

module.exports = Rules;

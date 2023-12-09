const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    social_links: [{
        platform: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }],
    profile_image: {
        type: String,
    },
    wallet_address: {
        type: String,
        required:true,
    }
});

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;

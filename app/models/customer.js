const mongoose = require('mongoose'),
    schema = new mongoose.Schema({
        firstName: {type: String},
        lastName: {type: String},
    });

module.exports = mongoose.model('customer', schema);

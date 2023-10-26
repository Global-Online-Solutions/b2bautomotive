var mongoose = require('mongoose');
  
var AppSchema = new mongoose.Schema({
    

    fullName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    urlGoogle: {
        type: String,
        required: true
    },
    urlApp: {
        type: String,
        required: true
    },
    screen: {
        contentType: String,
        data: Buffer
    },
    urlBadge: {
        type: String,
        required: true
    },
    qrCode: {
        contentType: String,
        data: Buffer
    },

});

module.exports = mongoose.model('App', AppSchema);
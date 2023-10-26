var mongoose = require('mongoose');
  
var SalonSchema = new mongoose.Schema({
    

    fullName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true
    },
    file: {
        contentType: String,
        data: Buffer 
    },
    logo: {
        contentType: String,
        data: Buffer
    },

});

module.exports = mongoose.model('Salon', SalonSchema);
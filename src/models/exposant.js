var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
  
var ExposantSchema = new mongoose.Schema({

    ExposantId  : ObjectId,
    
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    function: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    expo: {
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
    profil: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Exposant', ExposantSchema);
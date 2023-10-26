var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;
  
var MeetingSchema = new mongoose.Schema({

    MeetingId  : ObjectId,

    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userCompany: {
        type: String,
        required: true
    },
    userFunction: {
        type: String,
        required: true
    },
    exposant_id: {
        type: String,
        required: true
    },
    exposantName: {
        type: String,
        required: true
    },
    exposantEmail: {
        type: String,
        required: true
    },
    exposantCompany: {
        type: String,
        required: true
    },
    exposantSector: {
        type: String,
        required: true
    },

});
 
 
module.exports = mongoose.model('Meeting', MeetingSchema);
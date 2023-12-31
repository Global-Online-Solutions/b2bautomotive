var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectID;
  
var UserSchema = new mongoose.Schema({
    
    UserId  : ObjectId,

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
    profil: {
        type: String,
        required: true
    },

});
 
UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
});
 
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);
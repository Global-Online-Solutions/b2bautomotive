var App = require('../models/app');
var config = require('../config/config');
var express         = require('express'),
    routes          = express.Router();



exports.listApp = (req, res) => {
    App.find ((err,app)=> {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.send(app) ;
        }
    });
};




const salon = require("../models/salon");
var config = require('../config/config');


exports.listSalon = (req, res) => {
    salon.find ((err,salon)=> {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.send(salon) ;
        }
    });
};

exports.getSalon =  (req, res) => { 
    const fullName = req.params.fullName;

    salon.find({fullName})
        .then (salon => {
            if (!salon)
                res.status(404).send({ message: "Not found meeting" })
            else res.send(salon);
        })
        .catch (err => {
            res
                .status(500)
                .send ({ message: "Error retrieving meeting" });
        });
};
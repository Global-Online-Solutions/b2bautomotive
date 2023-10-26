const exposant = require("../models/exposant");
var config = require('../config/config');


exports.listExposant = (req, res) => {
    exposant.find ((err,exposant)=> {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.send(exposant) ;
        }
    });
};


exports.getExposant =  (req, res) => { 
    const id = req.params.id;

    exposant.findById(id)
        .then (exposant => {
            if (!exposant)
                res.status(404).send({ message: "Not found exposant" })
            else res.send(exposant);
        })
        .catch (err => {
            res
                .status(500)
                .send ({ message: "Error retrieving exposant" });
        });

};
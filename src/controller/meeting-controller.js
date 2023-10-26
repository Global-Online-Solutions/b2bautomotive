var Meeting = require('../models/meeting');
var config = require('../config/config');
var express         = require('express'),
    routes          = express.Router();


const nodemailer = require("nodemailer");


    exports.listMeeting = (req, res) => {
        Meeting.find ((err,meeting)=> {
            if (err) {
                return res.status(400).send({ 'msg': err });
            }
            else {
                return res.send(meeting) ;
            }
        });
    };


    exports.getMeetingExposant =  (req, res) => { 
        const exposantCompany = req.params.exposantCompany;
        console.log(req.params);
    
        Meeting.find({exposantCompany, etat:"En cour de traitement"})
            .then (Meeting => {
                if (!Meeting)
                    res.status(404).send({ message: "Not found meeting" })
                else res.send(Meeting);
            })
            .catch (err => {
                res
                    .status(500)
                    .send ({ message: "Error retrieving meeting" });
            });
    };


    exports.getMeetingExposantValider =  (req, res) => { 
        const exposantCompany = req.params.exposantCompany;
    
        Meeting.find({exposantCompany, etat:"valider"})
            .then (Meeting => {
                if (!Meeting)
                    res.status(404).send({ message: "Not found meeting" })
                else res.send(Meeting);
            })
            .catch (err => {
                res
                    .status(500)
                    .send ({ message: "Error retrieving meeting" });
            });
    
    };


    exports.getMeetingExposantRefuser =  (req, res) => { 
        const exposantCompany = req.params.exposantCompany;
    
        Meeting.find({exposantCompany, etat:"refuser"})
            .then (Meeting => {
                if (!Meeting)
                    res.status(404).send({ message: "Not found meeting" })
                else res.send(Meeting);
            })
            .catch (err => {
                res
                    .status(500)
                    .send ({ message: "Error retrieving meeting" });
            });
    
    };


    exports.getMeetingUser =  (req, res) => { 
        const userEmail = req.params.userEmail;
    
        Meeting.find({userEmail, etat:"En cour de traitement"})
            .then (Meeting => {
                if (!Meeting)
                    res.status(404).send({ message: "Not found meeting" })
                else res.send(Meeting);
            })
            .catch (err => {
                res
                    .status(500)
                    .send ({ message: "Error retrieving meeting" });
            });
    
    };


    exports.getMeetingUserValider =  (req, res) => { 
        const userEmail = req.params.userEmail;
    
        Meeting.find({userEmail, etat:"valider"})
            .then (Meeting => {
                if (!Meeting)
                    res.status(404).send({ message: "Not found meeting" })
                else res.send(Meeting);
            })
            .catch (err => {
                res
                    .status(500)
                    .send ({ message: "Error retrieving meeting" });
            });
    
    };


    exports.getMeetingUserRefuser =  (req, res) => { 
        const userEmail = req.params.userEmail;
    
        Meeting.find({userEmail, etat:"refuser"})
            .then (Meeting => {
                if (!Meeting)
                    res.status(404).send({ message: "Not found meeting" })
                else res.send(Meeting);
            })
            .catch (err => {
                res
                    .status(500)
                    .send ({ message: "Error retrieving meeting" });
            });
    
    };
    

    exports.validerMeeting = (req, res) => {
        const meet = {etat: "valider"};
        const id = req.params.id;

        Meeting.findByIdAndUpdate(req.params.id, { $set: meet }, { new: true }, (err, meeting) => {
            if (!err) { 
                res.send(meeting);
                console.log('meeting',meeting); 

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.lifestyle.ma',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                        auth: {
                            user: 'contact@emails-checker.com', // generated ethereal user
                            pass: 'GOS2017gos'  // generated ethereal password
                        },
                        tls: {
                        ciphers : 'SSLv3',
                        },
                });

                let mailUserOptions = {
                    from: 'contact@emails-checker.com', // sender address
                    to: meeting.userEmail, // list of receivers
                    subject: 'request meeting', // Subject line
                    text: 'your meeting had valideted', // plain text body

                };
            
                // send mail with defined transport object
                transporter.sendMail(mailUserOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);   
                
                    res.render('contact', {msg:'Email has been sent'});
                });

                let mailExposantOptions = {
                    from: 'contact@emails-checker.com', // sender address
                    to: meeting.exposantEmail, // list of receivers
                    subject: 'request meeting', // Subject line
                    text: 'your meeting had valideted', // plain text body

                };
            
                // send mail with defined transport object
                transporter.sendMail(mailExposantOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);   
                
                    res.render('contact', {msg:'Email has been sent'});
                });
            }
            else { console.log('Error Update :' + JSON.stringify(err, undefined, 2)); }
        }); 
    };

    exports.refuserMeeting = (req, res) => {
        const meet = {etat: "refuser"};
        
        Meeting.findByIdAndUpdate(req.params.id, { $set: meet }, { new: true }, (err, meeting) => {
            if (!err) { 
                res.send(meeting);
                console.log('meeting',meeting); 
            
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.lifestyle.ma',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                        auth: {
                            user: 'contact@emails-checker.com', // generated ethereal user
                            pass: 'GOS2017gos'  // generated ethereal password
                        },
                        tls: {
                        ciphers : 'SSLv3',
                        },
                });

                let mailUserOptions = {
                    from: 'contact@emails-checker.com', // sender address
                    to: meeting.userEmail, // list of receivers
                    subject: 'request meeting', // Subject line
                    text: 'your meeting had refused', // plain text body

                };
            
                // send mail with defined transport object
                transporter.sendMail(mailUserOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);   
                
                    res.render('contact', {msg:'Email has been sent'});
                });

                let mailExposantOptions = {
                    from: 'contact@emails-checker.com', // sender address
                    to: meeting.exposantEmail, // list of receivers
                    subject: 'request meeting', // Subject line
                    text: 'your meeting had refused', // plain text body

                };
            
                // send mail with defined transport object
                transporter.sendMail(mailExposantOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message exposant sent: %s', info.messageId);   
                
                    res.render('contact', {msg:'Email has been sent'});
                });
            }
            else { console.log('Error Update :' + JSON.stringify(err, undefined, 2)); }
        }); 
    };


    exports.registerMeeting = (req, res) => {
        if (!req.body.day || !req.body.time || !req.body.user_id || !req.body.exposant_id ) {
            return res.status(400).json({ 'msg': 'error-test' });
        }
     
        var meet = new Meeting({
            day: req.body.day,
            time: req.body.time,
            user_id: req.body.user_id,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userCompany: req.body.userCompany,
            userFunction: req.body.userFunction,
            exposant_id: req.body.exposant_id,
            exposantName: req.body.exposantName,
            exposantEmail: req.body.exposantEmail,
            exposantCompany: req.body.exposantCompany,
            exposantSector: req.body.exposantSector,
            etat: "En cour de traitement",
        });

        meet.save((err, meeting) => {
            if (!err) { res.send(meeting); }
            else { return res.status(400).json({ 'msg': 'You need ' }); }
        });


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: 'smtp.lifestyle.ma',
        port: 465,
        secure: true, // true for 465, false for other ports
            auth: {
                user: 'mailing@moroccan-automotive.com', // generated ethereal user
                pass: 'Auto2023'  // generated ethereal password
            },
            tls: {
            ciphers : 'SSLv3',
            },
        });
    
        // setup email data with unicode symbols
        let mailExposantOptions = {
            from: 'mailing@moroccan-automotive.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Automotive Show', // Subject line
            text: 'Hello world?', // plain text body
            html: 
            '<html>'+
    
                '<div style="width:600px;margin:0 auto;border:1px solid orange;height:400px;border-bottom:4px solid black;">'+
                    '<img src="../../asset/auto1.jpg" alt="email" style="margin-bottom: 10px">'+
                    '<br>'+
                    '</br>'+

                    '<center style="font-weight: bolder;color:#1d70b6;"><h1>Meeting Request</h1></center>'+
                    
                    '<p style="padding:10px 50px 10px 50px;">'+
                    'Applicant:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.userName+'<br></span>'+
                    'Applicant Email:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.userEmail+'<br></span>'+
                    'Applicant Function:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.userFunction+'<br></span>'+
                    'Meeting Date:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.day+' at <u>'+req.body.time+'</u><br></span>'+
                    'Place:   <span style="font-weight: bolder;color:#3aa935;"> the Casablanca Exchange Office <br></span>'+
                    '</p>'+
                    '<br>'+
                    '<p style="padding:40px;color:gray;font-size:11px;">Thank you <br> Global fairs & events team</p>'+
                '</div>'+
    
            '</html>'
    
            // html body
        };
        let mailUserOptions = {
            from: 'mailing@moroccan-automotive.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Automotive Show', // Subject line
            text: 'Hello world?', // plain text body
            html: 
            '<html>'+
    
                '<div style="width:600px;margin:0 auto;border:1px solid orange;height:400px;border-bottom:4px solid black;">'+
                    '<img src="../../auto1.jpg" alt="email" style="margin-bottom: 10px">'+
                    '<br>'+
                    '</br>'+

                    '<center style="font-weight: bolder;color:#1d70b6;"><h1>Meeting Request</h1></center>'+

                    '<p style="padding:10px 50px 10px 50px;">'+
                    'Exhibitor:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.exposantName+'<br></span>'+
                    'Exhibitor Email:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.exposantEmail+'<br></span>'+
                    'Exhibitor Sector:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.exposantSector+'<br></span>'+
                    'Meeting Date:   <span style="font-weight: bolder;color:#3aa935;">'+req.body.day+' at <u>'+req.body.time+'</u><br></span>'+
                    'Place:   <span style="font-weight: bolder;color:#3aa935;"> the Casablanca Exchange Office <br></span>'+
                    '</p>'+

                    '<br>'+
                    '<p style="padding:40px;color:gray;font-size:11px;">Thank you <br> Global fairs & events team</p>'+
                '</div>'+
    
            '</html>'
    
            // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailExposantOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
        
            res.render('contact', {msg:'Email has been sent'});
        });

        transporter.sendMail(mailUserOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
        
            res.render('contact', {msg:'Email has been sent'});
        });

        
    };

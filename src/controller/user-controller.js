var User = require('../models/user');
const exposant = require("../models/exposant");
var jwt = require('jsonwebtoken');
var config = require('../config/config');

const bcrypt = require('bcrypt');



const nodemailer = require("nodemailer");


function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}


exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password  || !req.body.fullName || !req.body.phone || !req.body.country  || !req.body.company ) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            phone: req.body.phone,
            country: req.body.country,
            company: req.body.company,
            function: req.body.function,
            profil: "user",
        });

        //let users = newUser;

        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            //return res.status(201).json(user);
            return res.json({
                status: "SUCCESS",
                message: "Signup successful!",
                data: user,
            });
        });

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.moroccan-automotive.com',
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

                    '<center style="font-weight: bolder;color:#1d70b6;"><h1>New Registration</h1></center>'+

                    '<p style="padding:10px 50px 10px 50px;">'+
                    'Hi  <span style="font-weight: bolder;color:#3aa935;">'+req.body.fullName+',<br></span>'+
                    'Welcome to <span style="font-weight: bolder;color:#3aa935;"> Automotive Show </span> – We’re excited to have you on board and we’d love to say thank you on behalf of our whole company for signing up <br>'+
                    'Have any questions or need more information? Just shoot us an email! We’re always here to help.<br><br>'+
                    'We would like to see you visit our Exihibition" at '+
                    '<span style="font-weight: bolder;color:#3aa935;"> the Casablanca Exchange Office <br></span>'+
                    'Best regards,'+
                    '</p>'+

                    '<br>'+
                    '<p style="padding:40px;color:gray;font-size:11px;">Thank you <br> Global fairs & events team</p>'+
                '</div>'+
    
            '</html>'
    
            // html body
        };

        transporter.sendMail(mailUserOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
        
            res.render('contact', {msg:'Email has been sent'});
        });


    });
};


exports.loginUser = (req, res) => {
    let { email, password } = req.body; 
    email = email.trim();
    password = password.trim();
    
    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied!"
        });
    } else {
        //check if user exist
        //User.find({ email })
        Promise.all([exposant.findOne({ email }), User.findOne({ email }) ])
        .then(([exposantData, userData]) => {
            console.log('user', userData);
            console.log('expo', exposantData);

            if (exposantData) {
                //user exists

                console.log('pwd', password);
                console.log('passwd', exposantData.password);
                

                if (password == exposantData.password) {
                    //Password match
                    //console.log('valider');
                    res.json({
                        token: createToken(exposantData),
                        status: "SUCCESS",
                        message: "Signin successful",
                        data: exposantData,
                    });

                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid password entered!"
                    });

                }
            } else if (userData) {
                //user exists
                console.log(userData.password);
                const hashedPassword = userData.password;
                //console.log(hashedPassword);
                bcrypt.compare(password, hashedPassword).then(result => {
                    console.log(password);
                    console.log(hashedPassword);

                    if (result) {
                        //Password match
                        console.log('valider');
                        res.json({
                            token: createToken(userData),
                            status: "SUCCESS",
                            message: "Signin successful",
                            data: userData,
                        });

                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered!"
                        });

                    }
                })
                /*.catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing password!"
                    });
                })*/
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                });
            }

        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while while cheking for existing user!"
            });
        })
    }
}


exports.listUser = (req, res) => {
    User.find ((err,user)=> {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.send(user) ;
        }
    });
};

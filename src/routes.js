var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var exposantController  = require('./controller/exposant-controller');
var meetingController  = require('./controller/meeting-controller');
var salonController  = require('./controller/salon-controller');
var appController  = require('./controller/app-controller');
var passport	    = require('passport');


 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

 routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


/////////////////  Users ////////////////////////

routes.get('/users', userController.listUser); 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);



//////////////// Exposants ///////////////////////////

routes.get('/exposants', exposantController.listExposant);
routes.get('/exposants/:id', exposantController.getExposant);



//////////////// Meeting ///////////////////////////

routes.get('/meetings', meetingController.listMeeting);
routes.post('/registerMeeting', meetingController.registerMeeting);

routes.get('/meetings/user/:userEmail', meetingController.getMeetingUser);
routes.get('/meetings/user/valider/:userEmail', meetingController.getMeetingUserValider);
routes.get('/meetings/user/refuser/:userEmail', meetingController.getMeetingUserRefuser);

routes.get('/meetings/exposant/:exposantCompany', meetingController.getMeetingExposant);
routes.get('/meetings/exposant/valider/:exposantCompany', meetingController.getMeetingExposantValider);
routes.get('/meetings/exposant/refuser/:exposantCompany', meetingController.getMeetingExposantRefuser);

routes.put('/meetings/valider/:id', meetingController.validerMeeting);
routes.put('/meetings/refuser/:id', meetingController.refuserMeeting);



//////////////// Meeting ///////////////////////////

routes.get('/salons', salonController.listSalon);
routes.get('/salons/:fullName', salonController.getSalon);



//////////////// App ///////////////////////////

routes.get('/app', appController.listApp);



module.exports = routes;
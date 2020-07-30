const router = require('express').Router();
let User = require('../models/user.model');

router.route('/add').post( (req, res) =>{
    const ipInfo = req.ipInfo;

    const username = req.body.username;
    const userEmail = req.body.useremail;
    const userPassword = req.body.userpassword;
    const userIP = req.clientIp;
    const userLocation = ipInfo.city + ipInfo.country;
    const userisActive = false;

    const newUser = new User({username, userEmail, userPassword, userIP, userLocation, userisActive});
    //User Object name should be same as in UserModel
    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error '+ err));
});

module.exports = router;
const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs')

router.route('/add').post(async (req, res) =>{
    const ipInfo = req.ipInfo;

    const userFullName = req.body.userFullName;
    const username = req.body.username;
    const userEmail = req.body.userEmail;
    const userPass = req.body.userPassword;
    const userAge = req.body.userAge;
    const userIP = req.clientIp;
    const userLocation = ipInfo.city + ipInfo.country;
    const userisActive = false;

    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(req.body.userPassword, salt);

    const newUser = new User({userFullName, username, userEmail, userPassword, userAge, userIP, userLocation, userisActive});
    //User Object name should be same as in UserModel
    newUser.save()
        .then(() => res.send({isUserSignedUp: true}))
        .catch(err => res.status(400).json('Error '+ err));
});

router.route('/recoverpass').post(async (req,res) =>{
    const email = req.body.email
    const password = req.body.password

    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(password, salt);

    const query = {userEmail: email}
    User.findOneAndUpdate(query,{userPassword: userPassword},null,function(err,doc){
        if(err){
            console.log("(-)Error",err)
            res.send({
                "isComp":false
            })
        }else{
            console.log("Success in changing the password.")
            res.send({
                "isComp":true
            })
        }
    })
});



module.exports = router;
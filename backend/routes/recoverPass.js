const router = require('express').Router();
const nodemailer = require('nodemailer');
let user = require("../models/user.model");


require('dotenv').config();

router.route("/").post( (req,res) => {
    const email = req.body.email;

    //console.log(email)
    user.findOne({userEmail:email})
        .then( async (result) => {
            // check if the email is present in db
            //console.log(result)
            if(result === null){
                res.send({
                    "isUser":false
                })
            }else{
                res.send({
                    "isUser":true
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("error",err)
        });
})


router.route("/send/:email").get( (req,res) => {
    const email = req.params.email

    //create a transporter, which contains the user name and password.
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Recovery for this email',
        html: '<html><h3>Click the below link to change your password </h3><br/><a target="__blank" href="http://localhost:3000/recoverEmail">click here to change the password</a></html>'
      };
      
    transporter.sendMail(mailOptions, function(error,info){
        if(error) {
            console.log(error)
            res.send({
                "sent":false
            })
        }
        else{
            console.log('Email sent: ' + info.response);
            res.send({
                "sent":true
            })
        }
             
    })

})

module.exports = router
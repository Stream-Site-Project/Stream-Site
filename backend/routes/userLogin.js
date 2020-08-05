const router = require("express").Router();
let user = require("../models/user.model");

router.route("/").post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    /*
    isCC: is correct credintials
    isUSer: if the given user is already a user to the service
    in this code , we check for the username
    1.if not present, send the response as 
        isUser:False
        isCC:False
    2.if the user is present in the database and credintials are correct, send
        isUser:True
        isCC: True
        id: the object id of the user.
    3.if the user is present in the DB and credits are false then send
        isUSer:True
        isCC: false
    4.if there is error with the retrival, then
        log the error in the server
        and then the respose as 500
    */
    user.findOne({username:username})
        .then(result => {
            //console.log(result)
            
            if(result === null){ 
                // if there is no account for the given user account.
                res.send({
                    "isUser":false,
                    "isCC":false
                }) 
            }
            
            if (password === result.userPassword){
                //if the username and password matched
                res.send({
                    "isUser":true,
                    "isCC":true,
                    "user_id":result._id
                })
            }else{
                //in this case password dosent match to the given username
                res.send({
                    "isUser":true,
                    "isCC":false
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("error",err)
        });
});


module.exports = router;

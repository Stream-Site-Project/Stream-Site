const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    res.send('Invalid Search');
})

router.route('/').post((req, res)=>{
    res.send('Invalid Page');
})

router.route('/:val').get( (req, res) =>{
    if(req.params.val.includes('@')){
        User.findOne({userEmail: req.params.val})
        .then(result => result === null ? res.send({isEmailRegistered: false}) : res.send({isEmailRegistered: true}))
        .catch(err => res.status(404).json('Error: ' + err))
    }else{
        User.findOne({username: req.params.val})
        .then(result => result === null ? res.send({isUser: false}) : res.send({isUser: true}))
        .catch(err => res.status(404).json('Error: ' + err))
    }
});

module.exports = router;
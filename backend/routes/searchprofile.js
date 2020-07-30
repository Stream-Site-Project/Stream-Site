const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    res.send('Invalid Search');
})

router.route('/').post((req, res)=>{
    res.send('Invalid Page');
})

router.route('/:name').get( (req, res) =>{
    User.find({username: req.params.name})
        .then(users => res.json(users))
        .catch(err => res.status(404).json('Error: ' + err))
});

module.exports = router;
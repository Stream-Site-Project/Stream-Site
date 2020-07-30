const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
        User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/activate/:id').post((req, res) => {
    User.findByIdAndUpdate({
        _id: req.params.id,
    },{
        userisActive: true
    }).exec()
        .then(() => res.send('Account Activated'))
        .catch(err => res.status(400).send("Error Activating Account: "+err));
});

module.exports = router;
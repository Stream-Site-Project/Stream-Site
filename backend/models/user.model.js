const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    userEmail:{
        type: String,
        required: true,
        unique: true
    },
    userPassword:{
        type: String,
        required: true,
        minlength:8
    },
    userIP:{
        type: String,
    },
    userLocation:{
        type: String,
    },
    userisActive:{
        type: Boolean,
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
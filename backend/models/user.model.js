const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userFullName:{
        type: String,
        required: true,
    },
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
        minlength:10
    },
    userAge:{
        type: String,
        required: true
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
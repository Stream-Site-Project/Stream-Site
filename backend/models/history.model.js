const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userHistorySchema = new Schema({
    username:{
        type= String,
        required: true
    },
    userWatching:{
        type= String,
        required: true,
    },
    userIP:{
        type= String,
        required: true
    },
    userLocation:{
        type= String,
        required: true
    },
    userReviewRating:{
        type= Number,
        required: false
    },
    userReviewComments:{
        type= String,
        required: false
    }
},
{
    timestamps: true,
});

const userHistory = mongoose.model('userHistory', userHistorySchema);

module.exports = userHistory;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    movieshowName:{
        type: String,
        required: true
    },
    movieDescription:{
        type: String,
        required: true
    },
    movieCast:{
        type: Array,
        required: true
    },
    movieshowURL:{
        type: Array,
        required: true
    },
    moviePoster:{
        type:String,
        required:true
    },
    movieshowAddedby: {
        type: String,
        required: true
    },
    movieshowAddedIp: {
        type: String,
        required: true
    },
    movieshowAddedLocation: {
        type: String,
        required: true
    },
    movieshowTags:{
        type: Array,
        required: true
    },
    movieshowWatchedTimes:{
        type: Number
    },
    movieshowUserReviewCount:{
        type: Number
    },
    movieshowUserReviews:{
        type: Array,
    },
    movieshowUserAvgReview:{
        type: mongoose.Decimal128
    },
    movieshowIMDBReview:{
        type: mongoose.Decimal128
    },
    movieshowUpdatedby:{
        type:Array
    }
},{
    timestamps: true
});

const Movies = mongoose.model('Movies', moviesSchema);
module.exports = Movies;
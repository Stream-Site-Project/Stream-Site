const router = require('express').Router();
const Movies = require('../models/movieschema.model');

router.route('/findall').get( (req, res) => {
    //this API endpoint should not be used.
    Movies.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/find/id/:id').get( (req, res) =>{
    //this is to find the specific movie
    try{
        Movies.find({_id: req.params.id})
            .then(movies => res.json(movies))
            .catch(err => res.status(404).json('Error: ' + err))
    }catch(ex){
        console.ex("(-)No Param at the ID, check 11:movieList.js")
    }
});


router.route('/find/genre/:genre').get( (req,res) => {
    //it returns the movies based on their genre.
    const genre = req.params.genre;
    //console.log(genre)
    try{
        Movies.find({ movieshowTags: genre })
            .then(movies => res.json(movies))
            .catch(err => res.status(404).json('Error: ' + err))
    }catch(ex){
        console.log("(-)No genre at the ID, check 23:movieList.js")
    }
})



router.route('/upload').post( (req, res) =>{
    //this is for uploading, should not be used.
    const ipInfo = req.ipInfo;

    const movieshowName = req.body.movieshowName;
    const movieDescription = req.body.movieDescription;
    const movieCast = req.body.movieCast;
    const movieshowURL = req.body.movieshowURL;
    const movieshowAddedby = req.body.movieshowAddedby;

    const movieshowAddedIp = req.clientIp;
    const movieshowAddedLocation = ipInfo.city + "," + ipInfo.country;

    const moviePoster = req.body.moviePoster;
    const movieshowTags = req.body.movieshowTags;
    const movieshowIMDBReview = req.body.movieshowIMDBReview;

    const newUser = new Movies({movieshowName, movieDescription, movieCast, movieshowURL, movieshowAddedby, movieshowAddedIp, movieshowAddedLocation, moviePoster, movieshowTags, movieshowIMDBReview});
    newUser.save()
        .then( () => res.json('Movie Added'))
        .catch( err => res.status(400).json('Error '+ err));
});

router.route('/delete/:name/:id').delete((req, res)=>{
    Movies.findByIdAndDelete(req.params.id)
        .then( ()=> res.send('Movie/Show Deleted'))
        .catch(err => res.status(400).send('Error: '+ err));
});

router.route('/update/:name/:id').post((req, res)=>{
    const ipInfo = req.ipInfo;
    Movies.findByIdAndUpdate({
        _id: req.params.id,
    },
    {
        movieshowName : req.params.movieshowName,
        movieDescription : req.body.movieDescription,
        movieCast : req.body.movieCast,
        movieshowURL : req.body.movieshowURL,
        movieshowTags : req.body.movieshowTags,
        movieshowIMDBReview : req.body.movieshowIMDBReview,
        $push:{
           movieshowUpdatedby:{updatedDate: new Date(), updatedBy: req.body.username, updatedFromIP: req.clientIp, updatedFrom: ipInfo.city +","+ ipInfo.country}
        }
    }).exec()
    .then(() => res.send('Movie Updated'))
    .catch(err => res.status(400).send('Error: '+err));
});

router.route('/review/:name/:id').post( (req, res) => {
    const ipInfo = req.ipInfo;
    Movies.findByIdAndUpdate({
        _id: req.params.id,
    },{
        movieshowName: req.params.name,
        $push:{
            movieshowUserReviews: {user: req.body.username, rating: req.body.rating, review: req.body.review, dateReviewed: new Date(), reviewedFrom: req.clientIp, reviewedLocation: ipInfo.city+","+ipInfo.country }
        }
    }).exec()
    .then(() => res.send('Movie Review Posted'))
    .catch(err => res.status(400).send('Error: '+err));
});

module.exports = router;
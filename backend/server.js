const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressip = require('express-ip');
const requestIp = require('request-ip');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(requestIp.mw());
app.use(expressip().getIpInfoMiddleware);

const uri = process.env.ATLAS_URI_SERVER;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
});

const moviepage = require('./routes/movieslist');
const userSignUp = require('./routes/usersignup');
const userprofile = require('./routes/userprofile');
const searchprofile = require('./routes/searchprofile');
const videoquery = require('./routes/videoQuery');
const getPoster = require('./routes/getPoster');
const userLogin = require('./routes/userLogin');

app.use('/', moviepage);
app.use('/signup', userSignUp);
app.use('/myprofile', userprofile);
app.use('/search',searchprofile);
app.use('/movie', moviepage);
app.use('/video', videoquery);
app.use('/getPoster', getPoster);
app.use('/login',userLogin);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

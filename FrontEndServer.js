const express = require('express' ); // main Express Package
const fs = require('fs'); // File Stream Package
const path = require('path'); // PAth is used to find the main path of the app
const ejs = require("ejs");
const app = express(); // we initialize the project with Express Framework

const port = 3000


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.static('public'));
app.get('/', (req,res) => res.render('index',{name:"pavan"}));



// this is the main starting page to the user which displays all the movies required
app.get('/dashboard',function(req,res){
    const dirpath = path.join(__dirname,'assets');
    async function movie_list(){
        let movies = [];
        fs.readdir(dirpath, function (err, files) {
            if (err) {
                // handling the error
                return console.log("(-)Error" + err);
            }
            console.log("log first");
            files.forEach(function (file) {
                console.log("second");
                movies.push(file);
                console.log(file);
            });
        });

        console.log("third")
        console.log(JSON.stringify(movies));
        movies.forEach(function(m){
            console.log("sai:"+m)
        });
        console.log("fourth");
        return res.render('dashboard',{movieList:movies});
    }
    
    movie_list();
});


// this is the driver funciton which gives the required movie id to the video player.
// in turn the movie player playes the movie, still the error mechanism needs to be placed.
app.get('/getMovie',function(req,res){
    const movie_id =  req.query.movie
    console.log(movie_id)
    res.render('index', {
        movie:movie_id                  
    });
});


// this is to provide error mechanism , in developing state
app.get('/error',function(req,res){
    res.sendFile(path.join(__dirname+"/public/error.html"))
});


// this is, the main driver which provides the video , input:id, returns http status
// 206, which helps in loading the data when required using framework.
app.get('/video:id',function(req,res){
    const id = req.params.id
    console.log(id)
    const video_path = `assets/${id}.mp4`
    // This is the video path
    // fs is used to access the data , only that is required, and not entire file is read
    try{
        const stats = fs.statSync(video_path)   
        const fileSize = stats.size
        const range = req.headers.range
        if(range){
            const parts = range.replace(/bytes=/,"").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

            if(start >= fileSize) {
                res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
                return
            }

            const chunksize = (end-start)+1
            const file =fs.createReadStream(video_path, { start: start, end: end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        }else{
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(video_path).pipe(res)
        }
    }catch(Exception){
        if(Exception.code == 'ENOENT'){
            console.log("Error Page, No movie is found with that id");
            //return res.redirect('/error');
        }else{
            console.log("another Error", Exception.code)
        }
    }
    
});

app.listen(port, () => console.log(`Opened in port ${port}`))
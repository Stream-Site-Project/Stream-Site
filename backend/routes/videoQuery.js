const router = require("express").Router();
const fs = require('fs'); // File Stream Package
const path = require('path');// for traversing the file system


router.route("/").get((req,res) => {
    const moviepath = "assets/sample.mp4"

    try{
        const moviestats = fs.statSync(moviepath)
        const moviesize = moviestats.size
        const range = req.headers.range
        if(range){
            const parts = range.replace(/bytes=/,"").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : moviesize-1;

            if(start >= moviesize) {
                res.status(416).send('Requested range not satisfiable\n'+start+' >= '+moviesize);
                return
            }

            const chunksize = (end-start)+1
            const filestream = fs.createReadStream(moviepath,{start:start,end:end})
            const head = {
                'Content-Range': `bytes ${start}-${end}/${moviesize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            console.log("sending the file")
            res.writeHead(206, head);
            filestream.pipe(res);
        }else{
            const head = {
                'Content-Length': moviepath,
                'Content-Type': 'video/mp4',
            }
            console.log("sending the file starting")
            res.writeHead(200, head)
            fs.createReadStream(moviepath).pipe(res)
        }
    }catch(Exception){
        if(Exception.code == 'ENOENT'){
            console.log("Error Page, No movie is found with that id");
            res.writeHead(500,{'data':"error"})
        }else{
            console.log("another Error", Exception)
        }
    }
})




module.exports =  router;
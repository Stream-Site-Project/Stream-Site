const router = require('express').Router()
const fs = require('fs');

router.route("/:id").get((req,res) =>{
    const id = req.params.id
    console.log(id)
    const posterPath = `assets/posters/${id}.jpg`

    try{
        var fileStat = fs.statSync(posterPath)
        const head={
            'Content-Type': 'image/jpg',
            'Content-Length': fileStat.size
        }

        res.writeHead(200,head)
        var readStream = fs.createReadStream(posterPath)
        readStream.pipe(res)
        
    }catch(ex){
        res.status(400).json("Error no file specified")
    }
})


module.exports = router
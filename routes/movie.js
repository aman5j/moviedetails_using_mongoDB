var express = require('express');
var router = express.Router();
var upload = require('./multer');
var fs = require("fs");

var State = require('./model/statesModel');
var City = require('./model/citiesModel');
var Cinema = require('./model/cinemaModel');
var Screen = require('./model/screenModel');
var Movie = require('./model/moviesModel');
var {ObjectId} = require('mongodb')

/* GET home page */

router.get("/createschema", function(req,res){
    var S = new State()
    var C = new City()
    var CM = new Cinema()
    var SN = new Screen()
    var M = new Movie()

    res.send("Created")
})

router.get("/movie_interface", function(req,res){

    res.render("movieinterface", { message : ''})
})

router.get("/fetch_all_states", function(req,res,next){
    State.find({}).then((result)=>{
        res.json({result:result})
    }).catch((e)=>{
        res.json({result:e})
    })
});

router.get("/fetch_all_cities", function(req,res,next){
    City.find({"stateid._id":req.query.stateid}).then((result)=>{
        res.json({result:result})
    }).catch((e)=>{
        res.json({result:e})
    })
});

router.get("/fetch_all_cinemas", function(req,res,next){
    Cinema.find({}).then((result)=>{
        res.json({result:result})
    }).catch((e)=>{
        res.json({result:e})
    })
});

router.get("/fetch_all_screens", function(req,res,next){
    Screen.find({"cinemaid._id":req.query.cinemaid}).then((result)=>{
        res.json({result:result})
    }).catch((e)=>{
        res.json({result:e})
    })
})

router.post('/movie_submit',upload.single('poster'), function(req,res,next){
    try{
        console.log("DATA:",req.body);
        console.log("FILE:",req.file);
        var body={...req.body,poster:req.file.filename}
        var movie = new Movie(body)
        movie.save().then((saveData)=>{
            if(movie==saveData)
            {
                res.render("movieinterface", { message : "Submitted Successfully"})
            }
            else 
            {
                res.render("movieinterface", { message : "Database Error"})
            }
        })
    }
    catch(e)
    {
        console.log("Error:",e);
        res.render("movieinterface", { message : 'Server Error'});
    }
});

router.get("/fetch_all_movies", function(req,res,next){
    try{
        Movie.aggregate(
            [
                {
                    $lookup:{
                        from: "states",
                        localField: "stateid",
                        foreignField: "_id",
                        as: "stateData"
                    },
                },

                {
                    $lookup:{
                        from: "cities",
                        localField: "cityid",
                        foreignField: "_id",
                        as: "cityData"
                    },
                },

                {
                    $lookup:{
                        from: "cinemas",
                        localField: "cinemaid",
                        foreignField: "_id",
                        as: "cinemaData"
                    },
                },

                {
                    $lookup:{
                        from: "screens",
                        localField: "screenid",
                        foreignField: "_id",
                        as: "screenData"
                    },
                },
            ],
            {$unwind: "$stateData"},
            {$unwind: "$cityData"},
            {$unwind: "$cinemaData"},
            {$unwind: "$screenData"}
        ).then((result)=>{
            console.log("result:",result)
            res.render("displayallmovies", {data:result, message:'success'})
        })
    }
    catch(e)
    {
        console.log("Error",e)
        res.render("displayallmovies",{ message : 'Error'})
    }
})

router.get("/displayforedit", function(req,res,next){
    try{
        Movie.aggregate(
            [
                {
                    $lookup:{
                        from: "states",
                        localField: "stateid",
                        foreignField: "_id",
                        as: "stateData"
                    },
                },

                {
                    $lookup:{
                        from: "cities",
                        localField: "cityid",
                        foreignField: "_id",
                        as: "cityData"
                    },
                },

                {
                    $lookup:{
                        from: "cinemas",
                        localField: "cinemaid",
                        foreignField: "_id",
                        as: "cinemaData"
                    },
                },

                {
                    $lookup:{
                        from: "screens",
                        localField: "screenid",
                        foreignField: "_id",
                        as: "screenData"
                    },
                },

                { $match:{"_id": new ObjectId(req.query.movieid)},}
            ],
            {$unwind: "$stateData"},
            {$unwind: "$cityData"},
            {$unwind: "$cinemaData"},
            {$unwind: "$screenData"}
        ).then((result)=>{
            console.log("result:",result)
            res.render("displayforedit", {data:result[0], message:'success'})
        })

    }
    catch(e)
    {
        console.log("Error",e)
        res.render("displayforedit",{ message : 'Server Error', data:[]})
    }
})


router.post("/edit_movie", function(req, res){
    try{
        var body={movieid,btn,poster, ...data} = req.body
       if(btn=="Edit")
       {
        Movie.updateOne({"_id":movieid},data).then((result)=>{
            
            res.redirect("/movie/fetch_all_movies")
        })
    }
    else 
    {
        Movie.deleteOne({"_id":movieid}).then((result)=>{

            res.redirect("/movie/fetch_all_movies")
        })
     }
    }
    catch(e)
    {
        console.log("Error:",e)
        res.redirect("/movie/fetch_all_movies")
    }
});


/*


router.get("/displayposterforedit", function(req,res){
    res.render("displayposterforedit",{data:req.query})
})

router.post("/edit_poster",upload.single('poster'),function(req,res){
    try{
        pool.query("update movies set poster=? where movieid=?",[req.file.filename, req.body.movieid],function(error,result){
            if(error)
            {
                console.log("D Error:",error)
                res.redirect("/movie/fetch_all_movies")
            }
            else 
            {
                fs.unlinkSync(`D:/Mern/moviedetails/public/images/${req.body.oldfilename}`)
                res.redirect("/movie/fetch_all_movies")
            }
        })
    }
    catch(e)
    {
        console.log("Error:",e)
        res.redirect("/movie/fetch_all_movies")
    }
})

*/

module.exports = router;


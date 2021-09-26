const express = require('express');
const router = express.Router();
const { Movie } = require('./../model/movie');

// movies list
router.get('/',async (req, res, next)=>{
  try{
    const movies = await Movie.find();
    res.status(200).json(movies);
  }catch(err){
    const error ={
        msg: "There is server side error",
        code: 500
    }
    res.json(error);
  }
});

// show my movie by id
router.get('/:id',async (req, res, next)=>{
  try{
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  }catch(err){
    const error ={
        msg: "There is server side error",
        code: 500
    }
    res.json(error);
  }
});

// create movie
router.post('/', async (req, res, next)=>{
  const movie = new Movie({
    name: req.body.name, 
    description: req.body.description, 
    releaseDate: req.body.releaseDate, 
    genre:req.body.genre, 
    duration: req.body.duration, 
    rating: req.body.rating
  });
  try{

    const reqInfo =await movie.save();
    res.status(201).json(reqInfo);

  }catch(err){
    const error ={
        msg: "There is server side error",
        code: 500
    }
    res.json(error);
  }
});

// update movie
router.patch('/:id', async (req, res, next)=>{
  
  try{
    const movie = await Movie.findById(req.params.id);
    movie.name = req.body.name;
    movie.description = req.body.description;
    movie.releaseDate = req.body.releaseDate;
    movie.genre = req.body.genre;
    movie.duration = req.body.duration;
    movie.rating = req.body.rating;
    const updatedRecord = await movie.save();

    res.status(200).json(updatedRecord);

  }catch(err){
    const error ={
        msg: "There is server side error",
        code: 500
    }
    res.json(error);
  }
});

// delete movie
router.delete('/:id', async (req, res, next)=>{
   try{
     const movie = await Movie.findOneAndDelete({
      _id: req.params.id
     });
     const removedRecordInfo = {
      msg: "Record has been successfully deleted!",
      code: 200
    };
     res.json(removedRecordInfo);

   }catch(err){
    const error ={
        msg: "There is server side error",
        code: 500
    }
    res.json(error);
   }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { Genre } = require('./../model/genre');

// list genres
router.get('/', async (req, res, next)=>{
    try{
        const genres = await Genre.find();
        res.status(200).json(genres);
    }catch(err){
        const error ={
            msg: "There is server side error",
            code: 500
        }
        res.json(error);
    }
});

// show genre by id
router.get('/:id',async (req, res, next)=>{
    try{
      const genre = await Genre.findById(req.params.id);
      res.status(200).json(genre);
    }catch(err){
      const error ={
          msg: "There is server side error",
          code: 500
      }
      res.json(error);
    }
  });
  
// create genre
router.post('/', async (req, res, next)=>{
    const genre = new Genre({
        name: req.body.name, 
        description: req.body.description
    });
    try{

        const reqInfo =await genre.save();
        res.status(201).json(reqInfo);

    }catch(err){
        const error ={
            msg: "There is server side error",
            code: 500
        }
        res.json(error);
    }
});

// update genre
router.patch('/:id', async (req, res, next)=>{

try{
    const genre = await Genre.findById(req.params.id);
    genre.name = req.body.name;
    genre.description = req.body.description;
    const updatedRecord = await genre.save();

    res.status(200).json(updatedRecord);

}catch(err){
    const error ={
        msg: "There is server side error",
        code: 500
    }
    res.json(error);
}
});

// delete genre
router.delete('/:id', async (req, res, next)=>{
    try{
    const genre = await Genre.findOneAndDelete({
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
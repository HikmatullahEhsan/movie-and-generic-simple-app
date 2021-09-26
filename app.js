'use strict'
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const request = require('request');
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const movies = require('./routes/movies');
const genres = require('./routes/genres');


const app = express();

app.use(express.json({ limit: "50mb" }));

app.get('/',(req, res, next)=>{
  const information = [
    {
      "name": "MOVIES", 
      "endpoints": `https://simple-genre-movie-webservice.herokuapp.com/movies`
    },
    {
      "name": "GENRES", 
      "endpoints": `https://simple-genre-movie-webservice.herokuapp.com/genres`
    }
  ]
  res.status(200).json(information);
});
app.use('/genres',genres);
app.use('/movies',movies);

// 404 page
app.use("*", (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});


module.exports = app;

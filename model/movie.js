const mongoose = require("mongoose");

// Creating movie schema
const movieSchema = new mongoose.Schema({
  name: { 
      type: String, 
      require: true
    },
  description: { 
      type: String, 
      default: null 
    },
  releaseDate: { 
      type: String, 
      required: true
    },
  genre: { 
      type: String, 
      required: true
    },
  duration: { 
      type: String,
      required: true
    },
  rating: { 
      type: String,
      required: true
    }
});

// Assigning movie as a Model
const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie; 


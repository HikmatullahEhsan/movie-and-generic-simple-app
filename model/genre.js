const mongoose = require("mongoose");

// Creating genre schema
const genreSchema = new mongoose.Schema({
  name: {
      type: String, 
      required: true
    },
  description: { 
      type: String, 
      default: null 
    }
});

// Assigning genre as a Model
const Genre = mongoose.model('Genre', genreSchema);

exports.Genre = Genre; 


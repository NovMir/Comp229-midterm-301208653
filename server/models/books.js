let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Author: String,
    Price: Number,
    Genre: String,
    Type: String,
    
  },
{
  collection: "fave_books"
});

module.exports = mongoose.model('Book', Book);

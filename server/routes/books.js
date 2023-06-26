// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', async (req, res, next) => {
  try {
    // find all books in the books collection
    const books = await book.find();
    res.render('books/index', {
      title: 'Books',
      books: books
    });
  } catch(err) {
    console.error(err);
  }
});



//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
res.render('books/details',{title:'Add Book', books:''})
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async (req, res, next) => {
  // create a new book object
  let newBook = new book({
    "Title": req.body.Title,
    "Author": req.body.Author,
    "Price": req.body.Price,
    "Genre": req.body.Genre,
    "Type": req.body.Type,
  });

  try {
    // try to create a new book
    await book.create(newBook);
    // if successful, redirect to the books page
    res.redirect('/books');
  } catch (err) {
    // if there was an error, log it and end the response
    console.log(err);
    res.end(err);
  }
});


// GET the Book Details page in order to edit an existing Book
router.get('/:id', async (req, res, next) => {

  let id = req.params.id;

  try {
    let bookToEdit = await book.findById(id);

    //show edit page
    res.render('books/details',{title: 'Edit Book', books: bookToEdit});
    
  } catch (err) {
    console.log(err);
    res.end(err);
  }
});


// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
let id = req.params.id
let updatedBook = book({
"_id" : id,
"Title": req.body.Title,
  "Author":req.body.Author,
  "Price": req.body.Price,
  "Genre":req.body.Genre,
  "Type":req.body.Type,

})
book.updateOne({_id: id},updatedBook,(err) =>{
  if(err)
  {
    console.log(err);
    res.end(err);
  }else{
    res.redirect('/books');
  }
})
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.remove({_id:id}, (err) => {
      if(err){
        console.log(err);
        res.end(err);
      } else{
        res.redirect('/books');
      }
    })
});


module.exports = router;

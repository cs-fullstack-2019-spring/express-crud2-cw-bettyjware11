var express = require('express');
var router = express.Router();
var PostCollection = require('../models/PostSchema');

/* GET home page. */
router.get('/', function(req, res, next) {

  PostCollection.find({}, (errors, results)=>
  {
    if (errors) res.send(errors);
    else {
      context = {
        title: "Betty's Posts",
        allposts: results,
      };
      res.render('index', context);
    }
  });
});

//create a new post
router.get('/create', (req, res) => res.render('createPost'));
//save post info to index afterwards
router.get('/savePost', (req, res)=>{
  PostCollection.create(
      {userId: req.query.userId,
        id: req.query.id,
        title: req.query.title,
        body: req.query.body}, (errors)=>{
        if (errors) res.send(errors);
        else res.redirect("/");
      })
});

//Update an existing album.
router.get("/update/:userId/:id/:title/:body", (req, res)=>{
  PostCollection.updateOne(
      {"userId":req.params.userId,
      "id":req.params.id,
      "title":req.params.title,
      "body":req.params.body,},
      // If there’s an error, send them to a page with the error
       (errors)=>{
        if (res.render("error"));
        // If successful send them to the index.
        else res.render("index")
      });
});

//delete a post
router.get('/delete', (req,res)=>res.render('delete'));

router.get('/deleteSave', (req,res)=>{
  PostCollection.deleteOne({id:req.query.id},
      (error)=>{
        if(error) res.send(error);
        else res.redirect("/");
      })
});



module.exports = router;

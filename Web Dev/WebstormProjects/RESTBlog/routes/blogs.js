var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/rest_blog_app");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created:
            {   type: Date,
                default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


router.get('/', (req, res) => {
    Blog.find({}, (err, blogs) => {
       if (err) {
           console.log(err);
       }
       else {
           res.render('blogs', {data: blogs});
       }
    });
});


router.post('/', (req, res) => {
    console.log(req.body.blog);
    let newBlog = {
        title: req.body.title,
        image: req.body.image,
        body: req.sanitize(req.body.body)
    };

    Blog.create(newBlog, (err, newBlog) => {
        if (err) {
            res.render('newBlog');
        }
        else {
            res.redirect('/blogs');
        }
    });
});


router.get('/new', (req, res) => {
    res.render('newBlog');
});


router.get('/:id', (req, res) => {
   Blog.findById(req.params.id, (err, foundBlog) => {
      if (err) {
          res.redirect('/blogs');
      }
      else {
          res.render('showBlog', {blog: foundBlog});
      }
   });
});


router.put('/:id', (req, res) => {
    let updateBlog = {
        title: req.body.title,
        image: req.body.image,
        body: req.sanitize(req.body.body)
    };

    Blog.findByIdAndUpdate(req.params.id, updateBlog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});


router.get('/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.render('editBlog', {blog: foundBlog});
        }
    });
});

router.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
       if (err) {
           res.redirect('/blogs');
       }
       else {
           res.redirect('/blogs');
       }
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Campground = require("../models/campground");
var Comment = require('../models/comment');
let middleware = require("../middleware");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);




// Campgrounds


/* GET campgrounds page. */
router.get('/', function(req, res, next) {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            req.flash("error", "Campground does not exist");
            res.redirect('back');
        }
        else {
            res.render('campgrounds/campgrounds', {data: allCampgrounds, currentUser: req.user});
        }
    });
});


// Create campground
router.post('/', middleware.isLoggedIn, (req, res) => {
    let author = {
        id: req.user._id,
        username: req.user.username
    };

    let newCampground = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        author: author,
        description: req.body.description
    };

    Campground.create(newCampground, (err, newlyCreate) => {
        if (err) {
            req.flash("error", "Campground could not be created");
            res.redirect("back");
        }
        else {
            req.flash("success", "Campground was successfully created");
            res.redirect('/campgrounds');
        }
    });
});


//SHOW route - more info about a single campground
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            req.flash("error", "Campground does not exist");
            res.redirect('back');
        }
        else {
            res.render('campgrounds/showCampground', {campground: foundCampground});
        }
    });
});


// Edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            req.flash("error", "Campground does not exist");
            res.redirect('back');
        }
        else {
            res.render("campgrounds/editCampground", {campground: foundCampground});
        }
    });
});


// Update campground
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // find and update campground
    let data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    };

    Campground.findByIdAndUpdate(req.params.id, data, (err, updatedCampground) => {
        if (err) {
            req.flash("error", "Campground could not be updated");
            res.redirect('back');
        }
        else {
            req.flash("success", "Campground was successfully updated");
            res.redirect(`/campgrounds/${updatedCampground._id}`);
        }
    });
});


// delete campground
router.delete('/:id', middleware.checkCampgroundOwnership, async(req, res) => {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground does not exist");
            res.redirect('back');
        }
        else {
            foundCampground.remove(function(err) {
                if (err) {
                    req.flash("error", "Campground could not be removed");
                    res.redirect('/campgrounds');
                }
                else {
                    req.flash("success", "Campground was successfully removed");
                    res.redirect('/campgrounds');
                }
            });
        }
    });
});


// Comments


// new comment form
router.get('/:id/comments/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            req.flash("error", "Campground does not exist");
            res.redirect("back");
        }
        res.render("comments/newComment", {campground: campground});
    });
});


// Create new comment
router.post('/:id/comments', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
       if (err) {
           req.flash("error", "Campground does not exist");
           res.redirect('back');
       }
       else {

           let newCom = {
               text: req.body.text,
               author: req.body.author
           };

           Comment.create(newCom, (err, comment) => {
               if (err) {
                   req.flash('error', "Comment could not be created");
                   res.redirect("back");
               }
               else {
                   // add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // save comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Comment was successfully created");
                   res.redirect(`/campgrounds/${campground._id}`);
               }
           });
       }
    });
});


// edit comment form
router.get('/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            req.flash("error", "Comment does not exist");
            res.redirect('back');
        }
        else {
            res.render('comments/editComment', {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});


// edit comment update
router.put('/:id/comments/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    let newComment = {
        text: req.body.text
    };

   Comment.findByIdAndUpdate(req.params.comment_id, newComment, (err, updatedComment) => {
       if (err) {
           req.flash("error", "Comment does not exist");
           res.redirect('back');
       }
       else {
           req.flash("success", "Comment was successfully updated");
           res.redirect(`/campgrounds/${req.params.id}`);
       }
    });
});


// delete comment
router.delete('/:id/comments/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            req.flash("error", "Comment does not exist");
            res.redirect('back');
        }
        else {
            req.flash("success", "Comment was successfully deleted");
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});


module.exports = router;

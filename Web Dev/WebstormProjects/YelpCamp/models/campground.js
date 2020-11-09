var mongoose = require('mongoose');
const Comment = require('./comment');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Comment"
        }
    ]
});


// pre hook for removing comments on post delete
campgroundSchema.pre('remove', async function(next) {
    try {
        await Comment.deleteMany({
            _id: {
                $in: this.comments
            }
        });
        return next();
    } catch (error) {
        return(next(error));
    }
});


module.exports = mongoose.model("Campground", campgroundSchema);

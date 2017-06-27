var mongoose = require("mongoose");
//Post Schema for mongodb <- Need to get variables for the idk what to say but the route thing data
var postSchema = new mongoose.Schema({
    text: String,
    parentid: String,
    choiceP: String,
    title: String,
    author: String,
    summary: String,
    written: Boolean,
    popularity: {type:Number, default: 0},
    choiceA: String,
    choiceB: String,
    choiceC: String,
    choiceD: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
//    liked: [
//        {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: "User"
//        }
//    ]    
});

//Model the post db
module.exports = mongoose.model("Post", postSchema);
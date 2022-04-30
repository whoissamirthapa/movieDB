const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userName: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
    
}, 
{ 
    timestamps: true 
})

module.exports = mongoose.model("Comment", commentSchema);
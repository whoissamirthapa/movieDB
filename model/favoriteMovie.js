const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    movieId: {
        type: String,
        required: true,
    },
    movieTitle: {
        type: String,
        required: true
    }, 
    releasedYear: {
        type: String,
        required: true,
    },
    duration: {
        type: "Number",
        required: true,
    },
    url: {
        type: String,
    }
}, 
{ 
    timestamps: true 
})

module.exports = mongoose.model("Favorite", favoriteSchema);
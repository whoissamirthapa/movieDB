const Comment = require("../model/comment");
const User = require("../model/userModel");

const addComment = async(req, res)=>{
    
    const { movieId, content } = req.body;
    const userId = userToken.userId;

    const user = await User.findOne({ _id: userId});
    
    if(!userId){
        return res.status(400).json({ error: "User should be logged in"});
    }
    
    try{
        const comment = await new Comment({
            userId,
            userName: user.name,
            movieId,
            content
        }).save();

        console.log(comment);
        if(comment){
            return res.status(200).json({ message: "Successfully added comment", comment});
        }
        res.status(400).json({ error: "Comment can not be added"});
    }catch(error){
        console.log(error);
        res.status(421).json({ error: error})
    }
}

const getComment = async(req, res)=>{
    
    const userId = userToken.userId;
    const movieId = req.params.movieId;
    if(!userId){
        return res.status(402).json({ error: "User must be logged in"});
    }
    
    if(movieId){
        const data = await Comment.find({ movieId: movieId});
        return res.status(200).json({ message: "Comment sucess", data });
    }
    res.status(400).json({ error: "Movie not found"});
}

const deleteComment = async (req, res)=>{
    
    const userId = userToken.userId;
    const movieId = req.params.movieId;
    const commentId = req.params.commentId;
    
    if(!userId){
        return res.status(401).json({ error: "User must logged in"});
    }

    const data = await Comment.findOneAndRemove(
        { $and: [
            { 
                _id: commentId
            }, 
            {
                movieId: movieId
            },
            {
                userId: userId 
            }
        ]}
    );

    if(data){
        return res.status(200).json({ message: "Successfully deleted", data});
    }
    res.status(401).json({error: "Can not deleted"})
}

module.exports = { addComment, getComment, deleteComment };
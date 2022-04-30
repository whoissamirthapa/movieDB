const Favorite = require("../model/favoriteMovie");

const addFavorite = async(req, res)=>{
    const { movieId, movieTitle, releasedYear, duration, url } = req.body;
    try {
        
        if(!movieId || !movieTitle || !duration || !releasedYear || !url){
            return res.status(421).json({ error: "must be provided all things"});
        }

        const existMovie = await Favorite.findOne({ movieId });
        if(existMovie){
            return res.status(401).json({ error: "Movie already exist in favorite"});
        }

        const data = await new Favorite({
            userId: userToken.userId,
            movieId,
            movieTitle,
            releasedYear,
            duration,
            url
        }).save()

        if(data){
            return res.status(200).json({ message: "Added successfully"})
        }
        res.status(401).json({ error: "not added"})
        
    } catch (error) {
        console.log(error);
    }
}


const getAllFavorite = async(req, res)=>{
    
    if(!userToken.userId){
        res.status(421).json({error: "User should be logged in"});
        return;
    }

    try {
        const userId = userToken.userId;
        const data = await Favorite.find({ userId });
        return res.status(200).json({ message: "Successfully find ", data});
    } catch (error) {
        console.log(error);
    }
}

const deleteFavoriteMovie = async(req, res)=>{

    const movieId = req.params.movieId;
    
    const userId = userToken.userId;
    if(!userId){
        return res.status(421).json({ error: "User must be logged in"});
    }

    try {
        const deleteMovie = await Favorite.findOneAndRemove({ userId: userId, movieId: movieId });

        if(deleteMovie){
            return res.status(200).json({ message: "Sucessfully deleted", data: deleteMovie});
        }
        res.status(421).json({ error: "Can not delete"});

    } catch (error) {
        console.log(error);
    }
}


module.exports = { addFavorite, getAllFavorite, deleteFavoriteMovie };
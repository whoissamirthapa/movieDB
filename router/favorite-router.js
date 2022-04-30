const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const { addFavorite, getAllFavorite, deleteFavoriteMovie } = require("../controllers/favoriteController");


router.post("/add", isAuth, addFavorite);
router.get("/all-favorite", isAuth, getAllFavorite);
router.delete("/delete/:movieId", isAuth, deleteFavoriteMovie);


module.exports = router;


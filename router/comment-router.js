const express = require("express");
const { addComment, getComment, deleteComment } = require("../controllers/commentController");
const router = express.Router();
const { isAuth } = require("../middleware/auth");


router.post("/add", isAuth, addComment);
router.get("/:movieId/all-comments", isAuth, getComment);
router.delete("/:movieId/delete/:commentId", isAuth, deleteComment);


module.exports = router;


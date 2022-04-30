const express = require("express");
const router = express.Router();

const { registerController, loginController } = require('../controllers/userController');
const { getAllUserController } = require("../controllers/adminController");

const { isAdmin } = require("../middleware/admin");
const { isAuth } = require("../middleware/auth");



router.get('/', (req, res)=>{
    res.send("hello from user router")
})

// api/users/register
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/all-users', isAuth, isAdmin, getAllUserController);
// router.get('/all-users', isAuth, (req, res)=>{
//     //res.send({ userToken });
// })

module.exports = router;
const User  = require('../model/userModel');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerController = async (req,res)=>{
    const { name, email, password, cpassword } = req.body;
    try {
        
        if( !name || !email || !password || !cpassword ){
            res.status(400).json({ error: "Value must be valid"});
            return;
        }

        if(password !== cpassword){
            res.status(421).json({ error: "Invalid Credential"});
            return;
        }

        const existUser = await User.findOne({ email: email});
        if(existUser){
            res.status(421).json({ error: "User Already exist"});
            return;
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const hashedCpw = await bcrypt.hash(password, 12);

        const user = await new User({
            name,
            email,
            password: hashedPw,
            cpassword: hashedCpw
        }).save();

        if(user){
            res.status(200).json({ message: "User registered successfully! ", user});
            return;
        }
        res.status(421).json({ error: "user can not registered"})

    } catch (error) {
        console.log(error);
    }
}


const loginController = async(req, res)=>{
    const { email, password } = req.body;

    try {
        if(!email || !password){
            res.status(421).json({ error: "Input field must be valid"});
            return;
        }
        
        const user = await User.findOne({ email });

        if(!user){ 
            res.status(400).json({ error: "user not found"});
            return;
        }

        const matching = await bcrypt.compare(password, user.password);
        if(matching){
            const token = jwt.sign(
                { userId: user._id}, 
                process.env.JWT_SCRET || "falshfoawifhoaisdhfaoief",
                {
                    expiresIn: "30d",
                }
            );
            res.status(200).json({ message: "User logged in successfully!", token: token, data: user});
            return;
        }

        res.status(421).json({ error: "Invalid Credential"});

    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerController, loginController }
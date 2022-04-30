
const User = require("../model/userModel");

const getAllUserController = async(req,res)=>{

    try {

        const data = await User.find();
        if(data){
            return res.status(200).json({ message: "Users found", data});
        }
        res.status(401).json({error: "Users not found"});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllUserController }
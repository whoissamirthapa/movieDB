
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAdmin = (req, res, next)=>{

    const { authorization } = req.headers;
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        if(token){
            jwt.verify(
                token,
                process.env.JWT_SCRET || "falshfoawifhoaisdhfaoief",
                async (err, decode)=>{
                    if(err){
                        res.send({ err });
                    }
                    if(decode){
                        const userData = await User.findOne({ _id: decode.userId});
                        if(userData.role === "admin"){
                            next();
                        }else{
                            res.status(403).json({ error: "Forbidden"})
                        }
                    }
                }
            )
        }
    }
}

module.exports = { isAdmin };
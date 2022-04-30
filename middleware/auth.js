
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next)=>{
    const { authorization } = req.headers;
    
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(
            token,
            process.env.JWT_SCRET || "falshfoawifhoaisdhfaoief",
            (err, decode)=>{
                if(err){
                    res.send({ err })
                    return;
                }
                if(decode){
                    userToken = decode
                    next();
                }
            }
        )
    }
}

module.exports = { isAuth };
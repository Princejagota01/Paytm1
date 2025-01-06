const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../routes/config");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg: "nothing on"})
    }

    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,JWT_SECRET);
        if(decode){
            req.userId=decode.userId;
            next();
        }
        else{
            res.status(403).json({
                msg: "Not authenicated in authMiddleware!"
            });
        }
    }
    catch(err){
        res.status(403).json({
            msg: "err: Not authenicated in authMiddleware!"
        });
    }
}


module.exports = {
    authMiddleware
}
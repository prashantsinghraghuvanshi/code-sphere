const jwt=require('jsonwebtoken');

const generateTokenAndSetCookie=(user_id, res)=>{
    const token=jwt.sign({user_id}, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });

    res.cookie('jwt', token, {
        maxAge: 5*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.Node_ENV!=="development"
    });
};

module.exports={
    generateTokenAndSetCookie
}
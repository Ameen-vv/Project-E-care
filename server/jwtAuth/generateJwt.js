import  jwt  from "jsonwebtoken"

export const generateToken = (details)=>{
        return jwt.sign(details, process.env.TOKEN_SECRET, { expiresIn: '60d' }); 
}
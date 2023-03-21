import doctorModel from "../model/doctorSchema.js"
import  jwt  from "jsonwebtoken"
import userModel from "../model/userSchema.js"
import adminModel from "../model/adminSchema.js"

export const doctorAuthentication = (req,res,next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.status(401).json({authorization:false})
            }else{
                doctorModel.findOne({_id:result.doctorId}).then((doctor)=>{
                    if(doctor){
                        if(doctor.block){
                            res.status(401).json({authorization:false})
                        }else{
                            req.doctorLogged = result.doctorId
                            next()
                        }
                    }else{
                        res.status(401).json({authorization:false})
                    }

                }).catch((err)=>res.status(401).json({authorization:false}))
            }  
        })
    }
    else{
        res.status(401).json({authorization:false})
    }
}

export const userAuthentication = (req,res,next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.status(401).json({authorization:false})
            }else{
                userModel.findOne({_id:result.userId}).then((user)=>{
                    if(user){
                        if(user.block){
                            res.status(401).json({authorization:false})
                        }else{
                            req.userLogged = result.userId
                            next()
                        }
                    }else{
                        res.status(401).json({authorization:false})
                    }

                }).catch((err)=>res.status(401).json({authorization:false}))
            }  
        })
    }else{
        res.status(401).json({authorization:false})
    }
}

export const adminAuthentication = (req,res,next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization
        jwt.verify(token, process.env.TOKEN_SECRET,(err,result)=>{
            if(err){
                res.status(401).json({authorization:false})
            }else{
                adminModel.findOne({_id:result.adminId}).then((admin)=>{
                    if(admin){
                        next()
                    }else{
                        res.status(401).json({authorization:false})
                    }

                }).catch((err)=>res.status(401).json({authorization:false}))
            }  
        })
    }else{
        res.status(401).json({authorization:false})
    }
}
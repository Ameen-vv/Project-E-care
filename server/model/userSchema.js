import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const userSchema = new Schema({
    fullName:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    dateOfBirth:{
        type:Date
    },
    password:{
        type:String
    },
    block:{
        type:Boolean,
        default:false
    },
    profilePic:{
        type:String,
    },
    address:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
const userModel = mongoose.model('User',userSchema)
export default userModel
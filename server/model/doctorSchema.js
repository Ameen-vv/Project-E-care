import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const doctorSchema = new Schema({
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
    qualification:{
        type:String
    },
    address:{
        type:String
    },
    hospital:{
        type:String
    },
    password:{
        type:String
    },
    timings:{
        type:[Object]
    },
    verification:{
        type:String,
        default:'pending'
    },
    department:{
        type:ObjectId,
        ref:'Department'
    },
    block:{
        type:Boolean,
        default:false
    },
    licenseUrl:{
        type:String
    },
    rejectReason:{
        type:String
    },
    bio:{
        type:String,
        default:''
    },
    experience:{
        type:Number,
        default:1
    },
    priceOnline:{
        type:Number,
        default:200
    },
    priceOffline:{
        type:Number,
        default:400
    },
    profilePic:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const doctorModel = mongoose.model('Doctor',doctorSchema)
export default doctorModel
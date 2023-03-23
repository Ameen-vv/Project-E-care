import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const appointmentSchema = new Schema({
    doctorId:{
        type:ObjectId,
        ref:'Doctor'
    },
    patientId:{
        type:ObjectId,
        ref:'User'
    },
    slot:{
        type:String
    },
    paymentStatus:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date
    },
    status:{
        type:String,
        default:'booked'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    price:{
        type:Number
    },
    paymentId:{
        type:String
    },
    paymentMode:{
        type:String
    }
   
})

const appointmentModel = mongoose.model('appointment',appointmentSchema)
export default appointmentModel
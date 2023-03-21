import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const orderSchema = new Schema({
    userId:{
        type:ObjectId,
        ref:'User'
    },
    doctorId:{
        type:ObjectId,
        ref:'Doctos'
    },
    appointmentId:{
        type:ObjectId,
        ref:'appointment'
    },
    amount:{
        type:Number
    },
    status:{
        type:String,
        default:'pending'
    },
    date:{
        type:Date,
        def:Date.now()
    },
    paymentId:{
        type:String
    }
})

const orderModel = mongoose.model('order',orderSchema)
export default orderModel
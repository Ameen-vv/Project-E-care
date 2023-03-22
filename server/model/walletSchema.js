import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const walletSchema = new Schema({
    userId:{
        type:ObjectId,
        ref:'User'
    },
    balance:{
        type:Number,
        default:0
    },
    transactions:{
        type:[ObjectId],
        ref:'walletTransaction',
        default:[]
    }
})

const walletModel = mongoose.model('wallet',walletSchema)
export default walletModel
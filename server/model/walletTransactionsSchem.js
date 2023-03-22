import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const transactionsSchema = new Schema({
    amount:{
        type:Number
    },
    transactionType:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const walletTransactionModel = mongoose.model('walletTransaction',transactionsSchema)
export default walletTransactionModel
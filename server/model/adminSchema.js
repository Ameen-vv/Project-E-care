import mongoose from "mongoose";
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const adminModel = mongoose.model('admin',adminSchema)
export default adminModel    
import mongoose from "mongoose";

const connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/Ecare',()=>console.log('db connected'))
}

export default connection
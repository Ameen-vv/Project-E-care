import mongoose from "mongoose";

const connection = ()=>{
    mongoose.connect(process.env.DB_URL,()=>console.log('db connected'))
}
 
export default connection 

import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const departmentSchema = new Schema({
    name:{
        type:String
    },
    commonDiseases:{
        type:[String],
        default:[]
    },
    imageUrl:{
        type:String
    },
    doctors:{
        type:[ObjectId],
        ref:'Doctor',
        default:[]
    },
    list:{
        type:Boolean,
        default:true
    },
    description:{
        type:String
    }

})

const departmentModel = mongoose.model('Department',departmentSchema)
export default departmentModel
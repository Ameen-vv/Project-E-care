import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "../Slices/departmetnSlice";
import doctorReducer from "../Slices/doctorSlice";


const store = configureStore({
    reducer:{
        department:departmentReducer,
        doctor:doctorReducer
    }
})

export default store
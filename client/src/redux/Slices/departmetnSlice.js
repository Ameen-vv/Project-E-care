import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../../apiLinks/apiLinks";

export const fetchDepartments = createAsyncThunk('department/fetchDepartments',({search})=>{
    return (
        axios.get(`${userUrl}getDepartments?search=${search}`).then((response)=>{
            let result={
                data:response.data,
                status:response.status
            }
            return result
        }).catch((err)=>{
            let error = {
                status : err?.response?.status,
                message: err?.message
            }
            return error
        })
    )
})



const departmentSlice = createSlice({
    name:'department',
    initialState:{
        loading:false,
        departments:[],
        error:null,
        status:200
    },
    extraReducers:builder =>{
        builder.addCase(fetchDepartments.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchDepartments.fulfilled,(state,action)=>{
            state.loading = false
            state.departments = action.payload.data
            state.error = null
            state.status = action.payload.status
        })
        builder.addCase(fetchDepartments.rejected,(state,action)=>{
            state.loading = false
            state.departments = []
            state.error = action.error.message
            state.status = action.error.status
        })
        
        
    }
})

export default departmentSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../../apiLinks/apiLinks";

let token = localStorage.getItem('userToken')
let headers = { authorization: token }
export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', ({department,sort,filter,page,search}) => {
    return (
        axios.get(`${userUrl}getDoctors?search=${search}&department=${department}&sort=${sort}&filter=${filter}&page=${page}`, { headers })
        .then((response) => {
            let result = {
                data: response.data,
                status: response.status
            }
            return result
        }).catch((err) => {
            let error = {
                status: err?.response?.status,
                message: err?.message
            }
            return error
        })
    )

})

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        loading: false,
        doctors: [],
        status: null
    },
    extraReducers: builder => {
        builder.addCase(fetchDoctors.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.loading = false
            state.doctors = action.payload.data
            state.status = action.payload.status
        })
        builder.addCase(fetchDoctors.rejected, (state, action) => {
            state.loading = false
            state.doctors = []
            state.status = action.error.status
        })
    }
})

export default doctorSlice.reducer
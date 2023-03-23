import React, { useEffect, useState } from 'react'
import './DoctorList.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function DoctorList() {
    const[doctorData,setDoctorData] = useState([])
    const [reload,setReload] = useState(false)
    const Navigate = useNavigate()
    let token = localStorage.getItem('adminToken')
    useEffect(()=>{
        token = localStorage.getItem('adminToken')
        const headers = {authorization:token}
        axios.get(`${adminUrl}getDoctorList`,{headers}).then((response)=>{
            setDoctorData(response.data)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    },[reload])
    const blockDoctor = (doctorId)=>{
        const headers = {authorization:token}
        axios.get(`${adminUrl}blockDoctor/${doctorId}`,{headers}).then((response)=>{
            setReload(reload=>!reload)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    const unBlockDoctor = (doctorId)=>{
        const headers = {authorization:token}
        axios.get(`${adminUrl}unBlockDoctor/${doctorId}`,{headers}).then((response)=>{
            setReload(reload=>!reload)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    
    const columns = [
        {
            field: 'index',
            headerName: '#',
            width: 100,
            renderCell: (params) => {
                const rowId = params.row._id;
                const rowIndex = doctorData.findIndex((row) => row._id === rowId);
                return (
                    <div>{rowIndex + 1}</div>
                );
            },
        },
        { field: 'fullName', headerName: 'Full name', width: 200 },
        { field: 'email', headerName: 'email', width: 200 },
        ,
        {
            field: 'phone',
            headerName: 'Phone',
            sortable: false,
            width: 150,
        },
        {
            field: 'qualification',
            headerName: 'qualification',
            sortable: false,
            width: 100,
        },
        {
            field: 'department',
            headerName: 'Department',
            sortable: false,
            width: 200,
            renderCell:(params)=>{
                return(
                    <p>{params.value.name}</p>
                )
            }
        },
        {
            field: 'block',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                    return (
                    params.row.block ? <div className='tableAction'>
                        <button onClick={() => { unBlockDoctor(params.row._id) }} className='btn-success btn'>unBlock</button>
                    </div> : <div className='tableAction'>
                        <button className='btn-danger btn' onClick={() => { blockDoctor(params.row._id) }}>Block</button>
                    </div>
                )
            }


        }
    ];

    return (
        <>
        <Toaster/>
        <div className='dataTable w-100 '>
            <DataGrid
                getRowId={(row) => row._id}
                rows={doctorData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
        </>
    )
}

export default DoctorList

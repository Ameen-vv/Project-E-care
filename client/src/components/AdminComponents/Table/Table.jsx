import React,{useContext, useEffect,useState} from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { adminUrl } from '../../../../apiLinks/apiLinks';
import { adminLoading } from '../../../pages/Admin/Home/Home';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Table = () => {
    const [userData,setUserData] = useState([])
    const [reload,setReload] = useState(false)
    let token = localStorage.getItem('adminToken')
    const Navigate = useNavigate()
    const {changeLoading} =useContext(adminLoading)
    useEffect(()=>{
        changeLoading(true)
         token = localStorage.getItem('adminToken')
        const headers = {authorization:token}
        axios.get(`${adminUrl}getUsers`,{headers}).then((response)=>{
            setUserData(response.data)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(()=>changeLoading(false))    
    },[reload])
    
    const blockUser = (userId)=>{
        const headers = {authorization:token}
        axios.get(`${adminUrl}blockUser/${userId}`,{headers}).then((response)=>{
           response.status === 200 && setReload(reload=>!reload)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    const unBlockUser = (userId)=>{
        const headers = {authorization:token}
        axios.get(`${adminUrl}unBlockUser/${userId}`,{headers}).then((response)=>{
            response.status === 200 && setReload(reload=>!reload)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'fullName', headerName: 'Full name', width: 200 },
        { field: 'email', headerName: 'email', width: 200 },
        ,
        {
            field: 'phone',
            headerName: 'Phone',
            sortable: false,
            width: 200,
        },
        {
            field: 'block',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    params.row.block ? <div className='tableAction'>
                        <button onClick={()=>{unBlockUser(params.row._id)}} className='btn-success btn'>unBlock</button>
                    </div> : <div className='tableAction'>
                        <button className='btn-danger btn' onClick={()=>{blockUser(params.row._id)}}>Block</button>
                    </div>
                )
            }
    
    
        }
    ];

    return (
        <div className='dataTable w-100'>
            <Toaster/>
            <DataGrid
                getRowId={(row) => row._id}
                rows={userData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}

export default Table

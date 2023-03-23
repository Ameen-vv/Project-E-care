import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { adminUrl } from '../../../../apiLinks/apiLinks';
import { adminLoading } from '../../../pages/Admin/Home/Home';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const SalesReport = () => {
    const [sales, setSales] = useState([])
    const [reload, setReload] = useState(false)
    let token = localStorage.getItem('adminToken')
    const Navigate = useNavigate()
    const { changeLoading } = useContext(adminLoading)
    useEffect(() => {
        changeLoading(true)
        token = localStorage.getItem('adminToken')
        const headers = { authorization: token }
        axios.get(`${adminUrl}getSales`, { headers }).then((response) => {
            setSales(response.data)
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(() => changeLoading(false))
    }, [reload])


    const columns = [
        {
            field: 'index',
            headerName: '#',
            width: 100,
            renderCell: (params) => {
                const rowId = params.row._id;
                const rowIndex = sales.findIndex((row) => row._id === rowId);
                return (
                    <div>{rowIndex + 1}</div>
                );
            },
        },
        { 
            field: 'patientId', 
            headerName: 'Patient', 
            width: 200,
            renderCell:(params)=>(
                <span>{params.value ? params.value.fullName : ''}</span>
            )
         },
        {
            field: 'doctorId',
            headerName: 'Doctor',
            width: 200,
            renderCell: (params) => (
                <span>{params.value ? `Dr ${params.value.fullName}` : ''}</span>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            sortable: false,
            width: 200,
        },
        {
            field: 'price',
            headerName: 'Amount',
            sortable: false,
            width: 100,
        },
        {
            field: 'paymentId',
            headerName: 'Payment Id',
            width: 200,
            renderCell: (params) => (
                <span>{params.value ? params.value : ''}</span>
            ),
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment',
            width: 200,
            renderCell: (params) => (
                <span>{params.value ? 'success' : 'failed'}</span>
            ),
        }


    ];

    return (
        <div className='dataTable w-100'>
            <Toaster />
            <DataGrid
                getRowId={(row) => row._id}
                rows={sales}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}

export default SalesReport
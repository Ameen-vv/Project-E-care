import React, { useContext, useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import axios from 'axios'
import { adminUrl } from '../../../../apiLinks/apiLinks';
import { adminLoading } from '../../../pages/Admin/Home/Home';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



const SalesReport = () => {
    const [sales, setSales] = useState([])
    const [reload, setReload] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    let token = localStorage.getItem('adminToken')
    const Navigate = useNavigate()
    const { changeLoading } = useContext(adminLoading)
    useEffect(() => {
        changeLoading(true)
        token = localStorage.getItem('adminToken')
        const headers = { authorization: token }
        axios.get(`${adminUrl}getSales?startDate=${startDate}&endDate=${endDate}`, { headers }).then((response) => {
            setSales(response.data)
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(() => changeLoading(false))
    }, [reload, startDate, endDate])

    const handleDateChange = (e) => {
        if (e.target.id === "startDate") {
            setStartDate(e.target.value);
            document.getElementById("endDate").setAttribute("min", e.target.value);
        } else if (e.target.id === "endDate") {
            setEndDate(e.target.value);
            document.getElementById("startDate").setAttribute("max", e.target.value);
        }
    };



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
            renderCell: (params) => (
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

    const CustomToolbar = () => {
        const handleExport = () => {
            console.log('herre');
            // Get the current data from the DataGrid
            const data = sales.map((row) => ({
                ...row,
                patientId: row.patientId ? row.patientId.fullName : "",
                doctorId: row.doctorId ? `Dr ${row.doctorId.fullName}` : "",
            }));

            // Convert the data to CSV format
            const csv = new Blob([Papa.unparse(data)], { type: "text/csv;charset=utf-8" });

            // Download the CSV file
            saveAs(csv, "data.csv");
        };
        return (
            <div className='w-full flex justify-end mb-2'>
                <GridToolbarContainer>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector  className='me-2'/>
                    <Button
                        onClick={handleExport}
                        variant="text"
                        color="inherit"
                        size="small"
                        startIcon={<ArrowDownwardIcon/>}
                        className='text-primary '
                    >
                        export
                    </Button>          
                    </GridToolbarContainer>
            </div>
        );
    }

    return (
        <div className='dataTable w-100'>
            <Toaster />
            <div className="flex mb-2 w-full justify-end ">
                <input type="date" id='startDate' className="me-2 rounded-md border border-gray-300 p-2" onChange={handleDateChange} />
                <input type="date" id='endDate' className="rounded-md border border-gray-300 p-2 me-2" onChange={handleDateChange} />
            </div>
            <DataGrid
                getRowId={(row) => row._id}
                rows={sales}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                components={{ Toolbar: CustomToolbar }}

            />
        </div>
    )
}

export default SalesReport
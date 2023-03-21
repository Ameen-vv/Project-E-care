import React, { useEffect, useState, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import './newDoctors.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { adminLoading } from '../../../pages/Admin/Home/Home';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function NewDoctors() {
    const [doctorData, setDoctorData] = useState([])
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false)
    const [reject, setReject] = useState('')
    const {  changeLoading } = useContext(adminLoading)
    const Navigate = useNavigate()
    let token = localStorage.getItem('adminToken')

    useEffect(() => {
        changeLoading(true)
        token = localStorage.getItem('adminToken')
        const headers = {authorization:token}
        axios.get(`${adminUrl}getNewDoctors`,{headers}).then((response) => {
            setDoctorData(response.data)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(() => changeLoading(false))
    }, [reload])

    const approveDoctor = (doctorId) => {
        const headers = {authorization:token}
        axios.get(`${adminUrl}approve/${doctorId}`,{headers}).then((response) => {
            response.status === 200 && setReload(reload=>!reload)
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const rejectDoctor = (doctorId) => {
        setOpen(false)
        const headers = {authorization:token}
        axios.post(`${adminUrl}reject`, { doctorId, reject },{headers}).then((response) => {
            response.status === 200 && setReload(reload=>!reload)
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
            width: 150,
        },
        {
            field: 'licenseUrl',
            headerName: 'License',
            sortable: false,
            width: 120,
            renderCell: (params) => {
                const [selectedRow, setSelectedRow] = useState(null);

                const handleOpen = () => {
                    setSelectedRow(params._id);
                };

                const handleClose = () => {
                    setSelectedRow(null);
                };

                return (
                    <Box>
                        <Button variant="contained" onClick={handleOpen} style={{ textTransform: 'none' }}>
                            View
                        </Button>
                        <Modal open={selectedRow === params._id}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 800 }}>
                                    <Card sx={{ width: "100%" }}>
                                        <CardMedia component="img" src={params.value} alt="Certificate" />
                                    </Card>
                                </Box>
                                <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Modal>
                    </Box>
                );
            }

        },
        {
            field: 'block',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                
                return (

                    <div className='tableAction'>
                        <button onClick={() => { approveDoctor(params.row._id) }} className='btn-success btn me-2'>Approve</button>

                        <Button variant="contained" color='error' onClick={handleClickOpen} style={{ textTransform: 'none' }}>
                            Reject
                        </Button>
                        <Dialog open={open} onClose={handleClose}
                            BackdropProps={{
                                style: {
                                    backgroundColor: 'black',
                                    opacity: 0.2
                                },
                            }}>
                            <DialogTitle>Subscribe</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To subscribe to this website, please enter your email address here. We
                                    will send updates occasionally.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="none"
                                    id="name"
                                    label="Reason"
                                    type="Text"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        style: {
                                            outline: "none"
                                        }
                                    }}
                                    onChange={(e) => setReject(e.target.value)}

                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => { rejectDoctor(params.row._id) }}>Submit</Button>
                            </DialogActions>
                        </Dialog>

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
                rows={doctorData}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
        </div>
    )
}

export default NewDoctors

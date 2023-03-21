import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from 'react-hot-toast';
import { adminLoading } from '../../../pages/Admin/Home/Home';
import { useNavigate } from 'react-router-dom';


function Departments() {
    const [departments, setDepartments] = useState([])
    const { changeLoading } = useContext(adminLoading)
    const [depDetails, setDepDetails] = useState('')
    const [editPage, setEditPage] = useState(false)
    const [reload, setReload] = useState(false)
    const [department, setDepartment] = useState('')
    const [diseases, setDiseases] = useState('')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const Navigate = useNavigate()
    let token = localStorage.getItem('adminToken')
    useEffect(() => {
        changeLoading(true)
        token = localStorage.getItem('adminToken')
        const headers = { Authorization: token }
        axios.get(`${adminUrl}departments`, { headers }).then((response) => {
            response.status === 200 ? setDepartments(response.data) : toast.error('some unexpected errors')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(() => changeLoading(false))
    }, [reload])

    const unListDepartment = (id) => {
        const headers = { Authorization: token }
        axios.get(`${adminUrl}unListDepartment/${id}`, { headers }).then((response) => {
            response.status === 200 ? setReload(reload => !reload) : toast.error('some unexpected errors')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    const listDepartment = (id) => {
        const headers = { Authorization: token }
        axios.get(`${adminUrl}listDepartment/${id}`, { headers }).then((response) => {
            response.status === 200 ? setReload(reload => !reload) : toast.error('some unexpected errors')
        }).catch((err) => {
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    const handleEdit = (depDetails) => {
        console.log(depDetails);
        setDepDetails(depDetails)
        setEditPage(true)
    }
    const editDepartment = (e) => {
        e.preventDefault()
        changeLoading(true)
        let token = localStorage.getItem('adminToken')
        const headers = { Authorization: token }
        let departmentDetails = {
            name: department === '' ? depDetails.name : department,
            diseases: diseases === '' ? depDetails.commonDiseases.join() : diseases,
            description: description === '' ? depDetails.description : description
        }
        if (image) {
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onloadend = () => {
                let imageData = reader.result
                axios.post(`${adminUrl}editDepartment/${depDetails._id}`, { departmentDetails, imageData }, { headers }).then((response) => {
                    if (response.data.status === 'success') {
                        setEditPage(false)
                        setReload(reload => !reload)
                        toast.success('edited successfully')
                    }
                    response.data.status === 'exist' && toast.error('Department already exists')
                    response.data.status === 'error' && toast.error('Some Unexpected Errors')
                }).catch(() => {
                    err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
                }).finally(() => changeLoading(false))
            }


        } else {
            axios.post(`${adminUrl}editDepartment/${depDetails._id}`, { departmentDetails }, { headers }).then((response) => {
                response.data.status === 'exist' && toast.error('Department already exists')
                if (response.data.status === 'success') {
                    setEditPage(false)
                    setReload(reload => !reload)
                    toast.success('Edited Successfully')
                }
                response.data.status === 'exist' && toast.error('Department already exists')
                response.data.status === 'error' && toast.error('Some Unexpected Errors')
            }).catch(() => {
                err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
            }).finally(() => changeLoading(false))
        }

    }

    const columns = [
        {
            field: 'index',
            headerName: '#',
            width: 100,
            renderCell: (params) => {
                const rowId = params.row._id;
                const rowIndex = departments.findIndex((row) => row._id === rowId);
                return (
                    <div>{rowIndex + 1}</div>
                );
            },
        },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'commonDiseases', headerName: 'common diseases', width: 300,
            renderCell: (params) => {
                return (
                    <ul>
                        {params.value.map((disease, index) => {
                            return <li key={index}>{disease}</li>
                        })}
                    </ul>
                )
            }


        },

        {
            field: 'imageUrl',
            headerName: 'image',
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
            field: 'list',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    params.value ? <div className='tableAction'>
                        <button onClick={() => { unListDepartment(params.row._id) }} className='btn-danger btn'>unList</button>
                    </div> : <div className='tableAction'>
                        <button className='btn-success btn' onClick={() => { listDepartment(params.row._id) }}>List</button>
                    </div>
                )
            }


        },
        {
            field: '_id',
            headerName: 'Edit',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='tableAction'>
                        <button onClick={() => handleEdit(params.row)} className='btn-danger btn'>Edit</button>
                    </div>
                )
            }


        }

    ]



    return (
        <div className='dataTable w-100'>
            <Toaster />
            {!editPage ? <DataGrid
                getRowId={(row) => row._id}
                rows={departments}
                rowHeight={70}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            /> : <> <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={editDepartment} >
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Name</label>
                    <input name='name' onChange={(e) => setDepartment(e.target.value)} type="text" placeholder={depDetails?.name} className="block w-full px-5 py-3 mt-2 text-black-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Description</label>
                    <input name='name' onChange={(e) => setDescription(e.target.value)} type="text" placeholder={depDetails?.description} className="block w-full px-5 py-3 mt-2 text-black-800 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Common Diseases</label>
                    <input name='diseases' type="text" onChange={(e) => setDiseases(e.target.value)} placeholder={depDetails?.commonDiseases} className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-400">Upload Photo</label>
                    <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])} placeholder="MBBS,MD, etc" accept="image/*" className="block w-full px-5 py-3 mt-2  placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>


                <button
                    className="flex mt-4 h-3/4 items-center  w-1/4 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span>Edit</span>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd" />
                </svg> */}
                </button>
            </form>
                <button
                    className="flex mt-4 items-center px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 bg-blue-500 hover:bg-secColor" onClick={() => setEditPage(false)}>
                    <span>Back</span>

                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd" />
                </svg> */}
                </button>
            </>}
        </div>
    )
}

export default Departments

import { useContext, useEffect, useState } from "react";
import { Box, Card, Container, Grid, Typography, useTheme, } from "@mui/material";
import { FaUserAlt, FaStethoscope, FaBook } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { adminUrl } from "../../../../apiLinks/apiLinks";
import { adminLoading } from "../../../pages/Admin/Home/Home";

const Dashboard = () => {
    const { changeLoading } = useContext(adminLoading)
    const [userCount,setUserCount] = useState('')
    const [doctorCount,setDoctorCount] = useState('')
    const [appointmentCount,setAppointmentCount] = useState('')
    const[userGraph,setUserGraph] = useState([])
    const [appointmentGraph,setAppointmentGraph] = useState([])
    useEffect(() => {
        changeLoading(true)
        const token = localStorage.getItem('adminToken')
        const headers = { authorization: token }
        axios.get(`${adminUrl}getDashboardDetails`, { headers }).then((response) => {
            setUserCount(response.data.users)
            setDoctorCount(response.data.doctors)
            setAppointmentCount(response.data.appointments)
            setUserGraph(response.data.userGraph)
            setAppointmentGraph(response.data.appointmentGraph)
        }).catch(()=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(()=>changeLoading(false))
    }, [])

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Users by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
        }
    }

    const optionsSales = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Sales by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
        }
    }


    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                            boxShadow: theme.shadows[4],
                            borderRadius: theme.shape.borderRadius,
                            padding: theme.spacing(2),
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <FaUserAlt size={40} />
                            <Typography variant="h6" className="mx-auto">Total Users</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ mt: 2, fontSize: "2.2rem" }}>
                            {userCount}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.common.white,
                            boxShadow: theme.shadows[4],
                            borderRadius: theme.shape.borderRadius,
                            padding: theme.spacing(2),
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <FaStethoscope size={40} />
                            <Typography variant="h6" className="mx-auto">Total Doctors</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ mt: 2, fontSize: "2.2rem" }}>
                            {doctorCount}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.warning.main,
                            color: theme.palette.common.white,
                            boxShadow: theme.shadows[4],
                            borderRadius: theme.shape.borderRadius,
                            padding: theme.spacing(2),
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <FaBook size={40} />
                            <Typography variant="h6" className="mx-auto">Total Bookings</Typography>
                        </Box>
                        <Typography variant="h3" sx={{ mt: 2, fontSize: "2.2rem" }}>
                            {appointmentCount}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            boxShadow: theme.shadows[4],
                            borderRadius: theme.shape.borderRadius,
                            padding: theme.spacing(5),
                        }}
                    >
                        <ReactApexChart options={options} series={userGraph} type="line" height={350} />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            boxShadow: theme.shadows[4],
                            borderRadius: theme.shape.borderRadius,
                            padding: theme.spacing(5),
                        }}
                    >
                        <ReactApexChart options={optionsSales} series={appointmentGraph} type="line" height={350} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;

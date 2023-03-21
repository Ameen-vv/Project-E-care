import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { doctorUrl } from '../../apiLinks/apiLinks'
import { userContext } from '../store/Contexts'


const DoctorRoutes = () => {
    const Navigate = useNavigate()
    const [doctorCheck, setDoctorCheck] = useState(false)
    
    useEffect(() => {
        const token = localStorage.getItem('doctorToken')
        const headers = {Authorization:token}
        axios.get(`${doctorUrl}authenticate`, {headers}).then((response) => {
            if (response.status != 200) {
                setDoctorCheck(false)
                Navigate('/signIn')
            } else {
                setDoctorCheck(true)
            }
        }).catch(()=>{
            setDoctorCheck(false)
            Navigate('/signIn')
        })
    }, [])

    return (
        doctorCheck && <Outlet />
    )
}


export default DoctorRoutes

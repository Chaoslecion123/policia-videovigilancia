import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarComponent } from './VerticalBarChart';

const AdminDashboard = () => {
    const navidate = useNavigate()

    console.log('AdminDashboard')
    const name = localStorage.getItem("name");

    

    // useEffect(() => {
    //     if (!name) {
    //         navidate("/login")
    //     }
    // }, [])

    return (
        <>
            <BarComponent/>

        </>
    )
}

export default AdminDashboard
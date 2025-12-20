import React from 'react';
import useRole from '../../hooks/useRole';
import LoaderSpinner from '../../components/shared/LoaderSpinner';
import AdminDashboard from '../admin/AdminDashboard';
import StaffDashboard from '../staff/StaffDashboard';
import CitizenDashboard from '../citizen/CitizenDashboard';

const DashboardHome = () => {
    const { role, isLoading } = useRole();
    if(isLoading){
        return <LoaderSpinner></LoaderSpinner>;
    }
    if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>;
    }
    else if(role === 'citizen'){
        return <CitizenDashboard></CitizenDashboard>;
    }
    else{
        return <StaffDashboard></StaffDashboard>;
    }
   
};

export default DashboardHome;
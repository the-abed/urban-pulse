import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoaderSpinner from '../components/shared/LoaderSpinner';


const StaffRoute = ({children}) => {
    const {loading} = useAuth();
    const {role, isLoading} = useRole();

    if (loading || isLoading) {
        return <LoaderSpinner></LoaderSpinner>;
    }
    if(role !== "staff"){
        return <p className="text-3xl text-red-500">Access Denied</p>
    }
    return children;
};

export default StaffRoute;
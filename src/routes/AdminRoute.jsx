import React from 'react';

import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoaderSpinner from '../components/shared/LoaderSpinner';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, isLoading} = useRole();

    if (loading || isLoading) {
        return <LoaderSpinner></LoaderSpinner>;
    }
    if(role !== "admin"){
        return <p className="text-3xl text-red-500">Access Denied</p>
    }
    return children;
};

export default AdminRoute;
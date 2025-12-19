import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    return (
        <div className='p-5'>
            <h2 className='text-3xl font-bold'>Manage Users</h2>
            {/* Manage Users */}
        </div>
    );
};

export default ManageUsers;
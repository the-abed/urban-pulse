import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className='text-3xl font-bold'>Admin Dashboard</h2>
      <Link to="/addstaff">
      <button className="btn btn-primary">Add Staff</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
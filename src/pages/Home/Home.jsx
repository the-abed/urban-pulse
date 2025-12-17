import React from 'react';
import { Link } from 'react-router';
import AllIssue from '../Issues/AllIssue';

const Home = () => {
    return (
        <div>
            <h2 className='text-3xl font-bold'>This is Home</h2>
            <Link to="/reportIssue">
                <button className="btn btn-primary">Report Issue</button>
            </Link>
            <AllIssue></AllIssue>
        </div>
    );
};

export default Home;
import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>
            <h2 className='text-3xl font-bold'>This is Home</h2>
            <Link to="/reportIssue">
                <button className="btn btn-primary">Report Issue</button>
            </Link>
        </div>
    );
};

export default Home;
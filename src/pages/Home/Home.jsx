import React from 'react';
import { Link } from 'react-router';
import AllIssue from '../Issues/AllIssue';
import Features from './home/Features';
import HowItWorks from './home/HowItWorks';
import StatsSection from './home/StatsSection';
import PremiumSection from './home/PremiumSection';
import RecentIssue from './home/RecentIssue';
import Banner from './home/Banner';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Link to="/reportIssue">
                <button className="btn btn-primary">Report Issue</button>
            </Link>
            <RecentIssue></RecentIssue>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <StatsSection></StatsSection>
            <PremiumSection></PremiumSection>
        </div>
    );
};

export default Home;
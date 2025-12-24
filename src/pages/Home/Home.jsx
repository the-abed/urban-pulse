import React from 'react';
import { Link } from 'react-router';
import AllIssue from '../Issues/AllIssue';
import Features from './home/Features';
import HowItWorks from './home/HowItWorks';
import StatsSection from './home/StatsSection';
import PremiumSection from './home/PremiumSection';
import RecentIssue from './home/RecentIssue';
import Banner from './home/Banner';
import Testimonials from './home/Testimonials';
import BecomePremium from './home/BecomePremium';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <section className='max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>

            <BecomePremium></BecomePremium>
            <RecentIssue></RecentIssue>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <StatsSection></StatsSection>
            <PremiumSection></PremiumSection>
            <Testimonials></Testimonials>
            </section>
        </div>
    );
};

export default Home;
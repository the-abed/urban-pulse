import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
    return (
        // 1. Outer Container: Flex column, full minimum height
        <div className="flex flex-col min-h-screen ">
            
            {/* 2. Header/Navbar Area */}
            <header className="sticky top-0 z-50 ">
                {/* Apply responsive padding/container sizing here or inside Navbar */}
                <div className="text-center">
                    <Navbar />
                </div>
            </header>
            
            {/* 3. Main Content Area: Takes up remaining space (flex-grow) */}
            <main className="grow container max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* The content of the current route */}
                <Outlet />
            </main>
            
            {/* 4. Footer Area */}
            <footer className="">
                {/* Apply padding and center content */}
                <div className=" mx-auto text-center text-sm">
                    <Footer />
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
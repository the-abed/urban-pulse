import React from 'react';

const LoaderSpinner = () => {
    return (
        <div>
            <div>
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            </div>
        </div>
    );
};

export default LoaderSpinner;
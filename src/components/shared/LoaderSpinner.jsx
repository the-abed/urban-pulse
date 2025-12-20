import React from 'react';
import { Wrench, Nut } from 'lucide-react';
import '../../Loader.css';

const LoaderSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
                
                {/* The Nut - Rotates only when "pushed" */}
                <div className="absolute animate-nut-turn">
                    <Nut size={40} className="text-slate-700 dark:text-slate-200 fill-current" />
                </div>
                
                {/* The Wrench Pivot Point */}
                <div className="absolute w-full h-full animate-wrench-work">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                        <Wrench 
                            size={32} 
                            className="text-violet-500 -rotate-90" 
                        />
                    </div>
                </div>

            </div>
            <span className="text-sm font-medium animate-pulse text-slate-500">
                Tightening components...
            </span>
        </div>
    );
};

export default LoaderSpinner;
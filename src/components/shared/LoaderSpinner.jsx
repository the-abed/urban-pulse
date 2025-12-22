import React from 'react';
import { Wrench, Zap, MapPin } from 'lucide-react';

const LoaderSpinner = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-transparent">
            <div className="relative flex items-center justify-center">
                
                {/* Layer 1: The Outer Glow Pulse */}
                <div className="absolute w-32 h-32 bg-primary/20 rounded-full animate-ping opacity-20"></div>
                
                {/* Layer 2: Rotating Border */}
                <div className="w-24 h-24 border-4 border-dashed border-secondary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>

                {/* Layer 3: Orbiting Icons */}
                <div className="absolute w-full h-full animate-[spin_3s_linear_infinite]">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full shadow-lg">
                        <Wrench size={18} className="text-primary" />
                    </div>
                </div>
                
                <div className="absolute w-full h-full animate-[spin_4s_linear_infinite_reverse]">
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 bg-white p-1 rounded-full shadow-lg">
                        <MapPin size={18} className="text-secondary" />
                    </div>
                </div>

                {/* Layer 4: Central Power Icon */}
                <div className="absolute flex flex-col items-center justify-center">
                    <div className="bg-primary p-4 rounded-2xl shadow-xl shadow-primary/30 animate-bounce">
                        <Zap size={32} className="text-white fill-current" />
                    </div>
                </div>
            </div>

            {/* Elegant Text */}
            <div className="mt-10 text-center space-y-2">
                <h3 className="text-lg font-black tracking-[0.2em] uppercase text-gray-800">
                    Urban<span className="text-primary">Pulse</span>
                </h3>
                <div className="flex items-center gap-2 justify-center">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-bounce"></span>
                    <p className="text-sm font-medium text-gray-500 italic">
                        Optimizing city infrastructure...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoaderSpinner;
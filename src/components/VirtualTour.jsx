import React, { useRef, useState } from 'react';
import { X, Loader, Compass, Maximize } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VirtualTour = ({ isOpen, onClose, propertyTitle, propertyImage }) => {
    const modalRef = useRef();
    const overlayRef = useRef();
    const [tourState, setTourState] = useState('initial'); // initial, loading, active

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
        }
    }, { dependencies: [isOpen] });

    const startTour = () => {
        setTourState('loading');
        setTimeout(() => {
            setTourState('active');
        }, 2000);
    };

    const resetTour = () => {
        setTourState('initial');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={resetTour}
            />

            <div
                ref={modalRef}
                className="relative w-full max-w-5xl bg-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[80vh]"
            >
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-white/10 bg-white/5 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <h3 className="text-xl font-bold text-white">
                            {tourState === 'active' ? 'Live Virtual Tour' : `Virtual Tour: ${propertyTitle}`}
                        </h3>
                    </div>
                    <button onClick={resetTour} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">

                    {/* Initial State */}
                    {tourState === 'initial' && (
                        <div className="text-center p-8">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                                <Compass size={48} className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Step inside {propertyTitle} with our immersive 3D walkthrough experience.
                            </p>
                            <button
                                onClick={startTour}
                                className="btn-primary px-8 py-4 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                            >
                                Start Tour
                            </button>
                        </div>
                    )}

                    {/* Loading State */}
                    {tourState === 'loading' && (
                        <div className="text-center">
                            <Loader size={48} className="text-primary animate-spin mx-auto mb-4" />
                            <p className="text-white font-medium text-lg">Connecting to 3D Server...</p>
                            <p className="text-gray-500 text-sm mt-2">Loading assets for {propertyTitle}</p>
                        </div>
                    )}

                    {/* Active State (Simulated) */}
                    {tourState === 'active' && (
                        <div className="absolute inset-0 w-full h-full">
                            {/* Simulated 3D View (Ken Burns Effect on Image) */}
                            <img
                                src={propertyImage}
                                alt="Tour View"
                                className="w-full h-full object-cover animate-[kenburns_20s_ease-in-out_infinite_alternate]"
                            />

                            {/* UI Overlays */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                                <button className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20">
                                    <Compass size={24} />
                                </button>
                                <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium">
                                    Living Room
                                </div>
                                <button className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20">
                                    <Maximize size={24} />
                                </button>
                            </div>

                            <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Interactive Mode</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualTour;

import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import PropertyCard from '../components/PropertyCard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Home = () => {
    const { properties, fetchProperties } = useStore();
    const featuredProperties = properties.slice(0, 3);
    const container = useRef();

    React.useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-text', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        })
            .from('.hero-btn', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.5');

    }, { scope: container });

    return (
        <div ref={container} className="pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-dark z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-2xl">
                        Find Your Vibe. <br /> Live Your Dream.
                    </h1>

                    <p className="hero-text text-xl text-white mb-10 font-bold drop-shadow-md">
                        The ultimate marketplace for modern living. Buy, rent, or sell homes that match your aesthetic.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/explore" className="hero-btn btn-primary flex items-center justify-center gap-2 text-lg px-8 py-3">
                            Explore Homes <ArrowRight size={20} />
                        </Link>
                        <Link to="/add" className="hero-btn px-8 py-3 rounded-full glass hover:bg-white/20 transition-colors text-lg font-bold text-gray-800">
                            List Property
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-6 mt-20">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
                    <Link to="/explore" className="text-primary hover:text-secondary transition-colors flex items-center gap-1 font-medium">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;

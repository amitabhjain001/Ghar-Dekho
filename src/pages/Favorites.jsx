import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import PropertyCard from '../components/PropertyCard';

const Favorites = () => {
    const { properties, favorites } = useStore();
    const favoriteProperties = properties.filter(p => favorites.includes(p.id));

    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <h1 className="text-4xl font-bold mb-10 mt-10">Your Favorites</h1>

            {favoriteProperties.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {favoriteProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
                    <p className="text-gray-400 mb-8">Start exploring to find your dream home.</p>
                    <Link to="/explore" className="btn-primary inline-flex items-center gap-2">
                        Explore Homes <ArrowRight size={20} />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Favorites;

import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import PropertyCard from '../components/PropertyCard';

const Explore = () => {
    const { properties } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase());
        // Simple mock price filter logic (just for demo)
        const matchesPrice = priceFilter === 'all' ? true : true;

        return matchesSearch && matchesPrice;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 mt-10">
                <h1 className="text-4xl font-bold">Explore Homes</h1>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by location or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <button className="p-3 rounded-full glass hover:bg-white/20 transition-colors">
                        <SlidersHorizontal size={20} />
                    </button>
                </div>
            </div>

            {filteredProperties.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No properties found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Explore;

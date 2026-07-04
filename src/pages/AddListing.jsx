import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, IndianRupee, MapPin, Layout, Home } from 'lucide-react';
import { useStore } from '../store/useStore';

const AddListing = () => {
    const navigate = useNavigate();
    const { addProperty } = useStore();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        image: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        amenities: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProperty = {
            ...formData,
            amenities: formData.amenities.split(',').map(item => item.trim()),
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            sqft: parseInt(formData.sqft),
        };
        addProperty(newProperty);
        navigate('/explore');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-3xl mx-auto px-6 pb-20">
            <h1 className="text-4xl font-bold mb-8 mt-10 text-center">List Your Space</h1>

            <div className="glass p-8 rounded-3xl border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Property Title</label>
                            <div className="relative">
                                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g. Neon Penthouse"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    required
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="e.g. ₹2,00,000/mo"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Downtown, Cyber City"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                        <div className="relative">
                            <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                required
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                type="url"
                                placeholder="https://..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Bedrooms</label>
                            <input
                                required
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                type="number"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Bathrooms</label>
                            <input
                                required
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                type="number"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Sq Ft</label>
                            <input
                                required
                                name="sqft"
                                value={formData.sqft}
                                onChange={handleChange}
                                type="number"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="Tell us about the property..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Amenities (comma separated)</label>
                        <div className="relative">
                            <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                required
                                name="amenities"
                                value={formData.amenities}
                                onChange={handleChange}
                                type="text"
                                placeholder="Wifi, Pool, Gym..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary py-4 text-lg font-bold mt-6">
                        Publish Listing
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddListing;

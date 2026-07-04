import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowLeft, CheckCircle, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import VirtualTour from '../components/VirtualTour';

const PropertyDetails = () => {
    const { id } = useParams();
    const { properties } = useStore();
    const property = properties.find(p => p.id === parseInt(id));

    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        date: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isTourOpen, setIsTourOpen] = useState(false);

    if (!property) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Property Not Found</h2>
                <Link to="/explore" className="text-primary hover:underline font-medium">Back to Explore</Link>
            </div>
        );
    }

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    propertyId: property.id,
                    propertyTitle: property.title,
                    ...bookingForm
                }),
            });

            if (response.ok) {
                setShowSuccess(true);
                setBookingForm({ name: '', email: '', date: '', message: '' });
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                alert('Failed to send booking request.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Error sending booking request.');
        }
    };

    return (
        <div className="pb-20">
            {/* Image Header */}
            <div className="relative h-[50vh] w-full">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <Link to="/explore" className="absolute top-6 left-6 p-3 rounded-full glass hover:bg-white/20 transition-colors text-white">
                    <ArrowLeft size={24} />
                </Link>

                <button
                    onClick={() => setIsTourOpen(true)}
                    className="absolute bottom-10 right-10 btn-primary flex items-center gap-2 shadow-xl animate-bounce"
                >
                    <Video size={20} />
                    <span className="font-bold">Virtual Tour</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Details Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{property.title}</h1>
                            <div className="flex items-center text-gray-600 text-lg mb-6 font-medium">
                                <MapPin size={20} className="mr-2 text-primary" />
                                {property.location}
                            </div>

                            <div className="flex gap-6 text-gray-600 mb-8 p-6 rounded-2xl glass">
                                <div className="flex flex-col items-center">
                                    <Bed size={24} className="mb-2 text-primary" />
                                    <span className="font-bold text-xl text-gray-800">{property.bedrooms}</span>
                                    <span className="text-sm font-medium">Bedrooms</span>
                                </div>
                                <div className="w-px bg-gray-300" />
                                <div className="flex flex-col items-center">
                                    <Bath size={24} className="mb-2 text-secondary" />
                                    <span className="font-bold text-xl text-gray-800">{property.bathrooms}</span>
                                    <span className="text-sm font-medium">Bathrooms</span>
                                </div>
                                <div className="w-px bg-gray-300" />
                                <div className="flex flex-col items-center">
                                    <Square size={24} className="mb-2 text-accent" />
                                    <span className="font-bold text-xl text-gray-800">{property.sqft}</span>
                                    <span className="text-sm font-medium">Sq Ft</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">About this home</h2>
                                <p className="text-gray-600 leading-relaxed text-lg font-medium">{property.description}</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Amenities</h2>
                                <div className="flex flex-wrap gap-3">
                                    {property.amenities.map((amenity, index) => (
                                        <span key={index} className="px-4 py-2 rounded-full bg-white/40 border border-white/50 text-sm font-medium text-gray-700 shadow-sm">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 p-6 rounded-3xl glass border border-white/50">
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-primary">{property.price}</span>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={bookingForm.name}
                                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                        className="w-full bg-white/40 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-500 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={bookingForm.email}
                                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                        className="w-full bg-white/40 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-500 font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-1">Date</label>
                                    <input
                                        required
                                        type="date"
                                        value={bookingForm.date}
                                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                        className="w-full bg-white/40 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-gray-800 font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-1">Message</label>
                                    <textarea
                                        value={bookingForm.message}
                                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                                        className="w-full bg-white/40 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors h-24 resize-none text-gray-800 placeholder-gray-500 font-medium"
                                        placeholder="I'm interested in this property..."
                                    />
                                </div>

                                <button type="submit" className="w-full btn-primary py-4 text-lg font-bold mt-4">
                                    Book Viewing
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Virtual Tour Modal */}
            <VirtualTour
                isOpen={isTourOpen}
                onClose={() => setIsTourOpen(false)}
                propertyTitle={property.title}
                propertyImage={property.image}
            />

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 right-10 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle size={24} />
                        <div>
                            <h4 className="font-bold">Booking Confirmed!</h4>
                            <p className="text-sm opacity-90 font-medium">Check your email for details.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertyDetails;

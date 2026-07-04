import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock signup logic
        console.log('Signup attempt:', formData);
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="text-center mb-8 relative z-10">
                        <h1 className="text-4xl font-bold mb-2 text-gray-800">Create Account</h1>
                        <p className="text-gray-500 font-medium">Join the future of real estate</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/40 border border-white/50 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-400 font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/40 border border-white/50 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-400 font-medium"
                                    placeholder="hello@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    required
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/40 border border-white/50 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-400 font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 group"
                        >
                            Get Started
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center relative z-10">
                        <p className="text-gray-600 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;

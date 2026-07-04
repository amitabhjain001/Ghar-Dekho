import React from 'react';
import { motion } from 'framer-motion';
import { Building, Globe, Shield, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-dark z-10" />
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="City Skyline"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        About <span className="text-primary">Ghar Dekho</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        Redefining how the next generation finds their home.
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-3xl border border-white/10"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            At Ghar Dekho, we believe finding a home shouldn't feel like a chore from the 90s. We're building a platform that speaks your language—fast, visual, and transparent. We connect you with spaces that match your vibe, not just your budget.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 rounded-3xl border border-white/10"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">The Future of Living</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We curate properties that are more than just four walls. From smart homes in cyber cities to eco-friendly pods in nature, our listings are designed for the modern lifestyle. Experience the future of real estate with immersive virtual tours and AI-driven recommendations.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: Globe, title: "Global Reach", desc: "Properties in top destinations worldwide." },
                        { icon: Zap, title: "Instant Booking", desc: "Seamless digital process, zero paperwork." },
                        { icon: Shield, title: "Verified Listings", desc: "Every home checked for quality and safety." },
                        { icon: Building, title: "Modern Design", desc: "Curated spaces with aesthetic appeal." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/50 p-6 rounded-2xl border border-white/20 hover:bg-white/80 transition-colors"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <item.icon size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-gray-800">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;

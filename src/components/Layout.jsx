import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, Heart } from 'lucide-react';
import clsx from 'clsx';
import AIBot from './AIBot';

const Navbar = () => {
    const location = useLocation();

    const NavItem = ({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                    isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-gray-600 hover:text-primary hover:bg-primary/10"
                )}
            >
                <Icon size={20} />
                <span className={clsx("font-medium", isActive ? "block" : "hidden md:block")}>{label}</span>
            </Link>
        );
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="text-3xl">🏡</span> Ghar Dekho
                </Link>

                <div className="flex items-center gap-2">
                    <NavItem to="/" icon={Home} label="Home" />
                    <NavItem to="/explore" icon={Search} label="Explore" />
                    <NavItem to="/about" icon={PlusCircle} label="About" />
                    <NavItem to="/add" icon={PlusCircle} label="List" />
                    <NavItem to="/favorites" icon={Heart} label="Saved" />
                    <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>
                    <Link to="/login" className="px-5 py-2 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-dark-light pt-16 pb-8 mt-20 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="text-3xl font-bold text-primary mb-4 block">
                        🏡 Ghar Dekho
                    </Link>
                    <p className="text-gray-600 mb-6 max-w-sm font-medium">
                        The ultimate marketplace for modern living. Find your dream home with us today.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                            <span className="font-bold">IG</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                            <span className="font-bold">TW</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                            <span className="font-bold">FB</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-6 text-lg">Quick Links</h4>
                    <ul className="space-y-4 text-gray-600 font-medium">
                        <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link to="/explore" className="hover:text-primary transition-colors">Explore</Link></li>
                        <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/add" className="hover:text-primary transition-colors">List Property</Link></li>
                        <li><Link to="/favorites" className="hover:text-primary transition-colors">Saved Homes</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 mb-6 text-lg">Contact Us</h4>
                    <ul className="space-y-4 text-gray-600 font-medium">

                        <li className="flex items-center gap-3">
                            <span className="text-primary">📧</span>
                            <div className="flex flex-col">
                                <a href="mailto:amitabhjain001@gmail.com" className="hover:text-primary transition-colors">amitabhjain001@gmail.com</a>
                                <a href="mailto:dherya@gmail.com" className="hover:text-primary transition-colors">dherya@gmail.com</a>
                                <a href="mailto:manik@gmail.com" className="hover:text-primary transition-colors">manik@gmail.com</a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-primary">📞</span>
                            <a href="tel:911902787" className="hover:text-primary transition-colors">911902787</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-primary/10 pt-8 text-center text-gray-500 font-medium text-sm">
                <p>&copy; 2025 Ghar Dekho. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-dark text-gray-800 font-sans selection:bg-primary selection:text-white">
            <Navbar />
            <main className="pt-24 min-h-screen flex flex-col">
                {children}
            </main>
            <Footer />
            <AIBot />
        </div>
    );
};

export default Layout;

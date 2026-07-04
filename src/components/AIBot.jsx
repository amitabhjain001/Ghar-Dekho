import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useLocation, useNavigate } from 'react-router-dom';

const AIBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm your Ghar Dekho AI assistant. 🏡 Looking for a specific vibe or need help with a property?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const { properties } = useStore();
    const location = useLocation();
    const navigate = useNavigate();

    // Check if user is on a property page
    const currentPropertyId = location.pathname.startsWith('/property/')
        ? parseInt(location.pathname.split('/')[2])
        : null;
    const currentProperty = currentPropertyId ? properties.find(p => p.id === currentPropertyId) : null;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e, textOverride = null) => {
        if (e) e.preventDefault();
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        const userMessage = { role: 'user', text: textToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Enhanced AI Logic
        setTimeout(() => {
            let botResponse = "I'm not sure about that, but I can help you find a great home!";
            const lowerInput = textToSend.toLowerCase();

            // 1. Context Aware: Questions about CURRENT property
            if (currentProperty && (lowerInput.includes('this') || lowerInput.includes('it') || lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('location'))) {
                if (lowerInput.includes('price') || lowerInput.includes('cost')) {
                    botResponse = `The price for ${currentProperty.title} is ${currentProperty.price}. It's a great value!`;
                } else if (lowerInput.includes('location') || lowerInput.includes('where')) {
                    botResponse = `This home is located in ${currentProperty.location}.`;
                } else if (lowerInput.includes('bed') || lowerInput.includes('bath')) {
                    botResponse = `It has ${currentProperty.bedrooms} bedrooms and ${currentProperty.bathrooms} bathrooms.`;
                } else {
                    botResponse = `You're looking at ${currentProperty.title}. It's a fantastic property! Anything specific you want to know?`;
                }
            }
            // 2. Search Logic: Finding properties
            else if (lowerInput.includes('find') || lowerInput.includes('looking for') || lowerInput.includes('show me')) {
                let matches = [];

                if (lowerInput.includes('pool')) {
                    matches = properties.filter(p => p.amenities.some(a => a.toLowerCase().includes('pool')));
                    botResponse = `I found ${matches.length} homes with a pool! Check out the ${matches[0]?.title} or ${matches[1]?.title}.`;
                } else if (lowerInput.includes('cheap') || lowerInput.includes('budget')) {
                    // Simple heuristic for "budget"
                    matches = properties.slice(0, 3);
                    botResponse = "Here are some affordable options: " + matches.map(p => p.title).join(', ');
                } else if (lowerInput.includes('luxury') || lowerInput.includes('expensive')) {
                    matches = properties.filter(p => p.price.includes('Cr') || p.price.length > 10);
                    botResponse = "For luxury, you should see: " + matches.slice(0, 3).map(p => p.title).join(', ');
                } else {
                    botResponse = "I can help you find homes with pools, gyms, or in specific locations. Try asking 'Show me homes with a pool'.";
                }
            }
            // 3. General FAQs
            else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botResponse = "Hello! 👋 Ready to find your dream home?";
            } else if (lowerInput.includes('contact') || lowerInput.includes('email')) {
                botResponse = "You can reach us at amitabhjain001@gmail.com or call 911902787.";
            } else {
                botResponse = "I can help you find homes, check prices, or answer questions about the property you're viewing. Try asking 'Show me homes with a pool'!";
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1000);
    };

    const suggestions = [
        "Show me homes with a pool 🏊‍♂️",
        "Find luxury villas 💎",
        "Contact support 📞",
        ...(currentProperty ? ["How much is this home? 💰", "Tell me about amenities ✨"] : [])
    ];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[600px] glass rounded-3xl border border-white/20 shadow-2xl flex flex-col z-50 overflow-hidden bg-black/80 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Ghar Dekho AI</h3>
                                    <p className="text-xs text-white/80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(null, s)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors flex items-center gap-1"
                                >
                                    <Sparkles size={10} className="text-primary" />
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-primary transition-all placeholder-gray-500 shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/30 z-50 text-white group"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-pulse" />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-dark" />
                )}
            </motion.button>
        </>
    );
};

export default AIBot;

"use client";

import { useState, useEffect } from 'react';

export default function AccessCode({ darkMode, showText }: { darkMode: boolean; showText?: boolean }) {
    const [showPassword, setShowText] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const toggleShow = () => setShowText((prev) => !prev);

    useEffect(() => {
        // Trigger entrance animation after mount
        setIsVisible(true);
    }, []);

    return(
        <div className={`relative w-full max-w-xl transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full pr-16 px-6 py-4 ${showText ? 'text-2xl' : 'text-3xl sm:text-4xl'} border rounded-lg transition-colors duration-300 ${
                darkMode 
                    ? 'border-gray-800 bg-[#1a1a1a]/50 text-white placeholder-gray-400' 
                    : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
                } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500`}
                placeholder="Access Code"
            />
            <button
                type="button"
                onClick={toggleShow}
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${showText ? 'text-lg' : 'text-xl sm:text-2xl'} font-medium transition-colors duration-300 ${
                darkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
                } cursor-pointer`}
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    )
}
"use client";

import { useState } from 'react';

export default function AccessCode({ darkMode }: { darkMode: boolean }) {
    const [showText, setShowText] = useState(true);
    const toggleShow = () => setShowText((prev) => !prev);

    return(
        <div className="relative w-full max-w-xl">
            <input
                type={showText ? 'text' : 'password'}
                className={`w-full pr-16 px-6 py-4 text-2xl border rounded-lg ${darkMode ? 'border-gray-800 bg-[#1a1a1a]/50 text-white' : 'border-gray-200 bg-white/50 text-gray-900'} backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200`}
                placeholder="Access Code"
            />
            <button
                type="button"
                onClick={toggleShow}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors duration-200 cursor-pointer`}
            >
                {showText ? 'Hide' : 'Show'}
            </button>
        </div>
    )
}
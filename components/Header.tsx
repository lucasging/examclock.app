"use client";

import Settings from './Settings';

interface HeaderProps {
  darkMode: boolean;
  settings: {
    showAccessCode: boolean;
    showText: boolean;
    keepScreenOn: boolean;
    darkMode: boolean;
  };
  onToggle: (key: string, value: boolean) => void;
}

export default function Header({ darkMode, settings, onToggle }: HeaderProps) {
  return (
    <div className={`fixed top-0 left-0 w-full z-10 flex justify-between items-center px-6 py-4 gap-x-8 ${darkMode ? 'bg-[#1a1a1a]/80' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} shadow-sm`}>
      <div className="relative group">
        <button 
          className={`text-xl font-semibold tracking-tight transition-colors duration-200 cursor-pointer ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
          onClick={() => window.location.reload()}
        >
          examclock.app
        </button>
        <div 
          className={`absolute top-full left-0 mt-2 py-2 px-4 rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-35 ${
            darkMode 
              ? 'bg-[#1a1a1a] border-gray-800' 
              : 'bg-white border-gray-200'
          }`}
        >
          <a 
            href="https://github.com/lucasgingera/examclock.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block py-2 transition-colors duration-200 ${
              darkMode 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-900 hover:text-blue-600'
            }`}
          >
            GitHub
          </a>
          <div className={`py-2 ${
            darkMode 
              ? 'text-gray-400' 
              : 'text-gray-500'
          }`}>
            Made by Lucas Gingera
          </div>
        </div>
      </div>
      <Settings settings={settings} onToggle={onToggle}/>
    </div>
  );
} 
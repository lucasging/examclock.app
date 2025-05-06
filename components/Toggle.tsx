'use client';

import { useState } from 'react';

type ToggleProps = {
  label?: string;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  darkMode?: boolean;
};

export default function Toggle({ label, defaultChecked = false, onToggle, darkMode = false }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    onToggle?.(newValue);
  };

  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      {label && (
        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} group-hover:${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>
          {label}
        </span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="sr-only"
        />
        <div
          className={`w-12 h-6 rounded-full transition-all duration-300 ease-in-out ${
            checked 
              ? 'bg-blue-500' 
              : darkMode 
                ? 'bg-gray-700' 
                : 'bg-gray-200'
          }`}
        ></div>
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-all duration-300 ease-in-out ${
            checked ? 'translate-x-6' : ''
          } ${
            darkMode 
              ? 'bg-gray-100 shadow-gray-900/20' 
              : 'bg-white shadow-gray-400/20'
          } shadow-md`}
        ></div>
      </div>
    </label>
  );
}
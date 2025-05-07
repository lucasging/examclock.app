"use client";

import { useRef, useState, useEffect } from 'react';

interface InformationTextboxProps {
  darkMode: boolean;
  isVisible: boolean;
}

const useAutoResizeTextarea = (value: string, isVisible: boolean) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSize, setFontSize] = useState(24); // 24px = text-2xl
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Immediate resize when visibility changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !isVisible) return;
    
    // Set initial size immediately
    textarea.style.fontSize = '24px';
    textarea.style.height = 'auto';
    const maxHeight = parseInt(window.getComputedStyle(textarea).maxHeight);
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [isVisible]);

  // Handle content changes with debounce
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !isVisible) return;

    // Clear any pending timeout
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    // Debounce the resize operation
    resizeTimeoutRef.current = setTimeout(() => {
      // Start with maximum font size
      let currentFontSize = 24;
      textarea.style.fontSize = `${currentFontSize}px`;
      textarea.style.height = 'auto';

      const maxHeight = parseInt(window.getComputedStyle(textarea).maxHeight);
      
      // Binary search for the right font size
      let min = 12;
      let max = 24;
      
      while (min <= max) {
        currentFontSize = Math.floor((min + max) / 2);
        textarea.style.fontSize = `${currentFontSize}px`;
        textarea.style.height = 'auto';
        
        if (textarea.scrollHeight > maxHeight) {
          max = currentFontSize - 1;
        } else {
          min = currentFontSize + 1;
        }
      }
      
      // Use the largest font size that fits
      currentFontSize = max;
      if (currentFontSize < 12) currentFontSize = 12;
      if (currentFontSize > 24) currentFontSize = 24;
      
      textarea.style.fontSize = `${currentFontSize}px`;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
      setFontSize(currentFontSize);
    }, 100);

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [value, isVisible]);

  return { textareaRef, fontSize };
};

export default function InformationTextbox({ darkMode, isVisible }: InformationTextboxProps) {
  const [textContent, setTextContent] = useState('');
  const { textareaRef, fontSize } = useAutoResizeTextarea(textContent, isVisible);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure the transition happens after the display change
      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimated(false);
    }
  }, [isVisible]);

  return (
    <div className={`flex items-center justify-center ${isVisible ? "w-1/2" : "hidden"} p-8 h-full`}>
      <div className={`w-full transform transition-all duration-500 ${isAnimated ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
        <textarea
          ref={textareaRef}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Exam information (e.g. No leaving after 00:00 PM)"
          rows={5}
          cols={50}
          style={{ 
            fontSize: `${fontSize}px`,
            overflow: 'hidden',
            height: '50vh',
            minHeight: '200px',
            resize: 'vertical'
          }}
          className={`w-full max-w-2xl p-6 rounded-lg border transition-colors duration-300
            max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] xl:max-h-[70vh] 
            ${
            darkMode 
              ? 'border-gray-800 bg-[#1a1a1a]/50 text-white placeholder-gray-400' 
              : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
          } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500`}
        />
      </div>
    </div>
  );
} 
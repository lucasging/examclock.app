"use client";

import TimeDisplay from "@/components/TimeDisplay";
import AccessCode from "@/components/AccessCode";
import Header from "@/components/Header";

import { useRef, useState, useEffect } from 'react';
import NoSleep from 'nosleep.js';

const useAutoResizeTextarea = (value: string, isVisible: boolean) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Small delay to ensure the textarea is properly rendered
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }, 0);
    }
  }, [value, isVisible]);

  return textareaRef;
};

export default function Home() {
  const noSleepRef = useRef<NoSleep | null>(null);
  const [textContent, setTextContent] = useState('');

  const [settings, setSettings] = useState({
    showAccessCode: true,
    showText: false,
    keepScreenOn: false,
    darkMode: true,
  })

  const handleToggle = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }))

    if (key === "keepScreenOn") {
      if (!noSleepRef.current) {
        noSleepRef.current = new NoSleep();
      }
  
      if (value) {
        noSleepRef.current.enable();
      } else {
        noSleepRef.current.disable();
      }
    }
  }

  const textareaRef = useAutoResizeTextarea(textContent, settings.showText);
  
  return (
    <div className={`relative min-h-screen ${settings.darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      <Header darkMode={settings.darkMode} settings={settings} onToggle={handleToggle} />
      <main className={`min-h-screen flex ${settings.showText ? "flex-row" : "flex-col"} items-center justify-center pt-20`}>
        <div className={`flex items-center justify-center ${settings.showText ? "w-1/2" : "w-full"} flex-col items-center justify-center p-8 space-y-6`}>
          <TimeDisplay showSeconds={false} darkMode={settings.darkMode} showText={settings.showText} />
          {settings.showAccessCode && <AccessCode darkMode={settings.darkMode} />}
        </div>

        <div className={`flex items-center justify-center ${settings.showText ? "w-1/2" : "hidden"} p-8`}>
          <textarea
            ref={textareaRef}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Exam information (e.g. No leaving after 00:00 PM)"
            rows={5}
            cols={50}
            className={`w-full max-w-2xl p-6 text-2xl rounded-lg border overflow-hidden ${
              settings.darkMode 
                ? 'border-gray-800 bg-[#1a1a1a]/50 text-white placeholder-gray-400' 
                : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
            } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500`}
          />
        </div>
      </main>
    </div>
  );
}
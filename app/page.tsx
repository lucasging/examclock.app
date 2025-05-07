"use client";

import TimeDisplay from "@/components/TimeDisplay";
import AccessCode from "@/components/AccessCode";
import Header from "@/components/Header";
import InformationTextbox from "@/components/InformationTextbox";

import { useRef, useState } from 'react';
import NoSleep from 'nosleep.js';

export default function Home() {
  const noSleepRef = useRef<NoSleep | null>(null);

  const [settings, setSettings] = useState({
    showAccessCode: true,
    showText: false,
    keepScreenOn: false,
    darkMode: true,
    showSeconds: false,
  });

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
  
  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${settings.darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      <Header darkMode={settings.darkMode} settings={settings} onToggle={handleToggle} />
      <main className={`min-h-screen flex ${settings.showText ? "flex-row" : "flex-col"} items-center justify-center pt-20`}>
        <div className={`flex items-center justify-center ${settings.showText ? "w-1/2" : "w-full"} flex-col items-center justify-center p-8 space-y-6`}>
          <div className={`flex flex-col items-center transition-all duration-500 ${settings.showAccessCode ? '-translate-y-8' : 'translate-y-0'}`}>
            <TimeDisplay darkMode={settings.darkMode} showText={settings.showText} showSeconds={settings.showSeconds} />
          </div>
          {settings.showAccessCode && <AccessCode darkMode={settings.darkMode} showText={settings.showText} />}
        </div>

        <InformationTextbox 
          darkMode={settings.darkMode} 
          isVisible={settings.showText} 
        />
      </main>
    </div>
  );
}
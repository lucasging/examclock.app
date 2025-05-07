"use client";

import { useEffect, useState } from "react";

interface TimeDisplayProps {
    darkMode: boolean;
    showText: boolean;
    showSeconds?: boolean;
}

export default function TimeDisplay({ darkMode, showText, showSeconds = false }: TimeDisplayProps) {
    const [time, setTime] = useState(() => new Date());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isClient) return null;

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        ...(showSeconds && { second: "2-digit" })
    });

    // Remove the seconds if they're not needed (removes the extra space too)
    const displayTime = !showSeconds ? formattedTime : formattedTime;

    return (
        <div className="text-center w-full">
            <h1 className={`${
              showText 
                ? showSeconds
                    ? 'text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl' // With textbox and seconds
                    : 'text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl' // With textbox, no seconds
                : showSeconds
                    ? 'text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]' // No textbox, with seconds
                    : 'text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]' // No textbox, no seconds
            } font-bold tracking-tight whitespace-nowrap transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {displayTime}
            </h1>
        </div>
    )
}
"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay({ darkMode, showText }: { darkMode: boolean; showText: boolean }) {
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
        minute: "2-digit"
      });

    return (
        <div className="text-center w-full">
            <h1 className={`${showText ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl' : 'text-9xl'} font-bold tracking-tight whitespace-nowrap ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formattedTime}
            </h1>
        </div>
    )
}
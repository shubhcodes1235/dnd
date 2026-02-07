// src/lib/hooks/use-time-of-day.ts
"use client"

import { useState, useEffect } from 'react';

type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night';

export function useTimeOfDay() {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('morning');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const hour = new Date().getHours();

            if (hour >= 5 && hour < 12) {
                setTimePeriod('morning');
                setGreeting('Good morning! Ready to create?');
            } else if (hour >= 12 && hour < 17) {
                setTimePeriod('afternoon');
                setGreeting('Good afternoon! Keep the momentum going.');
            } else if (hour >= 17 && hour < 21) {
                setTimePeriod('evening');
                setGreeting('Good evening! Reflecting on the day?');
            } else {
                setTimePeriod('night');
                setGreeting('Burning the midnight oil? Stay inspired.');
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return { timePeriod, greeting };
}

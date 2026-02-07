// src/providers/theme-provider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '@/lib/db/database';
import { useLiveQuery } from 'dexie-react-hooks';

type Theme = 'sunrise' | 'midnight' | 'auto';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => Promise<void>;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const settings = useLiveQuery(() => db.appSettings.get('main'));
    const [theme, setThemeState] = useState<Theme>('auto');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (settings?.theme) {
            setThemeState(settings.theme as Theme);
        }
    }, [settings]);

    useEffect(() => {
        const updateResolvedTheme = () => {
            if (theme === 'midnight') {
                setResolvedTheme('dark');
            } else if (theme === 'sunrise') {
                setResolvedTheme('light');
            } else {
                // Auto theme based on time
                const hour = new Date().getHours();
                const isNight = hour >= 20 || hour < 6;
                setResolvedTheme(isNight ? 'dark' : 'light');
            }
        };

        updateResolvedTheme();

        // If it's auto, we might want to check every minute or hour
        const interval = setInterval(updateResolvedTheme, 60000);
        return () => clearInterval(interval);
    }, [theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
    }, [resolvedTheme]);

    const setTheme = async (newTheme: Theme) => {
        await db.appSettings.update('main', { theme: newTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isDark: resolvedTheme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

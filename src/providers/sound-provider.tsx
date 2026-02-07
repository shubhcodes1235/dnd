// src/providers/sound-provider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Howl } from 'howler';
import { db } from '@/lib/db/database';
import { useLiveQuery } from 'dexie-react-hooks';

interface SoundContextType {
    playSound: (soundName: string) => void;
    toggleSound: () => void;
    soundEnabled: boolean;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const settings = useLiveQuery(() => db.appSettings.get('main'));
    const [soundEnabled, setSoundEnabled] = useState(true);

    useEffect(() => {
        if (settings) {
            setSoundEnabled(settings.soundEnabled);
        }
    }, [settings]);

    // Preload sounds (placeholders for now)
    const sounds: Record<string, Howl> = {
        click: new Howl({ src: ['/sounds/click.mp3'], volume: 0.5 }),
        upload: new Howl({ src: ['/sounds/upload.mp3'], volume: 0.6 }),
        celebration: new Howl({ src: ['/sounds/celebration.mp3'], volume: 0.7 }),
        pop: new Howl({ src: ['/sounds/pop.mp3'], volume: 0.4 }),
    };

    const playSound = (soundName: string) => {
        if (soundEnabled && sounds[soundName]) {
            sounds[soundName].play();
        }
    };

    const toggleSound = async () => {
        const newStatus = !soundEnabled;
        await db.appSettings.update('main', { soundEnabled: newStatus });
        setSoundEnabled(newStatus);
    };

    return (
        <SoundContext.Provider value={{ playSound, toggleSound, soundEnabled }}>
            {children}
        </SoundContext.Provider>
    );
}

export const useSound = () => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};

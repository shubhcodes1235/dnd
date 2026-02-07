// src/lib/store/mood-store.ts
import { create } from 'zustand';

type Mood = 'design' | 'vibe' | 'lost' | null;

interface MoodState {
    sessionMood: Mood;
    setMood: (mood: Mood) => void;
    resetMood: () => void;
}

export const useMoodStore = create<MoodState>((set) => ({
    sessionMood: null,
    setMood: (mood) => set({ sessionMood: mood }),
    resetMood: () => set({ sessionMood: null }),
}));

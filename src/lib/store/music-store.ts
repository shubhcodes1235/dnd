// src/lib/store/music-store.ts
import { create } from 'zustand';

interface MusicState {
    isPlaying: boolean;
    currentTrack: string | null;
    volume: number;
    toggle: () => void;
    play: (track: string) => void;
    pause: () => void;
    setVolume: (volume: number) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
    isPlaying: false,
    currentTrack: null,
    volume: 0.5,
    toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),
    play: (track) => set({ isPlaying: true, currentTrack: track }),
    pause: () => set({ isPlaying: false }),
    setVolume: (volume) => set({ volume }),
}));

// src/lib/store/theme-store.ts
import { create } from 'zustand';

type ThemeMode = 'sunrise' | 'midnight' | 'auto';

interface ThemeState {
    currentTheme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    currentTheme: 'sunrise',
    setTheme: (theme) => set({ currentTheme: theme }),
}));

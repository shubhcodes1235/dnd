// src/lib/store/app-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
    currentPerson: 'shubham' | 'khushi' | 'both';
    isFirstVisit: boolean;
    setCurrentPerson: (person: 'shubham' | 'khushi' | 'both') => void;
    setFirstVisit: (isFirst: boolean) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            currentPerson: 'shubham',
            isFirstVisit: true,
            setCurrentPerson: (person) => set({ currentPerson: person }),
            setFirstVisit: (isFirst) => set({ isFirstVisit: isFirst }),
        }),
        {
            name: 'dream-design-app-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

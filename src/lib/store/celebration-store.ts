// src/lib/store/celebration-store.ts
import { create } from 'zustand';

type CelebrationType = 'upload' | 'streak' | 'income' | 'first-upload' | 'milestone' | null;

interface CelebrationState {
    isActive: boolean;
    celebrationType: CelebrationType;
    triggerCelebration: (type: CelebrationType) => void;
    dismissCelebration: () => void;
}

export const useCelebrationStore = create<CelebrationState>((set) => ({
    isActive: false,
    celebrationType: null,
    triggerCelebration: (type) => set({ isActive: true, celebrationType: type }),
    dismissCelebration: () => set({ isActive: false, celebrationType: null }),
}));

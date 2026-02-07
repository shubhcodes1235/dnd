// src/lib/store/navigation-store.ts
import { create } from 'zustand';

interface NavigationState {
    currentPage: string;
    previousPage: string | null;
    setCurrentPage: (page: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    currentPage: '/',
    previousPage: null,
    setCurrentPage: (page) => set((state) => ({
        previousPage: state.currentPage,
        currentPage: page
    })),
}));

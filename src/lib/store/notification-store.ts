// src/lib/store/notification-store.ts
import { create } from 'zustand';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: Date;
}

interface NotificationState {
    unreadCount: number;
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
    markRead: (id: string) => void;
    clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    unreadCount: 0,
    notifications: [],
    addNotification: (n) => {
        const newNotification: Notification = {
            ...n,
            id: Math.random().toString(36).substring(7),
            isRead: false,
            createdAt: new Date(),
        };
        set((state) => ({
            notifications: [newNotification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
        }));
    },
    markRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
    })),
    clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));

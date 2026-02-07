// src/providers/notification-provider.tsx
'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    // Define default options
                    className: 'font-sans rounded-2xl border-2 border-pink-100 shadow-soft',
                    duration: 4000,
                    style: {
                        background: 'var(--card)',
                        color: 'var(--foreground)',
                    },
                    // Custom success/error styles
                    success: {
                        iconTheme: {
                            primary: '#FF69B4',
                            secondary: 'white',
                        },
                    },
                }}
            />
        </>
    );
}

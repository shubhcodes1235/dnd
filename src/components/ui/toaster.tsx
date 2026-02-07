// src/components/ui/toaster.tsx
'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => {
    return (
        <HotToaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                className: 'font-sans rounded-2xl border-2 border-pink-100 shadow-soft bg-white text-night-900',
                duration: 4000,
                success: {
                    iconTheme: {
                        primary: '#FF69B4',
                        secondary: 'white',
                    },
                },
            }}
        />
    );
};

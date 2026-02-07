// src/lib/hooks/use-image-compression.ts
"use client"

import imageCompression from 'browser-image-compression';

export function useImageCompression() {
    const compressImage = async (file: File, maxSizeMB: number = 1) => {
        const options = {
            maxSizeMB: maxSizeMB,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error('Compression failed:', error);
            return file;
        }
    };

    const createThumbnail = async (file: File) => {
        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 400,
            useWebWorker: true,
        };
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error('Thumbnail creation failed:', error);
            return file;
        }
    };

    return { compressImage, createThumbnail };
}

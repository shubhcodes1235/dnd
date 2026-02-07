// src/lib/store/upload-store.ts
import { create } from 'zustand';

interface UploadState {
    selectedFile: File | null;
    tool: string;
    mood: number;
    tags: string[];
    description: string;
    title: string;
    isUploading: boolean;

    setSelectedFile: (file: File | null) => void;
    setTool: (tool: string) => void;
    setMood: (mood: number) => void;
    setTags: (tags: string[]) => void;
    setDescription: (desc: string) => void;
    setTitle: (title: string) => void;
    setUploading: (uploading: boolean) => void;
    resetUpload: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
    selectedFile: null,
    tool: 'photoshop',
    mood: 3,
    tags: [],
    description: '',
    title: '',
    isUploading: false,

    setSelectedFile: (file) => set({ selectedFile: file }),
    setTool: (tool) => set({ tool }),
    setMood: (mood) => set({ mood }),
    setTags: (tags) => set({ tags }),
    setDescription: (description) => set({ description }),
    setTitle: (title) => set({ title }),
    setUploading: (isUploading) => set({ isUploading }),
    resetUpload: () => set({
        selectedFile: null,
        tool: 'photoshop',
        mood: 3,
        tags: [],
        description: '',
        title: '',
        isUploading: false,
    }),
}));

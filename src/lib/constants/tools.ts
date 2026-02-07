// src/lib/constants/tools.ts
import { PenTool, Layers, Layout, Video, MousePointer2 } from "lucide-react";

export const TOOLS = [
    { id: 'photoshop', name: 'Photoshop', icon: PenTool, color: '#31A8FF' },
    { id: 'illustrator', name: 'Illustrator', icon: Layers, color: '#FF9A00' },
    { id: 'figma', name: 'Figma', icon: Layout, color: '#F24E1E' },
    { id: 'aftereffects', name: 'After Effects', icon: Video, color: '#9999FF' },
    { id: 'other', name: 'Other', icon: MousePointer2, color: '#FF69B4' },
] as const;

export type ToolId = typeof TOOLS[number]['id'];

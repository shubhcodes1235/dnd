// src/components/ui/typing-animation.tsx
"use client"

import { TypeAnimation } from 'react-type-animation';
import { cn } from "@/lib/utils/cn";

interface TypingAnimationProps {
    sequence: (string | number | ((element: HTMLElement | null) => void | Promise<void>))[];
    className?: string;
    repeat?: number;
}

export function TypingAnimation({ sequence, className, repeat = Infinity }: TypingAnimationProps) {
    return (
        <TypeAnimation
            sequence={sequence}
            wrapper="span"
            speed={50}
            repeat={repeat}
            className={className}
        />
    );
}

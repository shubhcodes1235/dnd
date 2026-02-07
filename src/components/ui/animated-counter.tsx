// src/components/ui/animated-counter.tsx
"use client"

import CountUp from 'react-countup';
import { cn } from "@/lib/utils/cn";

interface AnimatedCounterProps {
    end: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    className?: string;
}

export function AnimatedCounter({ end, prefix, suffix, decimals = 0, className }: AnimatedCounterProps) {
    return (
        <CountUp
            end={end}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            duration={2}
            className={cn("font-bold text-pink-600", className)}
        />
    );
}

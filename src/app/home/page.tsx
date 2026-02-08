// src/app/home/page.tsx
"use client"

import React from "react"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { ManifestationQuote } from "@/components/home/manifestation-quote"
import { TeamStreakCounter } from "@/components/home/team-streak-counter"
import { DreamProgressBar } from "@/components/home/dream-progress-bar"
import { QuickStats } from "@/components/home/quick-stats"
import { TodayPrompt } from "@/components/home/today-prompt"
import { WinOfTheDay } from "@/components/home/win-of-the-day"
import { UsMoment } from "@/components/home/us-moment"
import { PartnerFeed } from "@/components/home/partner-feed"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store/app-store"
import { cn } from "@/lib/utils/cn"

export default function HomePage() {
    const { currentPerson } = useAppStore()
    const [showSecondary, setShowSecondary] = useState(false);
    const [showDeep, setShowDeep] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowSecondary(true), 300);
        const timer2 = setTimeout(() => setShowDeep(true), 800);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // Configuration for Content
    const isKhushi = currentPerson === 'khushi'
    const isBoth = currentPerson === 'both'
    const isShubham = currentPerson === 'shubham'

    const heroHeadline = isKhushi ? "You've got this." : isBoth ? "Two tired people.\nOne big dream." : "Make it count."
    const heroSubtext = isKhushi ? "Even on busy days, you're moving forward." : isBoth ? "Still figuring it out. Still showing up." : "Your journey starts today."

    // For Hero CTA
    const ctaText = isKhushi ? "Capture this moment 💗" : isBoth ? "Chal chal chal — Let's Go" : "Start Today's Design"

    // For Footer
    const footerQuote = isKhushi ? "\"You are enough, even on slow days.\"" : "\"Build together. Grow together. Never settle.\""

    // Grid Card Configuration
    // Slot 1: Growth/Streak (Shubham/Both) vs Us Moment/Support (Khushi)
    const showStreak = isShubham || isBoth;

    // Slot 2: Reflection/Win (Everyone)
    // Label
    const reflectionLabel = isKhushi ? "Reflection" : "Self-Love"
    // Label for Slot 1
    const slot1Label = isKhushi ? "My People" : isBoth ? "Our Streak" : "Growth"


    return (
        <PageWrapper className="flex flex-col items-center max-w-5xl mx-auto space-y-12 pt-8 pb-16">

            {/* 1. HERO SECTION: Unified & Work-First */}
            <section className="w-full flex flex-col items-center text-center space-y-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {isBoth && (
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl">🤪</span>
                    </div>
                )}

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-night-950 tracking-tightest leading-tight whitespace-pre-line">
                        {heroHeadline}
                    </h1>
                    <p className={cn("font-bold tracking-widest text-xs uppercase", isKhushi ? "text-pink-400 opacity-90" : "text-night-400")}>
                        {heroSubtext}
                    </p>
                </div>

                <div className="pt-2">
                    <Link href="/upload">
                        <Button size="lg" className={cn(
                            "rounded-[2rem] h-20 px-12 text-xl shadow-xl transition-all border-none font-black tracking-tight group hover:scale-[1.02]",
                            isKhushi ? "bg-pink-100 hover:bg-pink-200 text-pink-900" : "bg-night-950 hover:bg-night-900 text-white"
                        )}>
                            {ctaText}
                            {!isKhushi && (
                                <div className="ml-3 bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            )}
                        </Button>
                    </Link>
                </div>
            </section>

            {/* 1.5 Progress Bar for Everyone */}
            {showSecondary && (
                <section className="w-full max-w-4xl mx-auto animate-in fade-in duration-500 delay-200">
                    <DreamProgressBar />
                </section>
            )}

            {/* 2. CORE WORKSPACE GRID (Identical Layout, Different Content) */}
            {showSecondary && (
                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500 max-w-4xl mx-auto">

                    {/* CARD 1: Context/Support */}
                    <div className="relative group">
                        <div className={cn("absolute -top-3 left-6 z-10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm",
                            isKhushi ? "bg-blue-400" : "bg-indigo-500"
                        )}>
                            {slot1Label}
                        </div>
                        {isKhushi ? (
                            <UsMoment />
                        ) : (
                            <TeamStreakCounter />
                        )}
                    </div>

                    {/* CARD 2: Reflection/Win */}
                    <div className="relative group">
                        <div className="absolute -top-3 left-6 z-10 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                            {reflectionLabel}
                        </div>
                        <WinOfTheDay minimal={isKhushi} />
                    </div>

                </section>
            )}

            {/* 3. PARTNER FEED (Real-time updates) */}
            {showSecondary && (
                <section className="w-full max-w-4xl mx-auto animate-in fade-in duration-700 delay-300">
                    <PartnerFeed />
                </section>
            )}

            {/* 4. OPTIONAL NUDGE (If needed, keep it subtle) */}
            {showDeep && !isKhushi && (
                <section className="max-w-xl mx-auto animate-in fade-in duration-700">
                    <TodayPrompt />
                </section>
            )}

            {/* 5. FOOTER: The Why */}
            <section className="w-full pt-12 border-t border-primary/10 animate-in fade-in duration-1000">
                <div className="text-center space-y-4">
                    <p className="font-handwritten text-xl text-night-700 italic opacity-80">
                        {footerQuote}
                    </p>

                    {/* Subtle Badge */}
                    <div className="flex items-center justify-center space-x-2 opacity-40">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-night-300">
                            😄 Chal chal chal — two tired humans, one big dream.
                        </span>
                    </div>
                </div>
            </section>

        </PageWrapper>
    )
}

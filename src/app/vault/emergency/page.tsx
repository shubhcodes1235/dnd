// src/app/vault/emergency/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ShieldCheck, Flame, Zap, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

const PUNCHY_PHRASES = [
    "Abhi nahi toh kabhi nahi!",
    "Aukat dikhani hai na?",
    "Comfort zone is where dreams go to die.",
    "You're crying? GOOD. Use that fire to design.",
    "Nobody is coming to save you. Save yourself.",
    "Duniya ko galat sabit karna hai.",
    "One more pixel. One more layer. Just one more.",
    "The only way out is THROUGH.",
]

export default function EmergencyPage() {
    const router = useRouter()
    const [activePhrase, setActivePhrase] = useState(0)
    const [shaking, setShaking] = useState(false)

    const handleNext = () => {
        setShaking(true)
        setTimeout(() => setShaking(false), 500)
        if (activePhrase < PUNCHY_PHRASES.length - 1) {
            setActivePhrase(p => p + 1)
        } else {
            setActivePhrase(0)
        }
    }

    return (
        <div className="min-h-screen bg-night-950 flex items-center justify-center p-6 overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={activePhrase}
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)',
                        x: shaking ? [0, -20, 20, -20, 20, 0] : 0
                    }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                    className="text-center space-y-12 max-w-2xl"
                >
                    <div className="flex justify-center space-x-4">
                        <Zap className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-pulse" />
                        <Flame className="w-12 h-12 text-red-500 fill-red-500 animate-bounce" />
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none select-none">
                        {PUNCHY_PHRASES[activePhrase]}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Button
                            size="lg"
                            variant="danger"
                            className="w-full md:w-auto px-12 h-20 text-2xl rounded-4xl shadow-glow"
                            onClick={handleNext}
                        >
                            PUNCH ME AGAIN
                        </Button>
                        <Button
                            size="lg"
                            variant="ghost"
                            className="text-white/40 hover:text-white"
                            onClick={() => router.push('/upload')}
                        >
                            Go create something. NOW.
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent" />
            </div>
        </div>
    )
}

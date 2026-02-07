// src/app/page.tsx
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store/app-store"
import { useMoodStore } from "@/lib/store/mood-store"
import { useRouter } from "next/navigation"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTimeOfDay } from "@/lib/hooks/use-time-of-day"
import { db } from "@/lib/db/database"
import { cn } from "@/lib/utils/cn"

export default function EntryPage() {
  const router = useRouter()
  const { setCurrentPerson } = useAppStore()
  const { setMood } = useMoodStore()
  const { greeting } = useTimeOfDay()

  const [step, setStep] = useState<'person' | 'mood'>('person')

  const handlePersonSelect = async (person: 'shubham' | 'khushi') => {
    setCurrentPerson(person)
    await db.appSettings.update('main', { currentPerson: person })
    setStep('mood')
  }

  const handleMoodSelect = (mood: 'design' | 'vibe' | 'lost') => {
    setMood(mood)
    if (mood === 'lost') {
      router.push('/reassurance')
    } else {
      router.push('/home')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden grain-texture transition-colors duration-700">
      {/* Background Atmosphere - Dreamy Vibrant Blobs */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-plum-700/30 dark:bg-plum-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-pink-500/20 dark:bg-pink-600/10 rounded-full blur-[140px] animate-pulse animate-float" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gold-300/10 dark:bg-gold-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-2xl text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-pink-600 dark:text-gold-400 text-xs md:text-sm font-bold tracking-[0.25em] uppercase opacity-90 transition-colors duration-300">
            {greeting}
          </h2>
          <div className="text-5xl md:text-7xl text-gray-800 dark:text-white font-bold tracking-handwritten transition-colors duration-300 drop-shadow-sm">
            <TypingAnimation
              sequence={["Hey! Kaise ho?", 1000, "Chal, chal, chal!", 2000]}
              repeat={Infinity}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'person' ? (
            <motion.div
              key="person-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-black text-pink-500 dark:text-pink-100 italic transition-colors duration-300 tracking-tight">Chal chal chal — who is starting us off?</h3>
                <p className="text-night-400 dark:text-plum-400 text-sm font-bold opacity-80 uppercase tracking-widest transition-colors duration-300">
                  Together we build, one step at a time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {[
                  { id: 'shubham', name: 'Shubham', emoji: '👦', bg: 'bg-blue-100/60', sub: 'Ready to build' },
                  { id: 'khushi', name: 'Khushi', emoji: '👧', bg: 'bg-pink-100/60', sub: 'Ready to dream' }
                ].map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1), duration: 0.6 }}
                  >
                    <Card
                      className="cursor-pointer group relative overflow-hidden glass border border-white/40 dark:border-pink-500/30 dark:bg-plum-800/30 shadow-2xl hover:shadow-glow hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem]"
                      onClick={() => handlePersonSelect(p.id as 'shubham' | 'khushi')}
                    >
                      <CardContent className="p-10 flex flex-col items-center space-y-6">
                        <div className={cn("w-28 h-28 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 shadow-xl border-4 border-white/50", p.bg)}>
                          {p.emoji}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-2xl font-black tracking-tight text-night-800 dark:text-pink-50">{p.name}</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-night-400">{p.sub}</span>
                        </div>

                        {/* Subtle other person presence */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-xs bg-white/80 px-2 py-1 rounded-full shadow-sm text-night-400 font-bold flex items-center gap-1">
                            + {p.id === 'shubham' ? 'Khushi' : 'Shubham'} <span className="text-[8px] opacity-60">waiting</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mood-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-pink-500 dark:text-pink-400 font-bold text-xl tracking-tight"
                >
                  Welcome back, {useAppStore.getState().currentPerson === 'shubham' ? 'Shubham 🌱' : 'Khushi 💖'}
                </motion.h4>
                <h3 className="text-3xl md:text-5xl font-handwritten text-gray-800 dark:text-white transition-colors duration-300">Are you in the mood to design?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'design', icon: '🎨', title: "Let's create!", desc: 'Workspace mode.', border: 'border-white/20' },
                  { id: 'vibe', icon: '😌', title: "Just vibing", desc: 'Comfort mode.', border: 'border-white/20' },
                  { id: 'lost', icon: '💭', title: "Feeling lost", desc: 'Need a push.', border: 'border-white/20' }
                ].map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 * (i + 1) }}
                    className="h-full"
                  >
                    <Card
                      hover
                      onClick={() => handleMoodSelect(m.id as any)}
                      className={cn("cursor-pointer glass border-b-4 border-b-pink-400 h-full hover:shadow-glow transition-all duration-300", m.border)}
                    >
                      <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                        <div className="text-4xl">{m.icon}</div>
                        <h4 className="font-bold text-lg text-gray-800 dark:text-pink-50 leading-tight">{m.title}</h4>
                        <p className="text-sm text-night-400 dark:text-pink-200/60 leading-relaxed font-medium">{m.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() => setStep('person')}
                className="text-pink-500 hover:text-pink-600 hover:bg-white/50 dark:hover:bg-plum-800/50 rounded-2xl px-10 transition-all font-semibold"
              >
                Wait, it's not me!
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

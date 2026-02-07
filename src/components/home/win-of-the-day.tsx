// src/components/home/win-of-the-day.tsx
"use client"

import React, { useState } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db/database"
import { winsRepo } from "@/lib/db/repositories/wins.repo"
import { useAppStore } from "@/lib/store/app-store"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle2, PartyPopper } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/providers/sound-provider"

export function WinOfTheDay({ minimal = false }: { minimal?: boolean }) {
    const { currentPerson } = useAppStore()
    const { playSound } = useSound()
    const today = new Date().toISOString().split('T')[0]

    // Use a simpler query or state if needed, but keeping it same for now.
    // Actually, hook rules must be at top level.
    const [content, setContent] = useState("")

    // We can't use live query conditionally.
    // But we can just use the repo directly if needed, or stick to this.
    // winsRepo is not a hook, so we need useLiveQuery wrapper? Yes.
    // Wait, the original code had: const todayWin = useLiveQuery(() => winsRepo.getWinByDate(today, currentPerson))
    // This is fine.

    const todayWin = useLiveQuery(() => winsRepo.getWinByDate(today, currentPerson))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        await winsRepo.addWin({
            person: currentPerson,
            content: content.trim(),
            date: today
        })
        playSound('pop') // Ensure this sound exists or remove if causing 404
        setContent("")
    }

    if (minimal) {
        return (
            <div className="w-full max-w-sm mx-auto space-y-3">
                <AnimatePresence mode="wait">
                    {todayWin ? (
                        <motion.div
                            key="win-saved-min"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/40 p-4 rounded-2xl flex items-center justify-center space-x-2 text-pink-600 border border-pink-100/50"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm font-bold italic">"{todayWin.content}"</span>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="win-form-min"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col space-y-3"
                        >
                            <Input
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="What was a small win today?"
                                className="text-center rounded-xl h-10 bg-white/30 border-none focus-visible:ring-pink-200 placeholder:text-night-300/60 text-sm"
                            />
                            {content.trim() && (
                                <Button type="submit" size="sm" variant="ghost" className="text-pink-400 hover:text-pink-600 hover:bg-transparent h-auto py-1 px-4 text-xs font-black uppercase tracking-widest">
                                    Save
                                </Button>
                            )}
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <Card className="border-none bg-white shadow-soft rounded-[2.5rem] overflow-hidden group hover:shadow-glow transition-all duration-500">
            <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-2xl bg-orange-100 text-orange-600 shadow-sm transition-transform group-hover:rotate-12">
                        <Trophy className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="relative">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-night-400 font-bold opacity-70">Reflection</span>
                        <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-primary/30 rounded-full" />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {todayWin ? (
                        <motion.div
                            key="win-saved"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start space-x-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0 border border-pink-100 shadow-sm transition-transform group-hover:rotate-12">
                                <PartyPopper className="w-6 h-6 text-pink-500" />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-night-800 font-bold text-lg leading-tight tracking-tight italic">"{todayWin?.content}"</p>
                                <div className="flex items-center text-[10px] text-pink-500 font-black uppercase tracking-widest">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Moment Logged
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="win-form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-5"
                        >
                            <h3 className="text-xl font-bold text-night-800 leading-tight">What was a small win today?</h3>
                            <div className="flex space-x-2">
                                <Input
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Even opening this site counts..."
                                    className="rounded-2xl h-14 bg-pink-50/30 border-none focus-visible:ring-pink-200 placeholder:text-night-200"
                                />
                                <Button type="submit" className="rounded-2xl h-14 px-8 shadow-glow bg-pink-500 hover:bg-pink-600 border-none transition-all">
                                    Log
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}

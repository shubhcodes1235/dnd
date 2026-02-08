
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToDesigns, Design } from "@/lib/firebase/services/designs"; // Function we just added
import { useAppStore } from "@/lib/store/app-store";
import { Heart, Flame, Star, Zap } from "lucide-react";
import { addReactionToFirebase } from "@/lib/firebase/services/designs";

const REACTIONS = [
    { emoji: "🔥", label: "Fire", icon: Flame, color: "text-orange-400" },
    { emoji: "❤️", label: "Love", icon: Heart, color: "text-red-400" },
    { emoji: "⭐", label: "Star", icon: Star, color: "text-yellow-400" },
    { emoji: "💯", label: "Perfect", icon: Zap, color: "text-blue-400" },
];

export function PartnerFeed() {
    const { currentPerson } = useAppStore();
    const [designs, setDesigns] = useState<Design[]>([]); // Use the Design type from service
    const [loading, setLoading] = useState(true);

    // If I am Shubham, I want to see Khushi's designs.
    // If I am Khushi, I want to see Shubham's designs.
    // If 'both', show all?
    const targetPersona = currentPerson === 'shubham' ? 'khushi' : currentPerson === 'khushi' ? 'shubham' : undefined;

    useEffect(() => {
        const unsubscribe = subscribeToDesigns((data) => {
            setDesigns(data);
            setLoading(false);
        }, targetPersona as 'shubham' | 'khushi' | undefined);

        return () => unsubscribe();
    }, [targetPersona]);

    const handleReaction = async (designId: string, emoji: string) => {
        await addReactionToFirebase(designId, emoji, currentPerson);
    };

    if (loading) return <div className="p-8 text-center text-white/50">Loading updates...</div>;

    return (
        <div className="space-y-8 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-white/90 mb-6">
                {targetPersona ? `${targetPersona.charAt(0).toUpperCase() + targetPersona.slice(1)}'s Latest` : "Latest Updates"}
            </h2>

            {designs.length === 0 ? (
                <div className="text-center p-12 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-white/50">No updates yet! Time to create something? ✨</p>
                </div>
            ) : (
                <div className="grid gap-8">
                    {designs.map((design, i) => (
                        <motion.div
                            key={design.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl"
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={design.imageUrl}
                                    alt={design.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {design.tool}
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{design.title}</h3>
                                    {design.description && <p className="text-white/60 text-sm mt-1">{design.description}</p>}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {design.tags?.map(tag => (
                                        <span key={tag} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">#{tag}</span>
                                    ))}
                                </div>

                                {/* Reactions Bar */}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    {REACTIONS.map((r) => {
                                        const count = design.reactions?.filter(x => x.emoji === r.emoji).length || 0;
                                        const userReacted = design.reactions?.some(x => x.emoji === r.emoji && x.byPersona === currentPerson);

                                        return (
                                            <button
                                                key={r.emoji}
                                                onClick={() => handleReaction(design.id, r.emoji)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${userReacted ? 'bg-white/20 ring-1 ring-white/40' : 'bg-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                <span className="text-lg">{r.emoji}</span>
                                                {count > 0 && <span className="text-xs font-bold text-white/70">{count}</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

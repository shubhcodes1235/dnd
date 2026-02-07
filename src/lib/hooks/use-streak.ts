// src/lib/hooks/use-streak.ts
"use client"

import { useLiveQuery } from "dexie-react-hooks";
import { streaksRepo } from "@/lib/db/repositories/streaks.repo";

export function useStreak() {
    const streakData = useLiveQuery(() => streaksRepo.getStreakData());

    return {
        currentStreak: streakData?.currentStreak || 0,
        longestStreak: streakData?.longestStreak || 0,
        totalActiveDays: streakData?.totalActiveDays || 0,
        lastActiveDate: streakData?.lastActiveDate,
        recordToday: streaksRepo.recordActivity.bind(streaksRepo),
    };
}

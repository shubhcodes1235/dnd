// src/lib/db/repositories/streaks.repo.ts
import { db } from "../database";
import { StreakData } from "../schemas";

export const streaksRepo = {
    async getStreakData() {
        return await db.streakData.get('main-streak');
    },

    async recordActivity(person: 'shubham' | 'khushi') {
        const today = new Date().toISOString().split('T')[0];
        const streak = await this.getStreakData();

        if (!streak) return;

        const lastDate = streak.lastActiveDate;
        const history = [...streak.streakHistory];
        const todayEntryIndex = history.findIndex(h => h.date === today);

        if (todayEntryIndex > -1) {
            if (!history[todayEntryIndex].persons.includes(person)) {
                history[todayEntryIndex].persons.push(person);
            }
        } else {
            history.push({ date: today, persons: [person] });
        }

        let newCurrentStreak = streak.currentStreak;

        // Simple logic: if today is the day after lastDate, continue streak.
        // If today is same as lastDate, no change.
        // If today is more than 1 day after lastDate, reset streak (but check if someone else active)

        const d1 = new Date(lastDate);
        const d2 = new Date(today);
        const diffDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            newCurrentStreak += 1;
        } else if (diffDays > 1) {
            newCurrentStreak = 1;
        }

        const newLongest = Math.max(streak.longestStreak, newCurrentStreak);
        const totalDays = streak.totalActiveDays + (todayEntryIndex === -1 ? 1 : 0);

        return await db.streakData.update('main-streak', {
            currentStreak: newCurrentStreak,
            longestStreak: newLongest,
            lastActiveDate: today,
            totalActiveDays: totalDays,
            streakHistory: history.slice(-30), // Keep last 30 days in history for UI
        });
    },

    async calculateCurrentStreak() {
        const streak = await this.getStreakData();
        return streak?.currentStreak || 0;
    }
};

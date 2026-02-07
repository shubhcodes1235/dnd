// src/lib/db/repositories/wins.repo.ts
import { db } from "../database";
import { DailyWin } from "../schemas";
import { nanoid } from "nanoid";

export const winsRepo = {
    async addWin(winData: Omit<DailyWin, 'id' | 'createdAt'>) {
        const win: DailyWin = {
            ...winData,
            id: nanoid(),
            createdAt: new Date(),
        };
        return await db.dailyWins.add(win);
    },

    async getWinsByDate(date: string) {
        return await db.dailyWins.where('date').equals(date).toArray();
    },

    async getWinsByPerson(person: 'shubham' | 'khushi') {
        return await db.dailyWins.where('person').equals(person).reverse().toArray();
    },

    async getAllWins() {
        return await db.dailyWins.orderBy('createdAt').reverse().toArray();
    },

    async getWinByDate(date: string, person: 'shubham' | 'khushi') {
        return await db.dailyWins
            .where('date')
            .equals(date)
            .and(w => w.person === person)
            .first();
    }
};

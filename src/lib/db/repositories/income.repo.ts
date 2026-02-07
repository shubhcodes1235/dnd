// src/lib/db/repositories/income.repo.ts
import { db } from "../database";
import { Income } from "../schemas";
import { nanoid } from "nanoid";

export const incomeRepo = {
    async addIncome(incomeData: Omit<Income, 'id' | 'createdAt'>) {
        const income: Income = {
            ...incomeData,
            id: nanoid(),
            createdAt: new Date(),
        };
        return await db.income.add(income);
    },

    async getAllIncome() {
        return await db.income.orderBy('date').reverse().toArray();
    },

    async getTotalIncome() {
        const all = await db.income.toArray();
        return all.reduce((sum, item) => sum + item.amount, 0);
    },

    async getIncomeByPerson(person: 'shubham' | 'khushi') {
        return await db.income.where('person').equals(person).reverse().toArray();
    }
};

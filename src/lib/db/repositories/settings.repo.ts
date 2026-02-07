// src/lib/db/repositories/settings.repo.ts
import { db } from "../database";
import { AppSettings } from "../schemas";

export const settingsRepo = {
    async getSettings() {
        return await db.appSettings.get('main');
    },

    async updateSettings(data: Partial<AppSettings>) {
        return await db.appSettings.update('main', { ...data, updatedAt: new Date() });
    },

    async setPerson(person: 'shubham' | 'khushi') {
        return await this.updateSettings({ currentPerson: person });
    }
};

// src/lib/db/repositories/skills.repo.ts
import { db } from "../database";
import { Skill } from "../schemas";

export const skillsRepo = {
    async getAllSkills() {
        return await db.skills.toArray();
    },

    async unlockSkill(id: string) {
        return await db.skills.update(id, {
            isUnlocked: true,
            unlockedDate: new Date()
        });
    },

    async updateSkillLevel(id: string, level: number) {
        return await db.skills.update(id, { level });
    },

    async getSkillsByCategory(category: string) {
        return await db.skills.where('category').equals(category).toArray();
    }
};

// src/lib/db/repositories/milestones.repo.ts
import { db } from "../database";
import { Milestone } from "../schemas";

export const milestonesRepo = {
    async getAllMilestones() {
        return await db.milestones.orderBy('stage').toArray();
    },

    async completeMilestone(id: string, note?: string) {
        return await db.milestones.update(id, {
            isCompleted: true,
            completedDate: new Date(),
            completionNote: note
        });
    },

    async getMilestoneProgress() {
        const total = await db.milestones.count();
        const completed = await db.milestones.where('isCompleted').equals(1).count();
        return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
    },

    async updateMilestone(id: string, data: Partial<Milestone>) {
        return await db.milestones.update(id, data);
    }
};

import { db } from "./database";
import { AppSettings, Milestone, Skill, LearningNote } from "./schemas";
import { nanoid } from "nanoid";

export const DefaultManifestationQuote = `Small steps are still steps. Start when you're ready.`;

export const DefaultWhyStatement = `
We started this journey because we refused to settle for ordinary. 
We believe that creativity is our superpower and discipline is our weapon.
We build this together, support each other, and grow 1% every single day.
`;

export const DefaultMilestones: Milestone[] = [
    {
        id: nanoid(),
        title: "The Seed",
        description: "Upload your first design. Plant the seed of greatness.",
        emoji: "🌱",
        stage: 1,
        isCompleted: false,
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        title: "First Sprout",
        description: "Complete a 7-day streak. Consistency is water.",
        emoji: "🌿",
        stage: 2,
        isCompleted: false,
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        title: "Growing Strong",
        description: "Earn your first ₹1,000 from design. Validation.",
        emoji: "🌳",
        stage: 3,
        isCompleted: false,
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        title: "In Bloom",
        description: "Complete 30 days of consistent creation or reach ₹10k income.",
        emoji: "🌸",
        stage: 4,
        isCompleted: false,
        createdAt: new Date(),
    },
    {
        id: nanoid(),
        title: "The Harvest",
        description: "Reach 100 days streak OR land a major client project.",
        emoji: "🏆",
        stage: 5,
        isCompleted: false,
        createdAt: new Date(),
    },
];

export const DefaultSkills: Skill[] = [
    // Fundamentals
    {
        id: "skill-typography",
        name: "Typography Mastery",
        category: "fundamentals",
        isUnlocked: true,
        level: 10,
        requiredDesigns: 0,
        icon: "🔡",
        createdAt: new Date(),
    },
    {
        id: "skill-color",
        name: "Color Theory",
        category: "fundamentals",
        isUnlocked: true,
        level: 10,
        requiredDesigns: 0,
        icon: "🎨",
        createdAt: new Date(),
    },
    {
        id: "skill-layout",
        name: "Layout & Composition",
        category: "fundamentals",
        isUnlocked: true,
        level: 5,
        requiredDesigns: 0,
        icon: "📐",
        createdAt: new Date(),
    },
    // Tools
    {
        id: "skill-photoshop",
        name: "Photoshop Wizardry",
        category: "tools",
        isUnlocked: true,
        level: 20,
        requiredDesigns: 0,
        icon: "🖌️",
        createdAt: new Date(),
    },
    {
        id: "skill-illustrator",
        name: "Illustrator Pen Master",
        category: "tools",
        isUnlocked: true,
        level: 15,
        requiredDesigns: 0,
        icon: "✒️",
        createdAt: new Date(),
    },
    {
        id: "skill-figma",
        name: "Figma Architech",
        category: "tools",
        isUnlocked: true,
        level: 30,
        requiredDesigns: 0,
        icon: "❖",
        createdAt: new Date(),
    },
];

export async function seedDatabase() {
    const settingsCount = await db.appSettings.count();

    if (settingsCount === 0) {
        // Initialize default settings with 'sunrise' theme
        const defaultSettings: AppSettings = {
            id: "main",
            manifestationQuote: DefaultManifestationQuote.trim(),
            sharedWhy: DefaultWhyStatement.trim(),
            theme: "sunrise",
            soundEnabled: true,
            musicEnabled: true,
            notificationsEnabled: true,
            customCursorEnabled: true,
            currentPerson: "shubham",
            shubhamAvatarLevel: "beginner",
            khushiAvatarLevel: "beginner",
            seasonalThemeEnabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.appSettings.add(defaultSettings);
        await db.milestones.bulkAdd(DefaultMilestones);
        await db.skills.bulkAdd(DefaultSkills);

        // Initialize empty streak data if not exists
        const streakCount = await db.streakData.count();
        if (streakCount === 0) {
            await db.streakData.add({
                id: "main-streak",
                currentStreak: 0,
                longestStreak: 0,
                lastActiveDate: new Date().toISOString().split('T')[0],
                totalActiveDays: 0,
                streakHistory: []
            });
        }

        console.log("🌱 Database seeded successfully!");
    }
}

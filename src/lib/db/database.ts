import Dexie, { type Table } from 'dexie';
import {
    Design,
    StickyNote,
    DailyWin,
    StreakData,
    Milestone,
    Income,
    WeeklyReflection,
    Letter,
    GratitudeEntry,
    Challenge,
    Skill,
    Goal,
    Resource,
    DreamBoardItem,
    HypeEvent,
    LearningNote,
    AppSettings
} from './schemas';

export class DreamDesignDB extends Dexie {
    designs!: Table<Design>;
    stickyNotes!: Table<StickyNote>;
    dailyWins!: Table<DailyWin>;
    streakData!: Table<StreakData>;
    milestones!: Table<Milestone>;
    income!: Table<Income>;
    weeklyReflections!: Table<WeeklyReflection>;
    letters!: Table<Letter>;
    gratitudeEntries!: Table<GratitudeEntry>;
    challenges!: Table<Challenge>;
    skills!: Table<Skill>;
    goals!: Table<Goal>;
    resources!: Table<Resource>;
    dreamBoardItems!: Table<DreamBoardItem>;
    hypeEvents!: Table<HypeEvent>;
    learningNotes!: Table<LearningNote>;
    appSettings!: Table<AppSettings>;

    constructor() {
        super('DreamAndDesignDB');

        // Schema definition
        // Only indexed fields need to be specified here. Non-indexed fields are stored as part of the object.
        this.version(2).stores({
            designs: 'id, person, tool, moodRating, createdAt, tags, isHallOfFame',
            stickyNotes: 'id, person, type, isPinned, createdAt',
            dailyWins: 'id, person, date, createdAt',
            streakData: 'id, lastActiveDate',
            milestones: 'id, stage, isCompleted',
            income: 'id, person, date, amount',
            weeklyReflections: 'id, person, weekStart',
            letters: 'id, fromPerson, toPerson, type, isLocked',
            gratitudeEntries: 'id, person, date',
            challenges: 'id, date',
            skills: 'id, category, isUnlocked',
            goals: 'id, person, isCompleted, priority',
            resources: 'id, type, isFavorite',
            dreamBoardItems: 'id, category',
            hypeEvents: 'id, designId, type',
            learningNotes: 'id, person, date',
            appSettings: 'id'
        });
    }
}

export const db = new DreamDesignDB();

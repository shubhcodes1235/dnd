// src/lib/constants/prompts.ts

export const DAILY_PROMPTS = [
    "Design a logo for a fictional coffee shop called 'The Daily Bean'",
    "Create a minimalist poster for a classic sci-fi movie",
    "Redesign the app icon for your most used social media app",
    "Design a high-end chocolate bar packaging",
    "Create a 'Coming Soon' landing page hero section for a luxury watch brand",
    "Design a business card for a professional magician",
    "Create an album cover for a lo-fi hip hop beatmaker",
    "Design a book cover for a mystery novel set in Varanasi",
    "Create a UI for a futuristic plant watering companion app",
    "Design a typography-based poster using only 2 colors",
    "Design a set of icons for a travel agency",
    "Create a social media post for a new sneaker drop",
    "Design a website header for a creative agency",
    "Create a poster for an international food festival",
    "Design a logo for a sustainable fashion brand",
    // ... scaled to 365 in reality, but starting with these.
];

export function getPromptOfDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now as any) - (start as any);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
}

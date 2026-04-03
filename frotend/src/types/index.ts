import type { Equipment, Experience, Goal, Split } from "@/constants/fitness";


export interface User{
    id: string;
    name: string;
    email: string;
    image?: string;
    createdAt: string
}

export interface UserProfile {
    userId: string;
    goal: Goal;
    experience: Experience;
    daysPerWeek: number;
    sessionLength: number;
    equipment: Equipment;
    injuries?: string;
    prefferedSplit: Split;
    updatedAt: string;
};
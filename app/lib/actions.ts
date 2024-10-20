'use server';

import { Task } from "../types/task";

export async function getTask(): Promise<Task[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tasks: Task[] = [
        {
            id: '1',
            title: 'Complete Project Documentation',
            description: 'Write detailed documentation for the new feature',
            priority: 'high'
        },
        {
            id: '2',
            title: 'Review Pull Requests',
            description: 'Review pending PRs from team members',
            priority: 'medium'
        }
    ]

    return tasks;
}
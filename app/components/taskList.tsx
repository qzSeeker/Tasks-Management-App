'use client';

import Link from "next/link";
import { useState } from "react";

interface TaskListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    completed: boolean;
}

export default function TaskList({ tasks }: TaskListProps) {
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [search, setSearch] = useState('');

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return task.title.toLowerCase().includes(search.toLowerCase()) || 
            task.description.toLowerCase().includes(search.toLowerCase());
    });

    // Sort tasks by priority
    const sortedTasks = filteredTasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Handle toggling task completion
    const handleToggleComplete = (id: string) => {
        const updatedTasks = taskList.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
    };

    // Handle task deletion
    const handleDelete = (id: string) => {
        console.log('Task to delete:', id);
        const updatedTasks = taskList.filter((task) => task.id !== id);
        setTaskList(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center mt-24">
                <p>{'No tasks found. Create your first task!👇'}</p>
                <Link href="/addtask" className="underline text-blue-700">
                    Add New Task
                </Link>
            </div>
        );
    }
    
    return (
        <>
            {/* Tasks */}
            <div className="w-[80%] h-full">
                <div className="flex flex-col justify-center items-center mt-8">
                    <div className=" flex justify-between w-full">
                    {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 mb-4 px-3 py-2 w-[50%] text-sm bg-white/10 border-white/10 border-2 rounded outline-none"
                        />
                    {/* Filter Buttons */}
                        <div className="mb-4 flex">
                            <button onClick={() => setFilter('all')} className="px-2 py-1 mx-1 bg-blue-500 text-white rounded">All</button>
                            <button onClick={() => setFilter('active')} className="px-2 py-1 mx-1 bg-green-500 text-white rounded">Active</button>
                            <button onClick={() => setFilter('completed')} className="px-2 py-1 mx-1 bg-yellow-500 text-white rounded">Completed</button>
                        </div>
                    </div>
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
                    {sortedTasks.map((task) => (
                        <div key={task.id} className={`bg-white/10 p-6 rounded`}>
                                <div className="flex justify-between items-center">
                                    <h2 className={`font-semibold text-lg`}>{task.title}</h2>
                                    <span className={`py-1 px-2 rounded ${getPriorityColor(
                                        task.priority
                                    )}`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="mt-2 text-gray-500">{task.description}</p>
                                    <div className="mt-4 text-sm text-gray-400">
                                        Created: {new Date(task.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                    <button
                                        onClick={() => handleToggleComplete(task.id)}
                                        className={`px-2 py-1 text-sm rounded ${task.completed ? 'bg-red-500' : 'bg-green-500'} text-white`}
                                    >
                                        {task.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <Link
                                        href={`/edit/${task.id}`}
                                        className="px-2 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}
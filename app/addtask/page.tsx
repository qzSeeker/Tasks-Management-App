'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";


interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
}

type Priority = 'low' | 'medium' | 'high';

interface FormData {
    title: string;
    description: string;
    priority: Priority;
}

// Custom hook for task management
const useTaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const addTask = (formData: FormData) => {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            createdAt: new Date()
        };
        
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    };

    return { tasks, addTask };
};

export default function AddTaskPage() {
    const router = useRouter();
    const { addTask } = useTaskManager();

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        priority: 'low'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        addTask(formData);
        console.log('Task added:', formData);

        // Reset form and redirect
        setFormData({ title: '', description: '', priority: 'low' });
        router.push('/');
        router.refresh(); // Force refresh the page to show updated data
    };

    // Type-safe handler for priority changes
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'low' || value === 'medium' || value === 'high') {
            setFormData({ ...formData, priority: value });
        }
    };

    return (
        <div className="w-full h-[36rem] flex flex-col justify-center items-center">
            <div className="">
                <h1 className="text-4xl font-bold text-center">Add Your Tasks!</h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 bg-white/10 md:w-[60%] w-[80%] h-max p-4 flex flex-col gap-3 rounded shadow-lg">
                <div className="flex flex-col gap-5 bg-[#171717] px-3 py-2 rounded">
                    <div className="w-full flex justify-between items-center">
                        <label htmlFor="title" className="">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Add your task's title..." 
                            className="px-3 py-2 w-[50%] text-sm bg-transparent border-white/10 border-2 rounded outline-none"
                        />
                    </div>

                    <div className="flex justify-between w-full items-center">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description" 
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Add your task's description..." 
                            className="px-3 w-[50%] py-2 text-sm bg-transparent border-white/10 border-2 rounded outline-none"
                        />
                    </div>

                    <div className="flex justify-between w-full items-center">
                        <label htmlFor="priority">Priority</label>
                        <select 
                            id="priority"
                            className="flex items-center justify-around gap-3 w-[50%] bg-white/10 px-3 py-2 rounded outline-none"
                            value={formData.priority}
                            onChange={handlePriorityChange}
                        >
                            <option value='low' className="bg-white/10">Low</option>
                            <option value='medium' className="bg-white/10">Medium</option>
                            <option value='high' className="bg-white/10">High</option>
                        </select>
                    </div>

                    <div className="flex justify-end mt-8 gap-6">
                        <button 
                            type="button" 
                            onClick={() => router.push('/')}
                            className="bg-white/10 text-white px-3 py-2 border-solid border-white border-b-4 border-r-4 text-sm shadow-2xl rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-white/10 text-white px-3 py-2 border-solid border-white border-b-4 border-r-4 text-sm shadow-2xl rounded"
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
// app/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}

export default function EditTaskPage({ params }) {
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const foundTask = tasks.find((t: Task) => t.id === params.id);
        if (foundTask) {
            setTask(foundTask);
            setTitle(foundTask.title);
            setDescription(foundTask.description);
            setPriority(foundTask.priority);
        }
    }, [params.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedTask = { ...task, title, description, priority };
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.map(t => (t.id === task.id ? updatedTask : t));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        router.push('/');
    };

    if (!task) return null;

    return (
        <div className='w-full h-[36rem] flex flex-col justify-center items-center'>
            {/* <div className='w-[80%]'> */}
                <form onSubmit={handleSubmit}
                    className='mt-10 bg-white/10 md:w-[60%] w-[80%] h-max p-4 flex flex-col gap-3 rounded shadow-lg'
                >
                    <div className="flex flex-col gap-5 bg-[#171717] px-3 py-2 rounded">
                    <div className="w-full flex justify-between items-center">
                    <label htmlFor="title" className="">Title</label>
                    <input id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" 
                        className="px-3 py-2 w-[50%] text-sm bg-transparent border-white/10 border-2 rounded outline-none"
                    />
                    </div>

                    <div className="flex justify-between w-full items-center">
                    <label htmlFor="description">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
                        id='description'
                        className="px-3 w-[50%] py-2 text-sm bg-transparent border-white/10 border-2 rounded outline-none"
                    />
                    </div>

                    <div className='flex justify-between w-full items-center'>
                    <label htmlFor="priority">Priority</label>
                    <select
                        id='priority'
                        className="flex items-center justify-around gap-3 w-[50%] bg-white/10 px-3 py-2 rounded outline-none"
                        value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    </div>
                    <button type="submit"
                        className="bg-white/10 mt-8 text-white px-3 py-2 border-solid border-white border-b-4 border-r-4 text-sm shadow-2xl rounded"
                    >
                    Update Task
                    </button>
                    </div>
                </form>
            {/* </div> */}
        </div>
    );
}

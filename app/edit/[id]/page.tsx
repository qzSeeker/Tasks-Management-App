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

interface EditTaskPageProps {
    params: {
        id: string;
    };
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

    useEffect(() => {
        if (!params?.id) return;

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

        if (!task) return;

        const updatedTask = { ...task, title, description, priority };
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.map((t: Task) => (t.id === task.id ? updatedTask : t));

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        router.push('/');
    };

    if (!task) return null;

    return (
        <div className='w-full h-[36rem] flex flex-col justify-center items-center'>
            {/* <div className='w-[80%]'> */}
                <form onSubmit={handleSubmit}
                    className='mt-10 bg-white/10 md:w-[60%] w-[80%] h-max p-3 flex flex-col gap-3 rounded shadow-lg'
                >
                    <div className="flex flex-col gap-5 bg-[#171717] p-4 rounded">
                    <div className="w-full flex sm:flex-row flex-col gap-3 sm:gap-0 justify-between items-center">
                    <label htmlFor="title" className="font-semibold">Title</label>
                    <input id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" 
                        className="px-3 py-2 w-[80%] sm:w-[50%] text-sm bg-transparent border-white/10 border-2 rounded outline-none"
                    />
                    </div>

                    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 justify-between w-full items-center">
                    <label htmlFor="description" className='font-semibold'>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
                        id='description'
                        className="px-3 w-[80%] sm:w-[50%] py-2 text-sm bg-transparent border-white/10 border-2 rounded outline-none"
                    />
                    </div>

                    <div className='flex sm:flex-row flex-col gap-3 sm:gap-0 justify-between w-full items-center'>
                    <label htmlFor="priority" className='font-semibold'>Priority</label>
                    <select
                        id='priority'
                        className="flex items-center justify-around gap-3 w-[80%] sm:w-[50%] bg-white/10 px-3 py-2 rounded outline-none"
                        value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                        <option value="low" style={{backgroundColor: "#171717", color: 'white'}}>Low</option>
                        <option value="medium" style={{backgroundColor: "#171717", color: 'white'}}>Medium</option>
                        <option value="high" style={{backgroundColor: "#171717", color: 'white'}}>High</option>
                    </select>
                    </div>
                    <div className="flex sm:justify-end justify-center items-center mt-5 gap-6">
                        <button 
                                type="button" 
                                onClick={() => router.push('/')}
                                className="bg-white/10 transition-all ease-in hover:bg-red-500 hover:text-white text-red-500 px-3 py-2 border-solid border-red-500 border-b-4 border-r-4 text-sm shadow-2xl rounded"
                            >
                                Cancel
                        </button>
                        <button type="submit"
                            className="bg-white/10 hover:bg-green-500 hover:text-white transition-all ease-in mt-8 text-green-500 px-3 py-2 border-solid border-green-500 border-b-4 border-r-4 text-sm shadow-2xl rounded"
                        >
                            Update Task
                        </button>
                    </div>
                    </div>
                </form>
            {/* </div> */}
        </div>
    );
}

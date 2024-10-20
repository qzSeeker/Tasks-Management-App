'use client'

import TaskList from "./components/taskList";
import { Suspense, useEffect, useState } from "react";
import LoadingSkeleton from "./components/loading-skeleton";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
    }
}, []);

  return (
    <div className="h-full w-full flex justify-center">
      <Suspense fallback={<LoadingSkeleton />}>
        <TaskList tasks={tasks} setTasks={setTasks}/>
      </Suspense>
    </div>
  );
}

import { Task } from "../types/task";

export const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Complete project documentation',
        description: "Write comprehensive documentation for the project",
        priority: "high",
    },
    {
        id: '2',
        title: 'Review pull requests',
        description: "Review and merge pending pull requests",
        priority: "medium",
    }
];

// // Get all tasks
// export async function getTasks(searchQuery?: string): Promise<Task[]> {
//     if (searchQuery) {
//         const filteredTasks = tasks.filter(task => 
//             task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             task.description.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         return sortTasks(filteredTasks);
//     }
//     return sortTasks(tasks);
// }

// // Create new task
// export async function createTask(formData: FormData) {
//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;
//     const priority = formData.get('priority') as 'low' | 'medium' | 'high';

//     if (!title || !description || !priority) {
//         throw new Error('Missing required fields');
//     }

//     const newTask: Task = {
//         id: Date.now().toString(),
//         title,
//         description,
//         priority,
//         completed: false
//     };

//     tasks.push(newTask);
//     revalidatePath('/', 'page');
//     return redirect('/');
// }

// // Update task
// export async function updateTask(formData: FormData) {
//     const id = formData.get('id') as string;
//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;
//     const priority = formData.get('priority') as 'low' | 'medium' | 'high';
//     const completed = formData.get('completed') === 'true';

//     if (!id || !title || !description || !priority) {
//         throw new Error('Missing required fields');
//     }

//     tasks = tasks.map(task => 
//         task.id === id 
//             ? { ...task, title, description, priority, completed }
//             : task
//     );

//     revalidatePath('/', 'page');
//     return redirect('/');
// }

// // Toggle task completion
// export async function toggleTaskCompletion(id: string) {
//     tasks = tasks.map(task =>
//         task.id === id 
//             ? { ...task, completed: !task.completed }
//             : task
//     );

//     revalidatePath('/', 'page');
// }

// // Delete task
// export async function deleteTask(id: string) {
//     tasks = tasks.filter(task => task.id !== id);
//     revalidatePath('/', 'page');
// }

// // Initialize tasks from localStorage (client-side only)
// export function initializeTasksFromStorage() {
//     if (typeof window !== 'undefined') {
//         const storedTasks = localStorage.getItem('tasks');
//         if (storedTasks) {
//             tasks = JSON.parse(storedTasks);
//         }
//     }
// }

// // Save tasks to localStorage (client-side only)
// export function saveTasksToStorage() {
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     }
// }
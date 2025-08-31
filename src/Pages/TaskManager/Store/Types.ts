export interface Task{
    id?: string;
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    duedate: Date | string;
    createdat?: Date;
    updatedat?: Date;
}

export interface TaskManagerHooks {
    addTask: (task: Task) => Promise<Task>;
    updateTask: (id: number, task: Task) => Promise<Task>;
    getAllTasks: (limit: number, offset: number, search: string, filter: string) => Promise<Task[]>;
    getTaskById: (id: number) => Promise<Task | null>;
    deleteTask: (id: number) => Promise<void>;
    handleStatusChange: (id: number, status: string) => Promise<void>;
}

export interface TaskManagerState {
    task: Task | null;
    taskList: Task[];
    taskCount: number;
}


export type TaskManagerHookReturn=[
    TaskManagerHooks,
    TaskManagerState
]
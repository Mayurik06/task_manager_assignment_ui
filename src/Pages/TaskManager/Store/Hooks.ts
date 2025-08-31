import { toast } from "react-toastify";
import { useAdminAppService } from "../../../utils/Axios";
import type { Task, TaskManagerHookReturn } from "./Types";
import { useRecoilState } from "recoil";
import { taskCountState, taskListState, taskState } from "./Atom";


const useTaskManagerHooks = (): TaskManagerHookReturn=> {
const adminAppService = useAdminAppService();
const [taskList, setTaskList] = useRecoilState(taskListState)
const [task, setTask]=useRecoilState(taskState);
const [taskCount, setTaskCount] = useRecoilState(taskCountState);

    const addTask = async(task: Task) => {
        try {
            const response = await adminAppService.post('/tasks', task);
            toast.success("Task added successfully");
            return response.data;
        } catch (error) {
            toast.error("Failed to add task");
            throw error;
        }
    }

    const updateTask = async (id: number, task: Task) => {
        try {
            const response = await adminAppService.put(`/tasks/${id}`, task);
            toast.success("Task updated successfully");
            return response.data;
        } catch (error) {
            toast.error("Failed to update task");
            throw error;
        }
    }

    const getAllTasks = async ( offset: number, limit: number, search: string, filter: string) => {
        try {
            const response = await adminAppService.get(`/tasks?limit=${limit}&offset=${offset}&search=${search}&filter=${filter}&columnNames=id&columnNames=status&columnNames=title&columnNames=description&&columnNames=duedate`);
            setTaskList(response.data.data);
            setTaskCount(response.data.count);
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch tasks");
            throw error;
        }
    }

    const getTaskById = async (id: number) => {
        try {
            const response = await adminAppService.get(`/tasks/${id}`);
            setTask(response.data);
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch task");
            throw error;
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await adminAppService.delete(`/tasks/${id}`);
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
            throw error;
        }
    }

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await adminAppService.put(`/tasks/${id}`, { status:status });
            toast.success("Task status updated successfully");
        } catch (error) {
            toast.error("Failed to update task status");
            throw error;
        }
    }

    return [
        {
              addTask,
        updateTask,
        getAllTasks,
        getTaskById,
        deleteTask,
        handleStatusChange
        },
        {
            task,
            taskList,
            taskCount
        }
    ]
}

export default useTaskManagerHooks;

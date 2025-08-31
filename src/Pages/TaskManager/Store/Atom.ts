import type { Task } from "./Types";
import { atom } from "recoil";

export const taskState = atom<Task>({
  key: 'taskState',
  default: {
    title: '',
    description: '',
    status: 'Pending',
    duedate: new Date(),
  },
});

export const taskListState = atom<Task[]>({
  key: 'taskListState',
  default: [],
});

export const taskCountState = atom<number>({
  key: 'taskCountState',
  default: 0,
});
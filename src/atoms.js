import { atom } from 'recoil';

const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

export const tasksState = atom({
  key: 'tasksState',
  default: initialTasks,
});

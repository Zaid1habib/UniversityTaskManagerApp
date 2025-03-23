import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  loadTasks: () => Promise<void>;
  saveTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
    get().saveTasks();
  },

  updateTask: (id, task) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...task } : t
      ),
    }));
    get().saveTasks();
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
    get().saveTasks();
  },

  toggleTaskCompletion: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
    get().saveTasks();
  },

  loadTasks: async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson) {
        const tasks = JSON.parse(tasksJson).map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
        }));
        set({ tasks });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },

  saveTasks: async () => {
    try {
      const tasksJson = JSON.stringify(get().tasks);
      await AsyncStorage.setItem('tasks', tasksJson);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },
})); 
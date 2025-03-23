import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator, create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

interface Task {
  id: string;
  title: string;
  due: string;
  completed: boolean;
}

interface User {
  id?: string;
  email?: string;
  name?: string;
}

interface AppState {
  tasks: Task[];
  user: User | null;
  addTask: (task: Task) => void;
  toggleTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  setUser: (user: User | null) => void;
}

type AppPersist = (
  config: StateCreator<AppState>,
  options: PersistOptions<AppState>
) => StateCreator<AppState>;

export const useStore = create<AppState>()(
  (persist as AppPersist)(
    (set) => ({
      tasks: [],
      user: null,
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        })),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 
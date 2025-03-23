import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTaskStore } from '@/store/taskStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loadTasks } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
              },
              headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Home',
              }}
            />
          </Stack>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

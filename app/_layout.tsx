import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUserStr = await AsyncStorage.getItem('currentUser');
      const isAuthGroup = segments[0] === '(auth)';

      if (!currentUserStr) {
        // No user logged in
        if (!isAuthGroup) {
          router.replace('/sign-in');
        }
        return;
      }

      const currentUser = JSON.parse(currentUserStr);
      if (currentUser?.isAuthenticated) {
        // User is logged in
        if (isAuthGroup) {
          router.replace('/');
        }
      } else if (!isAuthGroup) {
        router.replace('/sign-in');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (segments[0] !== '(auth)') {
        router.replace('/sign-in');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

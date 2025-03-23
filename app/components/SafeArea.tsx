import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from './BottomNavigation';

interface SafeAreaProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export function SafeArea({ children, hideBottomNav = false }: SafeAreaProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <View style={styles.content}>{children}</View>
      {!hideBottomNav && <BottomNavigation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

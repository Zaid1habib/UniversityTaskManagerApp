import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useTaskStore } from '@/store/taskStore';

export default function HomeScreen() {
  const { tasks } = useTaskStore();
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        University Task Manager
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Manage your academic tasks efficiently
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text variant="titleLarge">{pendingTasks}</Text>
          <Text variant="bodyMedium">Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text variant="titleLarge">{completedTasks}</Text>
          <Text variant="bodyMedium">Completed</Text>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={() => router.push('/tasks')}
        style={styles.button}
      >
        View Tasks
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
    width: '100%',
  },
  statCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    minWidth: 120,
  },
  button: {
    marginTop: 16,
  },
}); 
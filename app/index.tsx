import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome to
        </Text>
        <Text variant="displayMedium" style={styles.appName}>
          University Task Manager
        </Text>
        
        <Text variant="bodyLarge" style={styles.description}>
          Your personal assistant for managing academic tasks, assignments, and goals.
          Stay organized and never miss a deadline!
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {}}
          >
            Get Started
          </Button>
          
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => {}}
          >
            Learn More
          </Button>
        </View>
      </View>

      <Text variant="bodySmall" style={styles.version}>
        Version 1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#666',
    marginBottom: 8,
  },
  appName: {
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    maxWidth: 600,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
    maxWidth: 300,
  },
  button: {
    width: '100%',
  },
  version: {
    textAlign: 'center',
    color: '#999',
    paddingBottom: 24,
  },
}); 
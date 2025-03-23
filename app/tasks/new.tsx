import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useTaskStore } from '@/store/taskStore';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewTaskScreen() {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      completed: false,
      priority: 'medium',
    });

    router.back();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="spinner"
          onChange={onDateChange}
        />
      ) : (
        <>
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            Due Date: {dueDate.toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </>
      )}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!title.trim()}
      >
        Add Task
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 
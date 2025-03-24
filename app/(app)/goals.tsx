import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, IconButton, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeArea } from '../components/SafeArea';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';

const theme = {
  colors: {
    background: '#FFFFFF',
    primary: '#007AFF',
  },
};

const goals = [
  {
    id: '1',
    title: 'Goal 1',
    subtitle: 'Short description about the goal plus Lorem ipsum text can help',
    image: require('../../assets/images/signup.png'),
    progress: 67,
    dates: '28 Aug 2023 - 28 Aug 2024',
  },
  {
    id: '2',
    title: 'Goal 2',
    subtitle: 'Short description about the goal plus Lorem ipsum text can help',
    image: require('../../assets/images/signup.png'),
    progress: 34,
    dates: '28 Aug 2023 - 28 Aug 2024',
  },
];

export default function GoalsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoalPress = (goalId: string) => {
    router.push(`/goal/${goalId}`);
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            My Goals
          </Text>
          <IconButton icon="bell-outline" size={24} onPress={() => router.push('/notifications')} />
        </View>

        <SearchBar
          placeholder="Search for Goals"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView>
          <View style={styles.goalsHeader}>
            <Text variant="titleMedium">Goals</Text>
            <IconButton icon="dots-horizontal" size={20} onPress={() => {}} />
          </View>

          {goals.map(goal => (
            <CategoryCard
              key={goal.id}
              title={goal.title}
              subtitle={goal.subtitle}
              image={goal.image}
              progress={goal.progress}
              onPress={() => handleGoalPress(goal.id)}
            />
          ))}
        </ScrollView>

        <FAB icon="plus" style={styles.fab} onPress={() => router.push('/goals/new')} />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 16,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    bottom: 16,
    position: 'absolute',
    right: 16,
  },
  goalsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  title: {
    fontWeight: 'bold',
  },
});

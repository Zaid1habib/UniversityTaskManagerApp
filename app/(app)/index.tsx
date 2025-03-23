import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { SafeArea } from '../components/SafeArea';
import { SideMenuModal } from '../components/SideMenu/SideMenuModal';
import type { FilterValues } from '../components/SideMenu';

const theme = {
  colors: {
    background: '#FFFFFF',
  },
};

const categories = [
  {
    id: '1',
    title: 'Studies',
    subtitle: 'University Of London',
    image: require('../../assets/images/signup.png'),
    progress: 45,
  },
  {
    id: '2',
    title: 'Job',
    subtitle: 'My Job Tasks',
    image: require('../../assets/images/signup.png'),
    progress: 70,
  },
  {
    id: '3',
    title: 'Course',
    subtitle: 'UI Design Course',
    image: require('../../assets/images/signup.png'),
    progress: 30,
  },
  {
    id: '4',
    title: 'Personal Development',
    subtitle: 'Self-Improvement & Learning',
    image: require('../../assets/images/signup.png'),
    progress: 85,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    subjectFilter: 'active',
    assignmentType: {},
    assignmentStatus: 'active',
    startDate: null,
    endDate: null,
    atGlance: null,
  });

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setSideMenuVisible(false);
    // TODO: Apply filters to the data
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Home
          </Text>
          <View style={styles.headerButtons}>
            <IconButton icon="filter-outline" size={24} onPress={() => setSideMenuVisible(true)} />
            <IconButton
              icon="bell-outline"
              size={24}
              onPress={() => router.push('/notifications')}
            />
          </View>
        </View>

        <SearchBar
          placeholder="Search for Categories"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView>
          <View style={styles.categoriesHeader}>
            <Text variant="titleMedium">Categories</Text>
            <IconButton icon="dots-horizontal" size={20} onPress={() => {}} />
          </View>

          {categories.map(category => (
            <CategoryCard
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              image={category.image}
              progress={category.progress}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </ScrollView>

        <SideMenuModal
          isVisible={isSideMenuVisible}
          onClose={() => setSideMenuVisible(false)}
          onApply={handleApplyFilters}
          initialValues={filters}
        />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  categoriesHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
  },
});

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { List, Text, RadioButton } from 'react-native-paper';

const theme = {
  colors: {
    primary: '#007AFF',
    gray: {
      100: '#F3F4F6',
      500: '#6B7280',
    },
  },
};

interface FilterOption {
  title: string;
  value: string;
}

const filterOptions: FilterOption[] = [
  { title: 'All', value: 'all' },
  { title: 'Pending', value: 'active' },
  { title: 'Due', value: 'due' },
  { title: 'Completed', value: 'completed' },
];

interface FilterSectionProps {
  title: string;
  active: boolean;
  value: string;
  onPress: () => void;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

export function FilterSection({
  title,
  active,
  value,
  onPress,
  onChange,
  children,
}: FilterSectionProps) {
  return (
    <List.Accordion
      expanded={active}
      onPress={onPress}
      style={styles.section}
      title={
        <View style={styles.sectionHeader}>
          {active && <View style={[styles.dot, { backgroundColor: theme.colors.primary }]} />}
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      }
    >
      {filterOptions.map(option => (
        <List.Item
          key={option.value}
          style={styles.item}
          title={
            <TouchableOpacity style={styles.optionContainer} onPress={() => onChange(option.value)}>
              <RadioButton
                value={option.value}
                status={value === option.value ? 'checked' : 'unchecked'}
                onPress={() => onChange(option.value)}
                color={theme.colors.primary}
              />
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          }
        />
      ))}
      {children}
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 10,
    height: 20,
    marginRight: 8,
    width: 20,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  optionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  section: {
    backgroundColor: theme.colors.gray[100],
    borderBottomColor: theme.colors.gray[500],
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

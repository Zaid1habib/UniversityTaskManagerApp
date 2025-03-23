import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { FilterSection } from './FilterSection';
import { DateRangeFilter } from './DateRangeFilter';
import { FilterFooter } from './FilterFooter';
import { SafeAreaView } from 'react-native-safe-area-context';

const theme = {
  colors: {
    background: '#FFFFFF',
    gray: {
      100: '#F3F4F6',
    },
  },
};

export interface FilterValues {
  subjectFilter: 'all' | 'active' | 'due' | 'completed';
  assignmentType: Record<string, boolean>;
  assignmentStatus: 'all' | 'active' | 'due' | 'completed';
  startDate: Date | null;
  endDate: Date | null;
  atGlance: 'day' | 'week' | 'month' | null;
}

interface SideMenuProps {
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  loading?: boolean;
  initialValues?: Partial<FilterValues>;
}

const defaultValues: FilterValues = {
  subjectFilter: 'active',
  assignmentType: {},
  assignmentStatus: 'active',
  startDate: null,
  endDate: null,
  atGlance: null,
};

export function SideMenu({ onClose, onApply, loading = false, initialValues }: SideMenuProps) {
  const [values, setValues] = useState<FilterValues>({ ...defaultValues, ...initialValues });
  const [activeSection, setActiveSection] = useState<'subject' | 'assignment'>('subject');

  const handleClear = () => {
    setValues(defaultValues);
  };

  const handleApply = () => {
    onApply(values);
  };

  const handleFilterChange = (
    type: keyof Pick<FilterValues, 'subjectFilter' | 'assignmentStatus'>,
    value: 'all' | 'active' | 'due' | 'completed'
  ) => {
    setValues({ ...values, [type]: value });
  };

  return (
    <SafeAreaView style={styles.container} edges={['right']}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerText}>
          Filter Menu
        </Text>
        <IconButton icon="close" onPress={onClose} />
      </View>

      <ScrollView style={styles.content}>
        <FilterSection
          title="Show By Subjects"
          active={activeSection === 'subject'}
          onPress={() => setActiveSection('subject')}
          value={values.subjectFilter}
          onChange={value =>
            handleFilterChange('subjectFilter', value as 'all' | 'active' | 'due' | 'completed')
          }
        />

        <FilterSection
          title="Show Assignments"
          active={activeSection === 'assignment'}
          onPress={() => setActiveSection('assignment')}
          value={values.assignmentStatus}
          onChange={value =>
            handleFilterChange('assignmentStatus', value as 'all' | 'active' | 'due' | 'completed')
          }
        >
          <DateRangeFilter
            startDate={values.startDate}
            endDate={values.endDate}
            atGlance={values.atGlance}
            onStartDateChange={date => setValues({ ...values, startDate: date })}
            onEndDateChange={date => setValues({ ...values, endDate: date })}
            onAtGlanceChange={value => setValues({ ...values, atGlance: value })}
          />
        </FilterSection>
      </ScrollView>

      <FilterFooter onApply={handleApply} onClear={handleClear} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: theme.colors.gray[100],
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    fontWeight: '600',
  },
});

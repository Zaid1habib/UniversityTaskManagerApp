import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const theme = {
  colors: {
    primary: '#007AFF',
    gray: {
      100: '#F3F4F6',
      300: '#D1D5DB',
      500: '#6B7280',
    },
  },
};

interface DateRangeFilterProps {
  startDate: Date | null;
  endDate: Date | null;
  atGlance: 'day' | 'week' | 'month' | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onAtGlanceChange: (value: 'day' | 'week' | 'month' | null) => void;
}

const timeRanges = [
  { title: 'Today', value: 'day' },
  { title: 'This week', value: 'week' },
  { title: 'This month', value: 'month' },
] as const;

const formatDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export function DateRangeFilter({
  startDate,
  endDate,
  atGlance,
  onStartDateChange,
  onEndDateChange,
  onAtGlanceChange,
}: DateRangeFilterProps) {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const handleStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowStartDate(Platform.OS === 'ios');
    if (date) {
      onStartDateChange(date);
      if (endDate && date > endDate) {
        onEndDateChange(date);
      }
    }
  };

  const handleEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowEndDate(Platform.OS === 'ios');
    if (date) {
      onEndDateChange(date);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateInputs}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDate(true)}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>{startDate ? formatDate(startDate) : 'Select date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDate(true)}>
          <Text style={styles.dateLabel}>End Date</Text>
          <Text style={styles.dateValue}>{endDate ? formatDate(endDate) : 'Select date'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickRanges}>
        {timeRanges.map(range => (
          <TouchableOpacity
            key={range.value}
            style={styles.rangeOption}
            onPress={() => onAtGlanceChange(atGlance === range.value ? null : range.value)}
          >
            <RadioButton
              value={range.value}
              status={atGlance === range.value ? 'checked' : 'unchecked'}
              onPress={() => onAtGlanceChange(atGlance === range.value ? null : range.value)}
              color={theme.colors.primary}
            />
            <Text style={styles.rangeText}>{range.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showStartDate && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={handleStartDateChange}
        />
      )}

      {showEndDate && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={handleEndDateChange}
          minimumDate={startDate || undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dateButton: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
  },
  dateInputs: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  dateLabel: {
    color: theme.colors.gray[500],
    fontSize: 12,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickRanges: {
    marginTop: 8,
  },
  rangeOption: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  rangeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});

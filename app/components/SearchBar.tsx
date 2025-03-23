import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const theme = {
  colors: {
    gray: {
      100: '#F3F4F6',
      400: '#9CA3AF',
    },
  },
};

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ placeholder, value, onChangeText }: SearchBarProps) {
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={styles.searchBar}
      iconColor={theme.colors.gray[400]}
      placeholderTextColor={theme.colors.gray[400]}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    elevation: 0,
    height: 44,
    marginVertical: 16,
  },
});

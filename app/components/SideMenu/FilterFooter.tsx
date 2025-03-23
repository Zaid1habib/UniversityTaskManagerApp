import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const theme = {
  colors: {
    primary: '#007AFF',
    gray: {
      100: '#F3F4F6',
    },
  },
};

interface FilterFooterProps {
  onApply: () => void;
  onClear: () => void;
  loading?: boolean;
}

export function FilterFooter({ onApply, onClear, loading = false }: FilterFooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button mode="contained" onPress={onApply} loading={loading} style={styles.button}>
          <Text>Apply</Text>
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          mode="outlined"
          onPress={onClear}
          style={[styles.button, styles.clearButton]}
          textColor={theme.colors.primary}
        >
          <Text>Clear</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  buttonWrapper: {
    flex: 1,
    padding: 4,
  },
  clearButton: {
    backgroundColor: theme.colors.gray[100],
  },
  container: {
    borderTopColor: theme.colors.gray[100],
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 12,
  },
});

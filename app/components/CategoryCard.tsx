import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, Pressable } from 'react-native';
import { Text } from 'react-native-paper';

const theme = {
  colors: {
    primary: '#007AFF',
    gray: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      500: '#6B7280',
    },
  },
  spacing: {
    2: 8,
    3: 12,
    4: 16,
  },
};

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  image: ImageSourcePropType;
  progress?: number;
  onPress?: () => void;
}

export function CategoryCard({ title, subtitle, image, progress, onPress }: CategoryCardProps) {
  const progressText = progress ? `${Math.round(progress)}%` : undefined;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodySmall" style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
        {progressText && (
          <View style={styles.progressContainer}>
            <Text variant="labelMedium" style={styles.progressText}>
              {progressText}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.spacing[3],
    flexDirection: 'row',
    marginBottom: theme.spacing[3],
    padding: theme.spacing[3],
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 40,
    width: 40,
  },
  imageContainer: {
    marginRight: theme.spacing[3],
  },
  progressContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.spacing[2],
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[2],
  },
  progressText: {
    color: theme.colors.primary,
  },
  subtitle: {
    color: theme.colors.gray[500],
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing[2],
  },
  title: {
    fontWeight: '600',
  },
});

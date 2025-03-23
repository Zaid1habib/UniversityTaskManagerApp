import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { usePathname, router } from 'expo-router';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const theme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    gray: {
      300: '#D1D5DB',
      500: '#6B7280',
    },
  },
};

type IconName = keyof typeof Ionicons.glyphMap;

const tabs = [
  {
    name: 'Home',
    icon: 'home-outline' as IconName,
    activeIcon: 'home' as IconName,
    path: '/',
  },
  {
    name: 'Goals',
    icon: 'flag-outline' as IconName,
    activeIcon: 'flag' as IconName,
    path: '/goals',
  },
  {
    name: 'Profile',
    icon: 'person-outline' as IconName,
    activeIcon: 'person' as IconName,
    path: '/profile',
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = pathname === tab.path;
        return (
          <Pressable key={tab.name} style={styles.tab} onPress={() => router.push(tab.path)}>
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? theme.colors.primary : theme.colors.gray[500]}
            />
            <Text
              variant="labelMedium"
              style={[
                styles.label,
                { color: isActive ? theme.colors.primary : theme.colors.gray[500] },
              ]}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderTopColor: theme.colors.gray[300],
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 8,
  },
  label: {
    marginTop: 4,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

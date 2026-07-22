/**
 * index.tsx
 *
 * File-level documentation comment.
 */
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const menuItems = [
  { title: 'Self ☀️', description: 'My Profile', href: '/orbits/self' },
  { title: 'Friends 🪐🛰️', description: 'My Connections', href: '/orbits/friends' },
  { title: 'Groups 🌕', description: 'My Clusters & Moons', href: '/orbits/groups' },
  { title: 'Cadences 💫', description: 'My Orbital Patterns', href: '/orbits/cadences' },

] as const;

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
 export const screenOptions = {
  title: 'Orbits',
  headerShown: false,
}; 

/**
 * OrbitsScreen component.
 *
 * Renders the UI for the Orbits screen.
 */
export default function OrbitsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [
                styles.menuItem,
                {
                  backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground,
                },
              ]}
              onPress={() => router.push(item.href)}>
              <View style={styles.menuText}>
                <ThemedText type="subtitle" style={{ color: theme.bubbleText }}>
                  {item.title}
                </ThemedText>
                <ThemedText style={{ color: theme.bubbleText }}>{item.description}</ThemedText>
              </View>
              <ThemedText type="link">›</ThemedText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  menu: {
    marginTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    flex: 1,
    marginRight: 12,
  },
});
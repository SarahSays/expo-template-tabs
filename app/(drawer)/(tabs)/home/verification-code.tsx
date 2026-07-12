/**
 * verification-code.tsx
 *
 * File-level documentation comment.
 */
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const menuItems = [
  { title: 'Enter code', description: 'Check your email for the sign in code.', href: '/home/notifications' },

] as const;

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
 export const screenOptions = {
  title: 'Enter code',
  headerShown: false,
}; 

/**
 * FeedScreen component.
 *
 * Renders the UI for the Feed screen.
 */
export default function FeedScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Enter Code</ThemedText>
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [
                styles.menuItem,
                pressed ? styles.menuItemPressed : null,
              ]}
              onPress={() => router.push(item.href)}>
              <View style={styles.menuText}>
                <ThemedText type="subtitle">{item.title}</ThemedText>
                <ThemedText>{item.description}</ThemedText>
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: 12,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuText: {
    flex: 1,
    marginRight: 12,
  },
});
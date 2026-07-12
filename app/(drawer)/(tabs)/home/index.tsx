/**
 * Home Stack Initial Screen - Email verification entry point
 * 
 * First screen in the home tab stack after user chooses to continue with email.
 * Prompts user to enter email address with security information.
 * Scope: Rendered within home stack (can navigate back to home tab index)
 * 
 * CRITICAL NAVIGATION:
 * - This screen is nested within the home/_layout.tsx stack
 * - Header is controlled by home/_layout.tsx (shows back button)
 * - Back button navigates to previous screen in home stack
 */

import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Menu items for email verification flow
 * @const {Array} menuItems - Next step in authentication
 */
const menuItems = [
  { title: 'Enter your Email', description: 'Learn more about security and privacy', href: '/home/verification-code' },

] as const;

/**
 * Configures screen options (can override from stack layout)
 * @const {Object} screenOptions
 */
/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
 export const screenOptions = {
  title: '',
  headerShown: false,
}; 

/**
 * Renders email entry screen within home stack
 * 
 * @returns {React.ReactNode} Email verification entry interface
 * 
 * Features:
 * - Part of home tab stack navigation
 * - Back navigation via header (managed by home/_layout.tsx)
 * - Pressable menu items with visual feedback
 * - Theme-aware styling
 */
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
        <ThemedText type="title">Enter Your Email</ThemedText>
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
/**
 * Logout Screen - User authentication exit confirmation
 * 
 * Accessible via drawer menu (not through tabs).
 * Displays logout confirmation message.
 * 
 * CRITICAL NAVIGATION:
 * - This screen is at drawer level, managed by drawer navigator
 * - Header is controlled by logout.tsx stack if it has sub-screens
 * - Scope: Drawer-level screen (outside of tabs)
 */

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * Renders logout confirmation screen
 * 
 * @returns {React.ReactNode} Logout screen with confirmation message
 * 
 * Features:
 * - Simple confirmation UI
 * - Accessed from drawer menu
 * - Theme-aware styling
 */
export default function LogOutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log Out</ThemedText>
      <ThemedText style={styles.body}>
        Are you sure you want to log out?
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  body: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },
});

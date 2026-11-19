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
import { useSession } from '@/contexts/SessionContext';
import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

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
/**
 * LogOutScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function LogOutScreen() {
  const router = useRouter();
  const { endSession } = useSession();

  const handleLogout = async () => {
    await endSession();
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log Out</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Are you sure you want to log out?
      </ThemedText>
      <Pressable onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
        <ThemedText style={styles.buttonText}>Log out</ThemedText>
      </Pressable>
      <Pressable onPress={() => router.replace('/inbox' as Href)} style={styles.cancelButton}>
        <ThemedText type="link">Stay logged in</ThemedText>
      </Pressable>
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
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 14,
  },
  logoutButton: {
    backgroundColor: '#D92D20',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 14,
  },
});

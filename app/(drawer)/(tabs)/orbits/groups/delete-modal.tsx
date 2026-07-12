/**
 * delete-modal.tsx
 *
 * File-level documentation comment.
 */
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * ModalScreen component.
 *
 * Renders the UI for the modal screen.
 */
export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Delete this group?</ThemedText>
      <Link href="/home/username" dismissTo style={styles.link}>
        <ThemedText type="link">Delete</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

/**
 * messenger.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * MessengerScreen component.
 *
 * Renders the UI for the Messenger screen.
 */
export default function MessengerScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Messenger</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your Messenger account.
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
  },
});

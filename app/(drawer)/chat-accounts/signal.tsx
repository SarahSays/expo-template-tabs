/**
 * signal.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * SignalScreen component.
 *
 * Renders the UI for the Signal screen.
 */
export default function SignalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Signal</ThemedText> 
      <ThemedText style={styles.body}>
        Orbits would like to access your Signal account.
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

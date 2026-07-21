/**
 * sms.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * SMSScreen component.
 *
 * Renders the UI for the SMS screen.
 */
export default function SMSScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">SMS</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your SMS account.
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

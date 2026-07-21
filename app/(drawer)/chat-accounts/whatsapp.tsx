/**
 * whatsapp.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * WhatsAppScreen component.
 *
 * Renders the UI for the WhatsApp screen.
 */
export default function WhatsAppScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">WhatsApp</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your WhatsApp account.
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

/**
 * help.tsx
 *
 * File-level documentation comment.
 */
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * HelpScreen component.
 *
 * Renders the UI for the Help screen.
 */
export default function HelpScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Help</ThemedText>
      <ThemedText style={styles.body}>
        Find answers, tips, and support resources for using the app.
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

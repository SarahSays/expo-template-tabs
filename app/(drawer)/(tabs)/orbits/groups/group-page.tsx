/**
 * group-page.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * FeedScreen component.
 *
 * Renders the UI for the Feed screen.
 */
export default function FeedScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Group Page</ThemedText>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">General</ThemedText>
        <ThemedText>Group information goes here.</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  section: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
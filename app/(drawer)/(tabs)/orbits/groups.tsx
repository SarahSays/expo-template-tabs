/**
 * groups.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
export const screenOptions = {
  title: 'Groups',
  headerBackTitle: '',
  headerRight: undefined,
};

/**
 * GroupsScreen component.
 *
 * Renders the UI for the Groups screen.
 */
export default function GroupsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Groups</ThemedText>
      <ThemedText style={styles.body}>
        See list view of groups here. Groups can help you 
        organize your connections into different categories, 
        such as family, close friends, work colleagues, or hobby groups.
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
    lineHeight: 28,
    paddingBottom: 4,
  },
});

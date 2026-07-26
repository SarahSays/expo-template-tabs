/**
 * groups.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
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
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function GroupsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Groups</ThemedText>
      <ThemedText type="body" style={styles.body}>
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
  },
});

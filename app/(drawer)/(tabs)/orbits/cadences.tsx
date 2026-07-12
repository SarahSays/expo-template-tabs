/**
 * cadences.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/* export const screenOptions = {
  title: 'Cadences',
  headerBackTitle: '',
  headerRight: undefined,
}; */

/**
 * CadencesScreen component.
 *
 * Renders the UI for the Cadences screen.
 */
export default function CadencesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Cadences</ThemedText>
      <ThemedText style={styles.body}>
        Rhythms, patterns. Daily, weekly, yearly. 
        We make it easier to stay in touch.
        Connect in ways that feels natural to you.
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

/**
 * rcs.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * RcsScreen
 * @description Placeholder screen prompting the user to connect RCS.
 * @returns {JSX.Element} A themed screen with explanatory text.
 */
/**
 * RcsScreen component.
 *
 * Renders the UI for the Rcs screen.
 */
export default function RcsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">RCS</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your RCS account.
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

/**
 * slack.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * SlackScreen
 * @description Placeholder screen prompting the user to connect Slack.
 * @returns {JSX.Element} A themed screen with explanatory text.
 */
/**
 * SlackScreen component.
 *
 * Renders the UI for the Slack screen.
 */
export default function SlackScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Slack</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your Slack account.
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

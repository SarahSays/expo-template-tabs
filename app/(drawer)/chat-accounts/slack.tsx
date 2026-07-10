import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * SlackScreen
 * @description Placeholder screen prompting the user to connect Slack.
 * @returns {JSX.Element} A themed screen with explanatory text.
 */
export default function SlackScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Slack</ThemedText>
      <ThemedText style={styles.body}>
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
    fontSize: 16,
    lineHeight: 24,
  },
});

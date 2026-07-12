/**
 * discord.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * DiscordScreen
 * @description Placeholder screen prompting the user to connect Discord.
 * @returns {JSX.Element} A themed screen with explanatory text.
 */
/**
 * DiscordScreen component.
 *
 * Renders the UI for the Discord screen.
 */
export default function DiscordScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Discord</ThemedText>
      <ThemedText style={styles.body}>
        Orbits would like to access your Discord account.
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

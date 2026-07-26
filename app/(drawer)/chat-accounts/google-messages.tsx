/**
 * google-messages.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * GoogleMessagesScreen
 * @description Placeholder screen prompting the user to connect Google
 * Messages. Used for demo navigation and UI consistency.
 * @returns {JSX.Element} A themed screen with explanatory text.
 */
/**
 * GoogleMessagesScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function GoogleMessagesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Google Messages</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your Google Messages account.
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

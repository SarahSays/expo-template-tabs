/**
 * linkedin.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/**
 * LinkedInScreen
 * @description Placeholder screen prompting the user to connect LinkedIn.
 * @returns {JSX.Element} A themed screen with explanatory text.
 */
/**
 * LinkedInScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function LinkedInScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">LinkedIn</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Orbits would like to access your LinkedIn account.
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

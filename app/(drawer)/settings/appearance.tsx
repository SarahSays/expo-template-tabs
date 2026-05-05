import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AppearanceScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Appearance</ThemedText>
      <ThemedText style={styles.body}>
        Change theme, colors, and visual preferences to make the app feel like yours.
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

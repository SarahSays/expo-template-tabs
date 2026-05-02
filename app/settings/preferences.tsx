import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PreferencesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Preferences</ThemedText>
      <ThemedText style={styles.body}>
        Adjust your app preferences and behavior settings from here.
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

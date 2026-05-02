import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function FeedScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Feed</ThemedText>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">General</ThemedText>
        <ThemedText>Feed options coming soon...</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  section: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function AwardsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Awards</ThemedText>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Most Connected:</ThemedText>
        <ThemedText>[Name] with [5] connections</ThemedText>
        <ThemedText type="subtitle">Most Frequently Contacted:</ThemedText>
        <ThemedText>[Name] with [360] reach-outs</ThemedText>
        <ThemedText type="subtitle">Longest Streak</ThemedText>
        <ThemedText>[Name] with [365] consecutive days</ThemedText>
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
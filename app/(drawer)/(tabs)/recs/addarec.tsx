import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function AddaRecScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add a Recommendation</ThemedText>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Name?</ThemedText>
        <ThemedText>"The Good Place"</ThemedText>
        <ThemedText type="subtitle">What media?</ThemedText>
        <ThemedText>TV / Movie / Book / Game</ThemedText>
        <ThemedText type="subtitle">Where?</ThemedText>
        <ThemedText>Netflix / Hulu / Amazon</ThemedText>
        <ThemedText type="subtitle">Who recommended it?</ThemedText>
        <ThemedText>Pick a Friend</ThemedText>
        <ThemedText type="subtitle">Done</ThemedText>
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
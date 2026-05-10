import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function InstagramScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Google Messages</ThemedText>
      <ThemedText style={styles.body}>
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
    fontSize: 16,
    lineHeight: 24,
  },
});

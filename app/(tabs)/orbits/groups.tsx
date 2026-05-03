import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export const screenOptions = {
  title: 'Groups',
  headerBackTitle: '',
  headerRight: undefined,
};

export default function GroupsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Groups</ThemedText>
      <ThemedText style={styles.body}>
        What are groups? Moons, clusters, constellations.
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

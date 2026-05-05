import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export const screenOptions = {
  title: 'Friends',
  headerBackTitle: '',
  headerRight: undefined,
};

export default function FriendsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Friends</ThemedText>
      <ThemedText style={styles.body}>
        See list view of connections here.
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

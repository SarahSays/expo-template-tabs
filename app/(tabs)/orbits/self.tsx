import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export const screenOptions = {
  title: 'Self',
  headerBackTitle: '',
  headerRight: undefined,
};

export default function SelfScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Self</ThemedText>
      <ThemedText style={styles.body}>
        Manage your profile settings. Sun, center
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

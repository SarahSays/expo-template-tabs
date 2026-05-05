import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PrivacySecurityScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Privacy & Security</ThemedText>
      <ThemedText style={styles.body}>
        Manage your privacy settings, permissions, and security preferences.
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

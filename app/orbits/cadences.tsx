import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

/* export const screenOptions = {
  title: 'Cadences',
  headerBackTitle: '',
  headerRight: undefined,
}; */

export default function CadencesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Cadences</ThemedText>
      <ThemedText style={styles.body}>
        What are cadences? {/* Rhythms, patterns. Daily, weekly, yearly. Cadences help you manage your presence and can make it easier to stay consistent with your social habits. 
        You can customize your cadences to fit your lifestyle and preferences, making it easier to connect with others in a way that feels natural to you. */}
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

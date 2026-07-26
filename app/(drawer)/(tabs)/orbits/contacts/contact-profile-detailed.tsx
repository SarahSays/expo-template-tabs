/**
 * contact-profile-detailed.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { getFriend } from './_friendsStore';

/**
 * ContactProfileDetailed component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function ContactProfileDetailed() {
  const params = useLocalSearchParams();
  const id = String(params.id || '1');
  const friend = getFriend(id);
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  if (!friend) return null;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>{friend.name}</ThemedText>
      <View style={styles.section}>
        <ThemedText type="subtitle" lightColor="#2B0F55">Platform</ThemedText>
        <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans }}>{friend.platform}</ThemedText>

        <ThemedText type="subtitle" lightColor="#2B0F55" style={{ marginTop: 12 }}>Cadence</ThemedText>
        <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans }}>{friend.cadence || 'Not set'}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'flex-start' },
  section: { marginTop: 24, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8 },
});
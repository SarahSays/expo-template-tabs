/**
 * list-of-contacts.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { getFriends } from './_friendsStore';

/**
 * ListOfContacts component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function ListOfContacts() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  const friends = getFriends();

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Contacts</ThemedText>
      <View style={styles.section}>
        {friends.map((f) => (
          <Pressable key={f.id} onPress={() => router.push(`/orbits/contacts/${f.id}`)} style={styles.contactRow}>
            <View>
              <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>{f.name}</ThemedText>
              <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans }}>{f.platform} · {f.cadence}</ThemedText>
            </View>
            <ThemedText type="link">›</ThemedText>
          </Pressable>
        ))}
      </View>
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
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)'
  }
});
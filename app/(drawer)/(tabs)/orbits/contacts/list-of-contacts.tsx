/**
 * list-of-contacts.tsx
 *
 * File-level documentation comment.
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
 * Renders the UI for the ListOfContacts.
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
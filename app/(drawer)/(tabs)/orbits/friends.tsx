/**
 * friends.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { getFriends } from './contacts/_friendsStore';

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
export const screenOptions = {
  title: 'Friends',
  headerBackTitle: '',
  headerRight: undefined,
};

/**
 * FriendsScreen
 * @description Shows the user's friends and their connected platform.
 */
/**
 * FriendsScreen component.
 *
 * Renders the UI for the Friends screen.
 */
export default function FriendsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  const friends = getFriends();

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Friends</ThemedText>
      <View style={styles.list}>
        {friends.map((f) => (
          <Pressable
            key={f.id}
            style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]}
            onPress={() => router.push(`/orbits/contacts/${f.id}`)}
          >
            <View style={styles.rowContent}>
              <View
                style={[
                  styles.statusDot,
                  f.status === 'online' ? styles.onlineDot : styles.offlineDot,
                ]}
              />
              <View style={styles.rowMeta}>
                <ThemedText
                  type="defaultSemiBold"
                  lightColor="#2B0F55"
                  style={{ fontFamily: fonts.sansBold, lineHeight: 20 }}
                >
                  {f.name}
                </ThemedText>
                <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 20 }}>
                  •
                </ThemedText>
                <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 20 }}>
                  {f.platform}
                </ThemedText>
                <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 20 }}>
                  •
                </ThemedText>
                <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 20 }}>
                  {f.cadence}
                </ThemedText>
              </View>
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
  list: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: 10,
    minHeight: 52,
  },
  rowPressed: { backgroundColor: 'rgba(0,0,0,0.08)' },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 6,
    flex: 1,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  onlineDot: { backgroundColor: '#34D399' },
  offlineDot: { backgroundColor: '#9CA3AF' },
});

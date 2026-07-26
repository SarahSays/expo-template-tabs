/**
 * friends.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { getBirthdayPromptSettings } from './contacts/_birthdayPromptStore';
import { formatBirthdayForDisplay, getFriends, getTodaysBirthdayFriends } from './contacts/_friendsStore';

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
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function FriendsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  const friends = getFriends();
  const birthdaySettings = getBirthdayPromptSettings();
  const todaysBirthdays = getTodaysBirthdayFriends();

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Friends</ThemedText>

      {birthdaySettings.promptOnBirthday && todaysBirthdays.length > 0 ? (
        <View style={[styles.birthdayPromptCard, { backgroundColor: theme.bubbleBackground }]}> 
          <ThemedText type="defaultSemiBold" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>
            Birthday reminder
          </ThemedText>
          <ThemedText lightColor="#2B0F55" style={{ marginTop: 4 }}>
            {todaysBirthdays.map((friend) => friend.name).join(', ')} has a birthday today.
          </ThemedText>

          <View style={styles.promptActionRow}>
            {birthdaySettings.enablePrefilledWishPush ? (
              <Pressable
                onPress={() => {
                  const friend = todaysBirthdays[0];
                  if (!friend) return;
                  router.push({
                    pathname: '/feed/write-message',
                    params: {
                      name: friend.name,
                      draft: `Happy birthday ${friend.name}! Hope your day is amazing.`,
                    },
                  });
                }}
                style={styles.promptActionButton}
              >
                <ThemedText style={styles.promptActionText}>Send pre-filled wish</ThemedText>
              </Pressable>
            ) : null}

            {birthdaySettings.enablePrewrittenReplyPush ? (
              <Pressable
                onPress={() => {
                  const friend = todaysBirthdays[0];
                  if (!friend) return;
                  router.push({
                    pathname: '/feed/write-message',
                    params: {
                      name: friend.name,
                      draft: `Hey ${friend.name}, wishing you a very happy birthday from all of us.`,
                    },
                  });
                }}
                style={[styles.promptActionButton, styles.promptSecondaryButton]}
              >
                <ThemedText style={styles.promptActionText}>Use pre-written reply</ThemedText>
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}

      <View style={styles.list}>
        {friends.map((f) => (
          <Pressable
            key={f.id}
            style={({ pressed }) => [
              styles.row,
              { backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground },
            ]}
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
                <View style={styles.rowInfoLine}>
                  <ThemedText
                    type="defaultSemiBold"
                    lightColor="#2B0F55"
                    style={{ fontFamily: fonts.sansBold, lineHeight: 24 }}
                  >
                    {f.name}
                  </ThemedText>
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 24 }}>
                    •
                  </ThemedText>
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 24 }}>
                    {f.platform}
                  </ThemedText>
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 24 }}>
                    •
                  </ThemedText>
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 24 }}>
                    {f.cadence}
                  </ThemedText>
                </View>
                <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, fontSize: 12 }}>
                  Birthday: {formatBirthdayForDisplay(f.birthday)}
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
  birthdayPromptCard: {
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  promptActionRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  promptActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#0A84FF',
  },
  promptSecondaryButton: {
    backgroundColor: '#345A93',
  },
  promptActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    flex: 1,
  },
  rowInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  onlineDot: { backgroundColor: '#34D399' },
  offlineDot: { backgroundColor: '#9CA3AF' },
});

/**
 * friends.tsx
 *
 * Maintainer notes: 
 * This route file is intentionally lightweight and focused on screen composition. 
 * Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { getBirthdayPromptSettings } from './contacts/_birthdayPromptStore';
import { formatBirthdayForDisplay, getFriends, getTodaysBirthdayFriends } from './contacts/_friendsStore';

type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const platformIcons: Record<string, { name: MaterialCommunityIconName; color: string }> = {
  Instagram: { name: 'instagram', color: '#E1306C' },
  Signal: { name: 'message', color: '#3A76F0' },
  Discord: { name: 'controller', color: '#5865F2' },
  SMS: { name: 'message-text-outline', color: '#0F766E' },
  Facebook: { name: 'facebook-messenger', color: '#0084FF' },
  Bluesky: { name: 'butterfly', color: '#1DA1F2' },
  'G-Message': { name: 'gmail', color: '#EA4335' },
  Telegram: { name: 'send', color: '#229ED9' },
  default: { name: 'message-text', color: '#6B7280' },
};
const telegramColor = '#229ED9';

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
 * Renders this route UI and centralizes local interaction and state wiring.
 * Maintainer guidance:
 * - Keep side effects near the top-level component for visibility.
 * - Treat this component as the route contract for downstream navigation and params.
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
                    pathname: '/inbox/write-message',
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
                    pathname: '/inbox/write-message',
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
              <View style={styles.avatar}>
                <ThemedText style={[styles.avatarInitials, { color: theme.bubbleText, fontFamily: fonts.sansBold }]}>
                  {f.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </ThemedText>
                <View style={[styles.platformMarker, { backgroundColor: f.platform === 'Telegram' ? telegramColor : (platformIcons[f.platform] ?? platformIcons.default).color }]}>
                  {f.platform === 'Telegram' ? (
                    <MaterialIcons name="send" size={12} color="#fff" />
                  ) : (
                    <MaterialCommunityIcons name={(platformIcons[f.platform] ?? platformIcons.default).name} size={12} color="#fff" />
                  )}
                </View>
              </View>
              <View style={styles.rowMeta}>
                <View style={styles.rowInfoLine}>
                  <View
                    accessibilityLabel={f.status === 'online' ? 'Online' : 'Offline'}
                    style={[styles.statusDot, f.status === 'online' ? styles.onlineDot : styles.offlineDot]}
                  />
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
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 24 }}>
                    {f.platform}
                  </ThemedText>
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, lineHeight: 24 }}>
                    •
                  </ThemedText>
                  <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 24 }}>
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
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#9CA3AF',
  },
  avatarInitials: {
    fontSize: 15,
  },
  platformMarker: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onlineDot: {
    backgroundColor: '#34D399',
  },
  offlineDot: {
    backgroundColor: '#9CA3AF',
  },
});

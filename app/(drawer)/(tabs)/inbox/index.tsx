import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { getFriends } from '../orbits/contacts/_friendsStore';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
const platformIcons: Record<string, { name: IconName; color: string }> = {
  Instagram: { name: 'instagram', color: '#E1306C' },
  Signal: { name: 'message', color: '#3A76F0' },
  Discord: { name: 'controller', color: '#5865F2' },
  SMS: { name: 'message-text-outline', color: '#0F766E' },
  Facebook: { name: 'facebook-messenger', color: '#0084FF' },
  Bluesky: { name: 'butterfly', color: '#1DA1F2' },
  'G-Message': { name: 'gmail', color: '#EA4335' },
  default: { name: 'message-text', color: '#6B7280' },
};
const telegramColor = '#229ED9';
const timestamps = ['2:02 PM', '12:31 PM', 'Monday', 'Saturday', 'Friday'];

export const screenOptions = { title: 'Inbox', headerBackTitle: '', headerShown: true };

export default function InboxScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };
  const threads = useMemo(() => getFriends().map((friend, index) => {
    const platform = platformIcons[friend.platform] ?? platformIcons.default;
    return {
      ...friend,
      initials: friend.name.split(' ').map((part) => part[0]).slice(0, 2).join(''),
      preview: `Hello from ${friend.platform}!`,
      time: timestamps[index % timestamps.length],
      platformIcon: platform.name,
      platformColor: friend.platform === 'Telegram' ? telegramColor : platform.color,
    };
  }), []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Inbox</ThemedText>
        {/* <ThemedText style={styles.subtitle}>Private conversations with your people.</ThemedText> */}
        <Pressable
          style={({ pressed }) => [styles.notesRow, { backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground }]}
          onPress={() => router.push('/inbox/notes')}
        >
          <View style={[styles.notesIcon, { backgroundColor: theme.tint }]}>
            <MaterialCommunityIcons name="note-text-outline" size={22} color="#fff" />
          </View>
          <View style={styles.threadMeta}>
            <ThemedText type="defaultSemiBold" style={{ fontFamily: fonts.sansBold }}>Notes to self</ThemedText>
            {/* <ThemedText style={styles.preview}>Your private notes</ThemedText> */}
          </View>
          <ThemedText type="link">›</ThemedText>
        </Pressable>
        <View style={styles.threadList}>
          {threads.map((thread) => (
            <Pressable
              key={thread.id}
              onPress={() => router.push({ pathname: '/inbox/write-message', params: { name: thread.name } })}
              style={({ pressed }) => [styles.threadRow, { backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground }]}
            >
              <View style={styles.threadLeft}>
                <View style={styles.avatar}>
                  <ThemedText style={[styles.avatarInitials, { color: theme.bubbleText, fontFamily: fonts.sansBold }]}>{thread.initials}</ThemedText>
                  <View style={[styles.platformMarker, { backgroundColor: thread.platformColor }]}>
                    {thread.platform === 'Telegram' ? (
                      <MaterialIcons name="send" size={12} color="#fff" />
                    ) : (
                      <MaterialCommunityIcons name={thread.platformIcon} size={12} color="#fff" />
                    )}
                  </View>
                </View>
                <View style={styles.threadMeta}>
                  <ThemedText type="subtitle" style={[styles.threadName, { fontFamily: fonts.sansBold }]}>{thread.name}</ThemedText>
                  <ThemedText style={styles.preview} numberOfLines={1}>{thread.preview}</ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.time, { color: theme.drawerInactiveText }]}>{thread.time}</ThemedText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 16, paddingBottom: 92 },
  subtitle: { marginTop: 2, marginBottom: 16, opacity: 0.75 },
  notesRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, marginBottom: 14, gap: 12 },
  notesIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  threadList: { gap: 10 },
  threadRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 16 },
  threadLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12, backgroundColor: '#9CA3AF' },
  avatarInitials: { fontSize: 15 },
  platformMarker: { position: 'absolute', right: -2, bottom: -2, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  threadMeta: { flex: 1, minWidth: 0 },
  threadName: { marginBottom: 2 },
  preview: { fontSize: 13, opacity: 0.75 },
  time: { fontSize: 12 },
});

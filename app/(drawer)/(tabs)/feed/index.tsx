/**
 * index.tsx
 *
 * File-level documentation comment.
 */
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { getFriends } from '../orbits/contacts/_friendsStore';

const platformIcons: Record<string, { name: string; color: string }> = {
  Instagram: { name: 'instagram', color: '#E1306C' },
  Signal: { name: 'message', color: '#3A76F0' },
  Discord: { name: 'controller', color: '#5865F2' },
  SMS: { name: 'message-text-outline', color: '#0F766E' },
  Facebook: { name: 'facebook-messenger', color: '#0084FF' },
  Bluesky: { name: 'butterfly', color: '#1DA1F2' },
  'G-Message': { name: 'gmail', color: '#EA4335' },
  default: { name: 'message-text', color: '#6B7280' },
};

const timestamps = ['2:02 PM', '12:31 PM', 'Monday', 'Saturday', 'Friday'];

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
 export const screenOptions = {
  title: 'Feed',
  headerBackTitle: '',
  headerShown: true,
};

/**
 * Feed screen component.
 */
export default function FeedScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  const friends = useMemo(() => getFriends(), []);
  const interactions = useMemo(
    () => friends.map((friend, index) => {
      const platformData = platformIcons[friend.platform] ?? platformIcons.default;
      return {
        id: friend.id,
        name: friend.name,
        preview: `Hello from ${friend.platform}`,
        time: timestamps[index % timestamps.length],
        initials: friend.name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join(''),
        platformIcon: platformData.name,
        platformColor: platformData.color,
      };
    }),
    [friends],
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Feed</ThemedText>

        <Pressable
          style={({ pressed }) => [
            styles.menuCard,
            { backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground },
          ]}
          onPress={() => router.push('/feed/notes')}
        >
          <View style={styles.menuCardText}>
            <ThemedText type="subtitle" style={styles.menuCardTitle}>📝 Notes to self</ThemedText>
          </View>
          <ThemedText type="link">›</ThemedText>
        </Pressable>

        <View style={styles.interactionList}>
          {interactions.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push(`/orbits/contacts/${item.id}`)}
              style={({ pressed }) => [
                styles.interactionRow,
                { backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground },
              ]}
            >
              <View style={styles.interactionLeft}>
                <View style={[styles.avatar, { backgroundColor: '#9CA3AF' }]}> 
                  <ThemedText style={[styles.avatarInitials, { color: theme.bubbleText, fontFamily: fonts.sansBold }]}>{item.initials}</ThemedText>
                  <View style={[styles.platformMarker, { backgroundColor: item.platformColor }]}> 
                    <MaterialCommunityIcons name={item.platformIcon} size={12} color="#fff" />
                  </View>
                </View>

                <View style={styles.interactionMeta}>
                  <ThemedText type="subtitle" style={[styles.interactionName, { fontFamily: fonts.sansBold }]}>{item.name}</ThemedText>
                  <ThemedText style={[styles.interactionPreview, { color: theme.text }]} numberOfLines={1}>{item.preview}</ThemedText>
                </View>
              </View>

              <ThemedText style={[styles.interactionTime, { color: theme.drawerInactiveText }]}>{item.time}</ThemedText>
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
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 79,
    justifyContent: 'flex-start',
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  menuCardText: {
    flex: 1,
    marginRight: 12,
  },
  menuCardTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  menuCardDescription: {
    color: '#6B7280',
    fontSize: 13,
  },
  interactionList: {
    marginTop: 0,
  },
  interactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  interactionRowPressed: {
    opacity: 0.92,
  },
  interactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
  interactionMeta: {
    flex: 1,
    minWidth: 0,
  },
  interactionName: {
    marginBottom: 2,
  },
  interactionPreview: {
    color: '#6B7280',
    fontSize: 13,
  },
  interactionTime: {
    fontSize: 12,
  },
});
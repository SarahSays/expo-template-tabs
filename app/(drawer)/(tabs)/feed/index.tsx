import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
const platformStyles: Record<string, { icon: IconName; color: string }> = {
  Facebook: { icon: 'facebook', color: '#1877F2' },
  X: { icon: 'twitter', color: '#111827' },
  Bluesky: { icon: 'butterfly', color: '#1DA1F2' },
};

const publicPosts = [
  { id: 'post-1', author: 'Avery', friendId: '1', handle: '@maya.exit', platform: 'Bluesky', time: '2h', text: 'Public field notes from the co-op this morning — harvest share this week has chard, three kinds of squash, and the usual optimism.', replies: 41, reposts: 62, likes: 248 },
  { id: 'post-2', author: 'Billie', friendId: '2', handle: 'Billie Eyelash', platform: 'Facebook', time: '4h', text: 'Finally finished the little free-library map for the neighborhood. If you have a favorite stop, add it to the comments!', replies: 18, reposts: 7, likes: 93 },
  { id: 'post-3', author: 'Casey', friendId: '3', handle: '@casey_reads', platform: 'X', time: '1d', text: 'A reminder that a rainy afternoon and a good fantasy novel are a perfectly valid weekend plan.', replies: 12, reposts: 5, likes: 76 },
];

export const screenOptions = { title: 'Feed', headerBackTitle: '', headerShown: true };

export default function FeedScreen() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.tint}
            colors={[theme.tint]}
            title={refreshing ? 'Refreshing feed…' : undefined}
            titleColor={theme.drawerInactiveText}
          />
        }
      >
        <ThemedText type="title">Feed</ThemedText>
        <ThemedText style={styles.subtitle}>Public posts from your connected networks.</ThemedText>
        {publicPosts.map((post) => {
          const platform = platformStyles[post.platform] ?? { icon: 'earth' as IconName, color: theme.tint };
          return (
            <View key={post.id} style={[styles.postCard, { backgroundColor: colorScheme === 'dark' ? '#1B1B22' : '#fff', borderColor: colorScheme === 'dark' ? '#30303A' : '#E5E7EB' }]}>
              <View style={styles.postHeader}>
                <View style={[styles.avatar, { backgroundColor: platform.color }]}>
                  <ThemedText style={styles.avatarInitial}>{post.author.slice(0, 1)}</ThemedText>
                </View>
                <View style={styles.authorInfo}>
                  <View style={styles.authorLine}>
                    <Link href={{ pathname: '/feed/contacts/[id]', params: { id: post.friendId } }}>
                      <ThemedText type="defaultSemiBold" style={{ fontFamily: fonts.sansBold }}>{post.author}</ThemedText>
                    </Link>
                    <View style={styles.publicIndicator}>
                      <MaterialCommunityIcons name="earth" size={12} color={theme.tint} />
                      <ThemedText style={[styles.publicLabel, { color: theme.tint }]}>Public</ThemedText>
                    </View>
                  </View>
                  <ThemedText style={[styles.meta, { color: theme.drawerInactiveText }]}>{post.handle} · {post.time}</ThemedText>
                </View>
                <View style={[styles.platformIcon, { backgroundColor: `${platform.color}22` }]}>
                  <MaterialCommunityIcons name={platform.icon} size={19} color={platform.color} />
                </View>
              </View>
              <ThemedText style={styles.postText}>{post.text}</ThemedText>
              <View style={styles.engagementRow}>
                <ThemedText style={[styles.engagement, { color: theme.drawerInactiveText }]}><MaterialCommunityIcons name="heart-outline" size={13} color={theme.drawerInactiveText} /> {post.likes}</ThemedText>
                <ThemedText style={[styles.engagement, { color: theme.drawerInactiveText }]}><MaterialCommunityIcons name="message-reply-outline" size={13} color={theme.drawerInactiveText} /> {post.replies} replies</ThemedText>
                <ThemedText style={[styles.engagement, { color: theme.drawerInactiveText }]}><MaterialCommunityIcons name="repeat" size={13} color={theme.drawerInactiveText} /> {post.reposts} reposts</ThemedText>
              </View>
            </View>
          );
        })}
        <ThemedText style={styles.disclaimer}>Demo posts shown for layout purposes. A live feed would include public posts shared by connected accounts.</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 16, paddingBottom: 92, gap: 12 },
  subtitle: { marginTop: -8, marginBottom: 4, opacity: 0.75 },
  postCard: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 12 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { color: '#fff', fontSize: 18, fontWeight: '700' },
  authorInfo: { flex: 1, minWidth: 0 },
  authorLine: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  publicIndicator: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  publicLabel: { fontSize: 12, fontWeight: '600' },
  meta: { fontSize: 12, marginTop: 1 },
  platformIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  postText: { fontSize: 15, lineHeight: 22 },
  engagementRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, paddingTop: 2 },
  engagement: { fontSize: 12 },
  disclaimer: { marginTop: 2, paddingHorizontal: 2, fontSize: 12, lineHeight: 18, opacity: 0.65 },
});

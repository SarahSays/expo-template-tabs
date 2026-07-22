/**
 * index.tsx
 *
 * File-level documentation comment.
 */
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';

const recommendations = [
  { title: 'The Good Place', type: 'TV', platform: 'Netflix', from: 'Avery' },
  { title: 'Superman', type: 'Movie', platform: 'Amazon', from: 'Billie' },
];

const menuItems = [
  { title: 'Awards', description: 'Check your streaks', href: '/recs/awards' },
  { title: '+ Add a Recommendation', description: 'Who recommended it?', href: '/recs/addarec' },
] as const;

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
 export const screenOptions = {
  title: 'Recs',
  headerShown: false,
}; 

/**
 * screenOptions
 * @description Navigation options for the Recs screen group.
 */

/**
 * RecsScreen
 * @description Shows the recommendations menu and an embedded demo list.
 * Includes a pull-to-refresh demo handler; data is currently demo-only and transient.
 * @returns {JSX.Element} The Recs index screen.
 */
/**
 * RecsScreen component.
 *
 * Renders the UI for the Recs screen.
 */
export default function RecsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Demo refresh - no remote data yet. Keep spinner briefly.
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
            colors={[theme.tint]}
          />
        }
      >
        {/* <ThemedText type="title">Recs</ThemedText> */}
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [
                styles.menuItem,
                { backgroundColor: theme.bubbleBackground },
                pressed && { backgroundColor: theme.bubbleBackgroundPressed },
              ]}
              onPress={() => router.push(item.href)}>
              <View style={styles.menuText}>
                <ThemedText type="subtitle">{item.title}</ThemedText>
                <ThemedText>{item.description}</ThemedText>
              </View>
              <ThemedText type="link">›</ThemedText>
            </Pressable>
          ))}
        </View>
        <View style={{ marginTop: 6 }}>
          <ThemedText type="subtitle">Sample Recommendations:</ThemedText>
          {recommendations.map((rec) => (
            <View key={rec.title} style={[styles.card, { backgroundColor: theme.bubbleBackground }]}> 
              <ThemedText style={[styles.cardTitle, { color: theme.text, fontFamily: fonts.sansBold }]}>{rec.title}</ThemedText>
              <ThemedText style={[styles.cardDetail, { color: theme.icon, fontFamily: fonts.sans }]}>{rec.type} · {rec.platform}</ThemedText>
              <ThemedText style={[styles.cardFrom, { color: theme.drawerInactiveText, fontFamily: fonts.sans }]}>Recommended by {rec.from}</ThemedText>
            </View>
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
    justifyContent: 'flex-start',
  },
  menu: {
    marginTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: 12,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuText: {
    flex: 1,
    marginRight: 12,
  },
  card: {
    marginLeft: 32,
    marginRight: 16,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardFrom: {
    fontSize: 13,
  },
});
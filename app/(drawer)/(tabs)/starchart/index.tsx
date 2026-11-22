/**
 * index.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

const menuItems = [
  { title: 'Share', description: 'Share to social media', href: '/starchart/share' },
  { title: 'Pinch & Zoom', description: 'Zoom in on celestial objects', href: '/starchart/pinch-zoom' },
  { title: 'Time slider', description: 'Adjust the time to see celestial changes', href: '/starchart/star-chart' },
  { title: 'History', description: 'View reach-out events', href: '/starchart/history' },

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
 * StarChartScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function StarChartScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <ThemedText type="title">Star Chart</ThemedText> */}
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [
                styles.menuItem,
                {
                  backgroundColor: pressed ? theme.bubbleBackgroundPressed : theme.bubbleBackground,
                },
              ]}
              onPress={() => router.push(item.href)}>
              <View style={styles.menuText}>
                <ThemedText type="subtitle" style={{ color: theme.bubbleText }}>{item.title}</ThemedText>
                <ThemedText style={{ color: theme.bubbleText }}>{item.description}</ThemedText>
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
    marginBottom: 12,
  },
  menuText: {
    flex: 1,
    marginRight: 12,
  },
});
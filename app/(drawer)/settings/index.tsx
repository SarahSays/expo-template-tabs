/**
 * index.tsx
 *
 * File-level documentation comment.
 */
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const menuItems = [
  { title: 'Preferences', description: 'Adjust app behavior and defaults.', href: '/(drawer)/settings/preferences' },
  { title: 'Appearance', description: 'Change theme, colors, and layout.', href: '/(drawer)/settings/appearance' },
  { title: 'Privacy & Security', description: 'Manage privacy and security settings.', href: '/(drawer)/settings/privacy-security' },
  { title: 'Help', description: 'View support resources and FAQs.', href: '/(drawer)/settings/help' },
] as const;

/* export const screenOptions = {
  title: 'Settings',
}; */

/**
 * SettingsScreen component.
 *
 * Renders the UI for the Settings screen.
 */
export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Settings</ThemedText>
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [
                styles.menuItem,
                pressed ? styles.menuItemPressed : null,
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
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: 12,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  menuText: {
    flex: 1,
    marginRight: 12,
  },
});

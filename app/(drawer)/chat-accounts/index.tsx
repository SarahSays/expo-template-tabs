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
  { title: 'Discord', href: '/chat-accounts/discord' },
  { title: 'Google Messages', href: '/chat-accounts/google-messages' },
  { title: 'Instagram', href: '/chat-accounts/instagram' },
  { title: 'LinkedIn', href: '/chat-accounts/linkedin' },
  { title: 'Messenger', href: '/chat-accounts/messenger' },
  { title: 'RCS', href: '/chat-accounts/rcs' },
  { title: 'Signal', href: '/chat-accounts/signal' },
  { title: 'Slack', href: '/chat-accounts/slack' },
  { title: 'SMS', href: '/chat-accounts/sms' },
  { title: 'Telegram', href: '/chat-accounts/telegram' },
  { title: 'WhatsApp', href: '/chat-accounts/whatsapp' },
] as const;

/* export const screenOptions = {
  title: 'Chat Accounts',
}; */

/**
 * ChatAccountsScreen
 * @description Lists available chat account integrations and navigates
 * to the respective account connection screens. Entries are alphabetized
 * for discoverability.
 * @returns {JSX.Element} The Chat Accounts menu screen.
 */
/**
 * ChatAccountsScreen component.
 *
 * Renders the UI for the ChatAccounts screen.
 */
export default function ChatAccountsScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Chat Accounts</ThemedText>
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

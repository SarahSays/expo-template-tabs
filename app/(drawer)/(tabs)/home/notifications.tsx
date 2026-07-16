/**
 * notifications.tsx
 *
 * File-level documentation comment.
 */
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
export const screenOptions = {
  title: 'Turn on Notifications',
  headerShown: false,
};

/**
 * NotificationsScreen component.
 *
 * Renders the UI for the notification permission prompt.
 */
export default function NotificationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <ThemedText type="title" style={[styles.titleText, { color: theme.tint }]}>Turn on Notifications</ThemedText>
            <View style={[styles.graphicPlaceholder, { backgroundColor: colorScheme === 'dark' ? '#14101F' : '#F3F4F6' }]} />
            <Pressable
              onPress={() => router.push('/home/modal')}
              style={({ pressed }) => [
                styles.ctaButton,
                { backgroundColor: theme.tint },
                pressed && styles.ctaButtonPressed,
              ]}>
              <ThemedText style={styles.ctaButtonText}>Allow notifications</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    gap: 28,
    marginTop: 24,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
  },
  graphicPlaceholder: {
    width: 300,
    height: 300,
    borderRadius: 180,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 340,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 560,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonPressed: {
    opacity: 0.9,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
/**
 * notifications.tsx
 *
 * File-level documentation comment.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';

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
      <KeyboardAvoidingContainer style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <ThemedText type="title" style={styles.titleText}>Turn on Notifications</ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.heroImage} />
            <Pressable
              onPress={() => router.push('/home/modal')}
              style={({ pressed }) => [
                styles.ctaButton,
                { backgroundColor: Colors.light.tint },
                pressed && styles.ctaButtonPressed,
              ]}>
              <ThemedText style={styles.ctaButtonText}>Allow notifications</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingContainer>
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
  },
  heroImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
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
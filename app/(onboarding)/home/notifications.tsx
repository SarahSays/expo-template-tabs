/**
 * notifications.tsx
 *
 * Maintainer notes:
 * - This route file is intentionally lightweight and focused on screen composition.
 * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
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
 * Renders this route UI and centralizes local interaction and state wiring.
 * Maintainer guidance:
 * - Keep side effects near the top-level component for visibility.
 * - Treat this component as the route contract for downstream navigation and params.
 */
export default function NotificationsScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const [showDemoPrompt, setShowDemoPrompt] = useState(false);

  const handleAllowNotificationsPress = () => setShowDemoPrompt(true);

  const handleDemoDecision = (decision: 'allow' | 'deny') => {
    setShowDemoPrompt(false);
    router.replace({
      pathname: '/home/username',
      params: { email: email ?? '', notificationsEnabled: decision === 'allow' ? 'true' : 'false' },
    });
  };

  const skipNotifications = () => {
    router.replace({ pathname: '/home/username', params: { email: email ?? '', notificationsEnabled: 'false' } });
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingContainer style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <ThemedText type="title" style={styles.titleText}>Turn on Notifications</ThemedText>
            <Image source={require('@/assets/images/react-logo3x.png')} style={styles.heroImage} />
            <Pressable
              onPress={handleAllowNotificationsPress}
              style={({ pressed }) => [
                styles.ctaButton,
                { backgroundColor: Colors.light.tint },
                pressed && styles.ctaButtonPressed,
              ]}>
              <ThemedText style={styles.ctaButtonText}>Allow notifications</ThemedText>
            </Pressable>
            <Pressable onPress={skipNotifications} style={styles.skipButton}>
              <ThemedText style={[styles.skipButtonText, { color: theme.tint }]}>Not now</ThemedText>
            </Pressable>
            <ThemedText style={styles.demoNote}>Demo only — this does not request real device permission.</ThemedText>
          </View>
        </ScrollView>

        {showDemoPrompt ? (
          <View style={styles.promptOverlay}>
            <View style={styles.promptCard}>
              <ThemedText style={styles.promptTitle}>Allow Orbits to send you notifications?</ThemedText>

              <Pressable
                onPress={() => handleDemoDecision('allow')}
                style={[styles.promptButton, styles.promptAllowButton]}
              >
                <ThemedText style={styles.promptButtonText}>Allow</ThemedText>
              </Pressable>

              <Pressable
                onPress={() => handleDemoDecision('deny')}
                style={[styles.promptButton, styles.promptDenyButton]}
              >
                <ThemedText style={styles.promptButtonText}>Not now</ThemedText>
              </Pressable>
            </View>
          </View>
        ) : null}
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
  skipButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  demoNote: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  resultText: {
    marginTop: -10,
    fontSize: 13,
    opacity: 0.85,
  },
  promptOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  promptCard: {
    width: '100%',
    maxWidth: 560,
    borderRadius: 28,
    backgroundColor: '#3E434A',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  promptTitle: {
    color: '#E5E7EB',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '500',
  },
  promptButton: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  promptAllowButton: {
    backgroundColor: '#B8BCF6',
  },
  promptDenyButton: {
    backgroundColor: '#B8BCF6',
  },
  promptButtonText: {
    color: '#353B67',
    fontSize: 17,
    fontWeight: '600',
  },
});
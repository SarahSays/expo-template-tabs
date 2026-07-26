/**
 * notifications.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function NotificationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const [demoMode, setDemoMode] = useState(true);
  const [showDemoPrompt, setShowDemoPrompt] = useState(false);
  const [permissionDecision, setPermissionDecision] = useState<'allow' | 'deny' | null>(null);

  const handleAllowNotificationsPress = () => {
    if (demoMode) {
      setShowDemoPrompt(true);
      return;
    }

    // Non-demo fallback keeps the previous route flow.
    // In production, this should call expo-notifications permission APIs.
    router.push('/home/modal');
  };

  const handleDemoDecision = (decision: 'allow' | 'deny') => {
    setPermissionDecision(decision);
    setShowDemoPrompt(false);

    if (decision === 'allow') {
      router.push('/home/username');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingContainer style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <ThemedText type="title" style={styles.titleText}>Turn on Notifications</ThemedText>
            <View style={styles.modeToggleRow}>
              <Pressable
                onPress={() => setDemoMode(true)}
                style={[styles.modeChip, demoMode ? styles.modeChipActive : styles.modeChipInactive]}
              >
                <ThemedText style={[styles.modeChipText, demoMode ? styles.modeChipTextActive : undefined]}>Demo prompt</ThemedText>
              </Pressable>
              <Pressable
                onPress={() => setDemoMode(false)}
                style={[styles.modeChip, !demoMode ? styles.modeChipActive : styles.modeChipInactive]}
              >
                <ThemedText style={[styles.modeChipText, !demoMode ? styles.modeChipTextActive : undefined]}>Live flow</ThemedText>
              </Pressable>
            </View>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.heroImage} />
            <Pressable
              onPress={handleAllowNotificationsPress}
              style={({ pressed }) => [
                styles.ctaButton,
                { backgroundColor: Colors.light.tint },
                pressed && styles.ctaButtonPressed,
              ]}>
              <ThemedText style={styles.ctaButtonText}>Allow notifications</ThemedText>
            </Pressable>
            {permissionDecision ? (
              <ThemedText style={styles.resultText}>
                Last demo decision: {permissionDecision === 'allow' ? 'Allowed' : "Don't allow"}
              </ThemedText>
            ) : null}
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
                <ThemedText style={styles.promptButtonText}>Don&apos;t allow</ThemedText>
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
  modeToggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modeChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  modeChipActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.22)',
    borderColor: 'rgba(147, 197, 253, 0.7)',
  },
  modeChipInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  modeChipTextActive: {
    color: '#E0E7FF',
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
/**
 * Home Stack Initial Screen - Email verification entry point
 * 
 * First screen in the home tab stack after user chooses to continue with email.
 * Prompts user to enter email address with security information.
 * Scope: Rendered within home stack (can navigate back to home tab index)
 * 
 * CRITICAL NAVIGATION:
 * - This screen is nested within the home/_layout.tsx stack
 * - Header is controlled by home/_layout.tsx (shows back button)
 * - Back button navigates to previous screen in home stack
 */

import { ExternalLink } from '@/components/external-link';
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, View } from 'react-native';

export const screenOptions = {
  title: '',
  headerShown: false,
};

/**
 * Renders email entry screen within home stack
 * 
 * @returns {React.ReactNode} Email verification entry interface
 * 
 * Features:
 * - Part of home tab stack navigation
 * - Back navigation via header (managed by home/_layout.tsx)
 * - Theme-aware styling
 */
/**
 * EmailEntryScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function EmailEntryScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  const continueWithEmail = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError('Enter a valid email address to continue.');
      return;
    }
    setEmailError('');
    router.push({ pathname: '/home/verification-code', params: { email: normalizedEmail } });
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingContainer style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <ThemedText type="title" style={styles.titleText}>
              Enter Your Email
            </ThemedText>
            <ThemedText style={[styles.subtitleText, { color: theme.text }]}>
              We’ll send a one-time code. New users will finish a short profile setup; returning users go straight to Inbox.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.heroImage} />
          </View>

          <View style={styles.inputSection}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={colorScheme === 'dark' ? '#7F7F95' : '#9CA3AF'}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={continueWithEmail}
              style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#14101F' : '#F3F4F6', color: theme.text }]}
            />
            {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}
            <Pressable
              onPress={continueWithEmail}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: Colors.light.tint },
                pressed && styles.buttonPressed,
              ]}>
              <ThemedText style={styles.buttonText}>Next</ThemedText>
            </Pressable>
          </View>

          <ExternalLink href="https://expo.dev/privacy">
            <ThemedText style={[styles.policyLink, { color: theme.tint }]}>Learn about security and privacy</ThemedText>
          </ExternalLink>
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
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 96,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitleText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  heroImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputSection: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {},
  buttonPressed: {
    opacity: 0.92,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  policyLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#D92D20',
    marginTop: -12,
    marginBottom: 12,
    textAlign: 'center',
  },
});
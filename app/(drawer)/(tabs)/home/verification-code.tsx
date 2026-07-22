/**
 * verification-code.tsx
 *
 * File-level documentation comment.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
export const screenOptions = {
  title: 'Enter code',
  headerShown: false,
};

/**
 * VerificationCodeScreen component.
 *
 * Renders the UI for the verification code entry screen.
 */
export default function VerificationCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  const digits = code.padEnd(6, ' ').split('');

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingContainer style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.headerSection}>
            <ThemedText type="title" style={styles.titleText}>Enter code</ThemedText>
            <ThemedText style={[styles.subtitleText, { color: theme.text }]}>Check your email for the sign in code.</ThemedText>
          </View>

          <Pressable style={styles.codeRow} onPress={() => inputRef.current?.focus()}>
            {digits.map((digit, index) => (
              <View key={index} style={[styles.codeCell, { borderColor: colorScheme === 'dark' ? '#333' : '#d1d5db' }]}>
                <ThemedText style={styles.codeCellText}>{digit.trim() || '\u00a0'}</ThemedText>
              </View>
            ))}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(value) => setCode(value.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={6}
            style={styles.hiddenInput}
            autoFocus
          />

          <View style={styles.actionSection}>
            <Pressable
              onPress={() => router.push('/home/notifications')}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: Colors.light.tint },
                pressed && styles.primaryButtonPressed,
              ]}>
              <ThemedText style={styles.primaryButtonText}>Sign In</ThemedText>
            </Pressable>

            <View style={styles.resendRow}>
              <ThemedText style={styles.resendText}>Didn&apos;t get a code?</ThemedText>
              <Pressable onPress={() => console.log('Resend code')}>
                <ThemedText style={[styles.resendLink, { color: theme.tint }]}>Resend</ThemedText>
              </Pressable>
            </View>
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 14,
  },
  subtitleText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    marginBottom: 32,
  },
  codeCell: {
    width: 52,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeCellText: {
    fontSize: 24,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  actionSection: {
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    width: '100%',
    maxWidth: 520,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 42,
  },
  primaryButtonPressed: {
    opacity: 0.92,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    gap: 8,
  },
  resendText: {
    color: '#9ca3af',
    fontSize: 15,
  },
  resendLink: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
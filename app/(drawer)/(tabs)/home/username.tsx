/**
 * username.tsx
 *
 * File-level documentation comment.
 */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, View } from 'react-native';

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
  title: 'Pick a Username',
  headerShown: false,
};

/**
 * UsernameScreen component.
 *
 * Renders the UI for choosing a username.
 */
export default function UsernameScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.heroSection}>
            <ThemedText type="title" style={styles.titleText}>Pick a Username</ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.heroImage} />
          </View>

          <View style={styles.inputSection}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor={colorScheme === 'dark' ? '#7F7F95' : '#9CA3AF'}
              style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#14101F' : '#F3F4F6', color: theme.text, borderColor: colorScheme === 'dark' ? '#333' : '#E5E7EB' }]}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              onPress={() => router.push('/home/connect-chats')}
              style={({ pressed }) => [
                styles.ctaButton,
                { backgroundColor: Colors.light.tint },
                pressed && styles.ctaButtonPressed,
              ]}>
              <ThemedText style={[styles.ctaButtonText, { color: '#fff' }]}>Next</ThemedText>
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
    justifyContent: 'flex-start',
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    gap: 18,
    marginTop: 24,
    marginBottom: 24,
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
  inputSection: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    gap: 16,
    marginTop: 16,
  },
  input: {
    width: '100%',
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonPressed: {
    opacity: 0.9,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
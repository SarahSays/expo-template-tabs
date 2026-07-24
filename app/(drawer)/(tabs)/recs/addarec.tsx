/**
 * addarec.tsx
 *
 * File-level documentation comment.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

// Keep RecItem for future typed data models (used in planned persistence)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RecItem = {
  id: string;
  title: string;
  media: string;
  platform: string;
  friend: string;
  createdAt: number;
};

/**
 * RecItem
 * @description Shape of a recommendation item used in the demo form.
 */

/**
 * AddaRecScreen
 * @description Demo screen that allows entering a recommendation.
 * This screen intentionally uses transient in-memory saves for the demo
 * to avoid requiring native AsyncStorage at runtime (works in Expo Go).
 * @returns {JSX.Element} The Add Recommendation screen.
 */
/**
 * AddaRecScreen component.
 *
 * Renders the UI for the AddaRec screen.
 */
export default function AddaRecScreen() {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState('');
  const [platform, setPlatform] = useState('');
  const [friend, setFriend] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  function clearForm() {
    setTitle('');
    setMedia('');
    setPlatform('');
    setFriend('');
  }

  async function saveEntry() {
    // Demo: build the new RecItem object. In a real app this would be
    // persisted or pushed into shared state. Example future hooks:
    //
    // const item: RecItem = {
    //   id: String(Date.now()),
    //   title: title || 'Untitled',
    //   media: media || 'Unknown',
    //   platform: platform || 'Unknown',
    //   friend: friend || 'Unknown',
    //   createdAt: Date.now(),
    // };
    //
    // // Option A: in-memory singleton (quick demo)
    // RecsStore.add(item);
    //
    // // Option B: React Context provider (recommend for app-wide state)
    // recsContext.addRec(item);
    //
    // // Option C: persistent storage
    // await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, item]));
    //
    // The demo currently shows a confirmation and clears the form.
    
    clearForm();
    setSavedMessage('Saved');
    setTimeout(() => setSavedMessage(''), 1500);
  }

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <KeyboardAvoidingContainer style={[styles.container, { backgroundColor: isDark ? '#0F0A1A' : '#E8F4FF' }]}>
      <ThemedView style={[styles.container, { backgroundColor: isDark ? '#0F0A1A' : '#E8F4FF' }]}>
        <ThemedText type="title" style={styles.title}>Add a Recommendation</ThemedText>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Title</ThemedText>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. The Good Place"
          placeholderTextColor={isDark ? '#999' : '#666'}
          style={[
            styles.input,
            { color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#111' : '#fff', borderColor: isDark ? '#333' : '#ccc' },
          ]}
        />

        <ThemedText type="subtitle">What media?</ThemedText>
        <TextInput
          value={media}
          onChangeText={setMedia}
          placeholder="TV / Movie / Book / Game"
          placeholderTextColor={isDark ? '#999' : '#666'}
          style={[
            styles.input,
            { color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#111' : '#fff', borderColor: isDark ? '#333' : '#ccc' },
          ]}
        />

        <ThemedText type="subtitle">What platform?</ThemedText>
        <TextInput
          value={platform}
          onChangeText={setPlatform}
          placeholder="Netflix / Hulu / Amazon"
          placeholderTextColor={isDark ? '#999' : '#666'}
          style={[
            styles.input,
            { color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#111' : '#fff', borderColor: isDark ? '#333' : '#ccc' },
          ]}
        />

        <ThemedText type="subtitle">Who recommended it?</ThemedText>
        <TextInput
          value={friend}
          onChangeText={setFriend}
          placeholder="Write a Friend"
          placeholderTextColor={isDark ? '#999' : '#666'}
          style={[
            styles.input,
            { color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#111' : '#fff', borderColor: isDark ? '#333' : '#ccc' },
          ]}
        />

        <TouchableOpacity onPress={saveEntry} style={styles.doneButton}>
          <ThemedText type="subtitle" style={styles.doneButtonText}>Done</ThemedText>
        </TouchableOpacity>

        {savedMessage ? (
          <View style={styles.savedBox}>
            <ThemedText>{savedMessage}</ThemedText>
          </View>
        ) : null}
      </ThemedView>

      {/* Persistent saved list currently removed for demo */}
      </ThemedView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    marginLeft: 16,
    marginTop: 16,
  },
  section: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 12,
  },
  doneButton: {
    marginTop: 16,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#0A84FF',
    borderRadius: 6,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  savedBox: { marginTop: 12 },
});
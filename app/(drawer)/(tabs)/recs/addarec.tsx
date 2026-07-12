/**
 * addarec.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import {
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);
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

  const sampleFriends = ['Alice', 'Bob', 'Charlie', 'Dana'];
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add a Recommendation</ThemedText>

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
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.pickerButton}
        >
          <ThemedText>{friend || 'Pick a Friend'}</ThemedText>
        </TouchableOpacity>

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

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={[styles.modalContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.6)' }] }>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#111' : '#fff', borderColor: '#0A84FF' }]}>
            <ThemedText type="title">Pick a Friend</ThemedText>
            {sampleFriends.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setFriend(item);
                  setModalVisible(false);
                }}
                style={styles.friendRow}
              >
                <ThemedText>{item}</ThemedText>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.doneButton, { marginTop: 12 }]}
            >
              <ThemedText style={styles.doneButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  section: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 12,
  },
  pickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#0A84FF',
    borderRadius: 6,
    marginTop: 8,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    margin: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0A84FF',
    borderRadius: 8,
    maxHeight: '80%'
  },
  friendRow: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
});
/**
 * NotesScreen
 *
 * Demo-mode replacement for a self-messaging note thread.
 *
 * Design intent:
 * - the page behaves like a lightweight messenger thread, but it is only a
 *   local demo experience for the Expo app
 * - each note is stored in a simple AsyncStorage-backed list so the state
 *   survives app reloads while the app is still in demo mode
 * - the layout is intentionally simple and easy to swap later for a real
 *   backend or a more advanced persisted chat abstraction
 *
 * Future maintainer note:
 * if this screen becomes production-ready, replace the `AsyncStorage` demo
 * store with a real API or a repository layer and keep the UI contract (the
 * same note shape and timestamped bubbles) intact.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type NoteEntry = {
  id: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'demo-note-to-self-thread';

// Demo seed data so the thread has a natural “messenger” feel on first load.
const DEMO_NOTES: NoteEntry[] = [
  {
    id: 'demo-1',
    text: 'Check the lunch plan before the afternoon call.',
    createdAt: '9:12 AM',
  },
  {
    id: 'demo-2',
    text: 'Remember to send the updated meeting notes to Avery.',
    createdAt: '9:14 AM',
  },
];

/**
 * Attempts to read the demo thread from a persistent store.
 *
 * In production this would use a real repository, but in demo mode the goal is
 * simply to keep the note history around without crashing the app.
 */
async function readStoredNotes(): Promise<NoteEntry[] | null> {
  try {
    if (Platform.OS === 'web') {
      const rawValue = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (!rawValue) {
        return null;
      }

      const parsed = JSON.parse(rawValue) as NoteEntry[];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
    }

    const rawValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as NoteEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Persists the demo thread to whichever storage backend is currently safe.
 */
async function writeStoredNotes(notes: NoteEntry[]) {
  try {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(notes));
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Demo mode is intentionally resilient here. If storage is unavailable,
    // the in-memory thread should continue to work without surfacing a crash.
  }
}

/**
 * NotesScreen component.
 *
 * Renders a messenger-like note thread where the user writes a note to
 * themselves and immediately sees it added to the thread with a timestamp.
 */
export default function NotesScreen() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [draft, setDraft] = useState('');
  const [notes, setNotes] = useState<NoteEntry[]>(DEMO_NOTES);
  const [isHydrated, setIsHydrated] = useState(false);

  const isDark = colorScheme === 'dark';
  const inputPlaceholderColor = useMemo(
    () => (isDark ? '#9CA3AF' : '#6B7280'),
    [isDark],
  );
  const bubbleBackground = isDark ? '#24304A' : '#D6E4FF';
  const bubbleTextColor = isDark ? '#F6F8FF' : '#1F2937';
  const timestampColor = isDark ? '#C7D2FE' : '#5B6472';
  const inputBorderColor = isDark ? '#4B5563' : '#CBD5E1';
  const inputBackgroundColor = isDark ? '#111827' : '#F8FAFC';
  const sendButtonBackground = isDark ? '#60A5FA' : '#1D4ED8';
  const sendButtonTextColor = '#FFFFFF';
  const composeBottomPadding = Math.max(insets.bottom + 12, 82);

  // Load the persisted demo notes on first mount.
  // If the store is empty or the read fails, keep the seeded notes.
  useEffect(() => {
    let isMounted = true;

    const loadNotes = async () => {
      try {
        const storedNotes = await readStoredNotes();
        if (storedNotes && isMounted) {
          setNotes(storedNotes);
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    };

    void loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  // Persist the current note thread whenever the in-memory state changes.
  // This keeps the UI in sync with the demo store while still being easy to
  // swap out later for a production persistence layer.
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void writeStoredNotes(notes);
  }, [isHydrated, notes]);

  // Keep the thread anchored to the newest message so the composer feels like
  // a live message view rather than a static note list.
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [notes.length]);

  /**
   * Adds the latest composer value to the note thread and stamps it.
   *
   * The timestamp is intentionally lightweight and human-readable so the
   * screen feels like a chat thread without needing a full time formatter.
   */
  const handleSendNote = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const timestamp = new Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date());

    const nextEntry: NoteEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      createdAt: timestamp,
    };

    setNotes((current) => [...current, nextEntry]);
    setDraft('');
  };

  return (
    <KeyboardAvoidingContainer style={[styles.keyboardContainer, { backgroundColor: theme.background }]}> 
      <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
        <ThemedText type="title">Note to self</ThemedText>

        <View style={[styles.chatShell, { paddingBottom: composeBottomPadding }]}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {notes.map((note) => (
              <View key={note.id} style={styles.messageRow}>
                <View
                  style={[
                    styles.selfBubble,
                    {
                      backgroundColor: bubbleBackground,
                    },
                  ]}
                >
                  <ThemedText style={[styles.messageText, { color: bubbleTextColor }]}>
                    {note.text}
                  </ThemedText>
                  <ThemedText style={[styles.timestampText, { color: timestampColor }]}>
                    {note.createdAt}
                  </ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.composeBar}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Write a note to yourself..."
              placeholderTextColor={inputPlaceholderColor}
              multiline
              autoCapitalize="sentences"
              autoCorrect
              textAlignVertical="top"
              returnKeyType="done"
              onSubmitEditing={handleSendNote}
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: inputBackgroundColor,
                  borderColor: inputBorderColor,
                },
              ]}
            />

            <Pressable
              onPress={handleSendNote}
              disabled={!draft.trim()}
              style={[
                styles.sendButton,
                { backgroundColor: sendButtonBackground },
                !draft.trim() && styles.sendButtonDisabled,
              ]}
            >
              <ThemedText style={[styles.sendButtonText, { color: sendButtonTextColor }]}>
                Send
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  chatShell: {
    flex: 1,
    marginTop: 12,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingBottom: 16,
    gap: 10,
  },
  messageRow: {
    alignItems: 'flex-end',
  },
  selfBubble: {
    maxWidth: '86%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 27,
  },
  timestampText: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 16,
  },
  composeBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    borderRadius: 90,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

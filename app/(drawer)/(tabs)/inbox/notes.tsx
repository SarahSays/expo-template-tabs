import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, View } from 'react-native';

import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type NoteEntry = { id: string; text: string; createdAt: string };
const STORAGE_KEY = 'demo-note-to-self-thread';
const DEMO_NOTES: NoteEntry[] = [
  { id: 'demo-1', text: 'Check the lunch plan before the afternoon call.', createdAt: '9:12 AM' },
  { id: 'demo-2', text: 'Remember to send the updated meeting notes to Avery.', createdAt: '9:14 AM' },
];

async function readStoredNotes(): Promise<NoteEntry[] | null> {
  try {
    const rawValue = Platform.OS === 'web' ? globalThis.localStorage?.getItem(STORAGE_KEY) : await AsyncStorage.getItem(STORAGE_KEY);
    if (!rawValue) return null;
    const parsed = JSON.parse(rawValue) as NoteEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

async function writeStoredNotes(notes: NoteEntry[]) {
  try {
    if (Platform.OS === 'web') globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(notes));
    else await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Demo mode keeps the note thread available even if persistence fails.
  }
}

export default function NotesScreen() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const scrollViewRef = useRef<ScrollView>(null);
  const [draft, setDraft] = useState('');
  const [notes, setNotes] = useState<NoteEntry[]>(DEMO_NOTES);
  const [isHydrated, setIsHydrated] = useState(false);
  const isDark = colorScheme === 'dark';
  const inputPlaceholderColor = useMemo(() => isDark ? '#9CA3AF' : '#6B7280', [isDark]);
  const bubbleBackground = isDark ? '#24304A' : '#D6E4FF';
  const bubbleTextColor = isDark ? '#F6F8FF' : '#1F2937';
  const timestampColor = isDark ? '#C7D2FE' : '#5B6472';
  const inputBorderColor = isDark ? '#4B5563' : '#CBD5E1';
  const inputBackgroundColor = isDark ? '#111827' : '#F8FAFC';
  const sendButtonBackground = isDark ? '#60A5FA' : '#1D4ED8';
  const composeBottomPadding = 8;

  useEffect(() => {
    let mounted = true;
    readStoredNotes().then((storedNotes) => {
      if (mounted && storedNotes) setNotes(storedNotes);
    }).finally(() => {
      if (mounted) setIsHydrated(true);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (isHydrated) void writeStoredNotes(notes);
  }, [isHydrated, notes]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [notes.length]);

  const handleSendNote = () => {
    const text = draft.trim();
    if (!text) return;
    const createdAt = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date());
    setNotes((current) => [...current, { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, createdAt }]);
    setDraft('');
  };

  return (
    <KeyboardAvoidingContainer style={[styles.keyboardContainer, { backgroundColor: theme.background }]}>
      <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
        <ThemedText type="title">Notes to self</ThemedText>
        <View style={[styles.chatShell, { paddingBottom: composeBottomPadding }]}>
          <ScrollView ref={scrollViewRef} style={styles.messageList} contentContainerStyle={styles.messageListContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {notes.map((note) => (
              <View key={note.id} style={styles.messageRow}>
                <View style={[styles.selfBubble, { backgroundColor: bubbleBackground }]}>
                  <ThemedText style={[styles.messageText, { color: bubbleTextColor }]}>{note.text}</ThemedText>
                  <ThemedText style={[styles.timestampText, { color: timestampColor }]}>{note.createdAt}</ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.composeBar}>
            <TextInput value={draft} onChangeText={setDraft} placeholder="Write a note to yourself..." placeholderTextColor={inputPlaceholderColor} multiline autoCapitalize="sentences" autoCorrect textAlignVertical="top" returnKeyType="done" onSubmitEditing={handleSendNote} style={[styles.input, { color: theme.text, backgroundColor: inputBackgroundColor, borderColor: inputBorderColor }]} />
            <Pressable onPress={handleSendNote} disabled={!draft.trim()} style={[styles.sendButton, { backgroundColor: sendButtonBackground }, !draft.trim() && styles.sendButtonDisabled]}>
              <ThemedText style={styles.sendButtonText}>Send</ThemedText>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1 },
  container: { flex: 1, padding: 16, justifyContent: 'flex-start' },
  chatShell: { flex: 1, marginTop: 12 },
  messageList: { flex: 1 },
  messageListContent: { paddingBottom: 16, gap: 10 },
  messageRow: { alignItems: 'flex-end' },
  selfBubble: { maxWidth: '86%', borderRadius: 16, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 8 },
  messageText: { fontSize: 15, lineHeight: 27 },
  timestampText: { marginTop: 6, fontSize: 11, lineHeight: 16 },
  composeBar: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, paddingTop: 10 },
  input: { flex: 1, minHeight: 48, maxHeight: 120, borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  sendButton: { borderRadius: 90, paddingHorizontal: 14, paddingVertical: 12 },
  sendButtonDisabled: { opacity: 0.5 },
  sendButtonText: { color: '#FFFFFF', fontWeight: '700' },
});

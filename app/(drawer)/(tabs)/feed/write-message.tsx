import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { getFriends } from '../orbits/contacts/_friendsStore';

type MessageEntry = {
  id: string;
  text: string;
  createdAt: string;
  isSent: boolean;
};

async function readStoredMessages(storageKey: string): Promise<MessageEntry[] | null> {
  try {
    if (Platform.OS === 'web') {
      const rawValue = globalThis.localStorage?.getItem(storageKey);
      if (!rawValue) {
        return null;
      }

      const parsed = JSON.parse(rawValue) as MessageEntry[];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
    }

    const rawValue = await AsyncStorage.getItem(storageKey);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as MessageEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

async function writeStoredMessages(storageKey: string, messages: MessageEntry[]) {
  try {
    if (Platform.OS === 'web') {
      globalThis.localStorage?.setItem(storageKey, JSON.stringify(messages));
      return;
    }

    await AsyncStorage.setItem(storageKey, JSON.stringify(messages));
  } catch {
    // Demo mode keeps the UI resilient even if persistent storage is unavailable.
  }
}

/**
 * WriteNewMessageScreen component.
 *
 * Renders a lightweight compose-new-message page for a selected feed friend.
 */
export default function WriteNewMessageScreen() {
  const { name, draft: draftParam } = useLocalSearchParams<{ name?: string; draft?: string }>();
  const router = useRouter();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const friendName = useMemo(() => (typeof name === 'string' && name.trim() ? name : 'Friend'), [name]);
  const matchedFriend = useMemo(
    () => getFriends().find((friend) => friend.name.toLowerCase() === friendName.toLowerCase()),
    [friendName],
  );

  useEffect(() => {
    if (typeof draftParam === 'string' && draftParam.trim()) {
      setDraft(draftParam);
    }
  }, [draftParam]);

  const storageKey = useMemo(() => `demo-feed-thread-${friendName.toLowerCase().replace(/\s+/g, '-')}`, [friendName]);
  const placeholderColor = colorScheme === 'dark' ? '#9CA3AF' : '#6B7280';
  const inputBackground = colorScheme === 'dark' ? '#111827' : '#F8FAFC';
  const borderColor = colorScheme === 'dark' ? '#374151' : '#CBD5E1';
  // Keep the composer safely above the persistent tab bar on all devices.
  const composerBottomPadding = Math.max(tabBarHeight + 12, insets.bottom + 12);

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const storedMessages = await readStoredMessages(storageKey);
        if (storedMessages && isMounted) {
          setMessages(storedMessages);
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    };

    void loadMessages();

    return () => {
      isMounted = false;
    };
  }, [storageKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void writeStoredMessages(storageKey, messages);
  }, [isHydrated, messages, storageKey]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages.length]);

  const handleSendMessage = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const timestamp = new Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date());

    const nextEntry: MessageEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text,
      createdAt: timestamp,
      isSent: true,
    };

    setMessages((current) => [...current, nextEntry]);
    setDraft('');
  };

  const handleFriendTitlePress = () => {
    if (!matchedFriend) {
      return;
    }

    router.push(`/orbits/contacts/${matchedFriend.id}`);
  };

  return (
    <KeyboardAvoidingContainer style={[styles.keyboardContainer, { backgroundColor: theme.background }]}>
      <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
        {matchedFriend ? (
          <Pressable onPress={handleFriendTitlePress} style={styles.friendTitleButton}>
            <ThemedText type="title" style={[styles.friendTitleText, { color: theme.tint }]}> 
              {friendName}
            </ThemedText>
          </Pressable>
        ) : (
          <ThemedText type="title">{friendName}</ThemedText>
        )}
        <ThemedText style={[styles.introText, { color: theme.drawerInactiveText }]}>
          This is the beginning of your message history with {friendName}.
        </ThemedText>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageRow,
                message.isSent ? styles.messageRowSent : styles.messageRowReceived,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.isSent
                    ? [styles.sentBubble, { backgroundColor: colorScheme === 'dark' ? '#24304A' : theme.tint }]
                    : [styles.receivedBubble, { backgroundColor: theme.bubbleBackground }],
                ]}
              >
                <ThemedText style={[styles.messageText, { color: message.isSent ? '#fff' : theme.text }]}>
                  {message.text}
                </ThemedText>
                <ThemedText style={[styles.timestampText, { color: message.isSent ? 'rgba(255,255,255,0.85)' : theme.drawerInactiveText }]}>
                  {message.createdAt}
                </ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.composerShell, { paddingBottom: composerBottomPadding }]}>
          <View style={[styles.composerRow, { backgroundColor: theme.bubbleBackground, borderColor }]}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Write a message..."
              placeholderTextColor={placeholderColor}
              multiline
              style={[styles.input, { color: theme.text, backgroundColor: inputBackground }]}
            />
            <Pressable
              disabled={!draft.trim()}
              onPress={handleSendMessage}
              style={({ pressed }) => [
                styles.sendButton,
                { backgroundColor: draft.trim() ? theme.tint : '#94A3B8' },
                pressed && styles.sendButtonPressed,
              ]}
            >
              <MaterialCommunityIcons name="send" size={18} color="#fff" />
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  friendTitleButton: {
    alignSelf: 'flex-start',
  },
  friendTitleText: {
    textDecorationLine: 'underline',
  },
  introText: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingBottom: 12,
  },
  messageRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageRowSent: {
    justifyContent: 'flex-end',
  },
  messageRowReceived: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '78%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sentBubble: {
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  timestampText: {
    marginTop: 4,
    fontSize: 11,
  },
  composerShell: {
    width: '100%',
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
});
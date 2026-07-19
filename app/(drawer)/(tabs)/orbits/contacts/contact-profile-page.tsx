/**
 * contact-profile-page.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { getFriend } from './_friendsStore';

/**
 * ContactProfilePage component.
 *
 * Renders the UI for the Contactprofile page.
 */
export default function ContactProfilePage() {
  const params = useLocalSearchParams();
  const id = String(params.id || '1');
  const [friendState, setFriendState] = useState(() => getFriend(id));
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setFriendState(getFriend(id));
  }, [isFocused, id]);
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  if (!friendState) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Not Found</ThemedText>
      </ThemedView>
    );
  }

  // Map legacy planet-style captions to human-readable labels
  const CAPTION_TO_LABEL: Record<string, string> = {
    Mercury: '3 months',
    Venus: '6 months',
    Earth: '1 year',
    Mars: '2 years',
    Jupiter: '10 years',
  };

  const displayCadence = friendState?.cadence
    ? CAPTION_TO_LABEL[friendState.cadence] || friendState.cadence
    : 'Not set';


  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>{friendState?.name}</ThemedText>

      <View style={styles.section}>
        <ThemedText type="subtitle" lightColor="#2B0F55">Connected via</ThemedText>
        <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans }}>{friendState?.platform}</ThemedText>

        <ThemedText type="subtitle" lightColor="#2B0F55" style={{ marginTop: 12 }}>Cadence</ThemedText>
        <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans }}>{displayCadence}</ThemedText>

        <TouchableOpacity
          onPress={() => router.push(`/orbits/cadences?friendId=${id}`)}
          style={[styles.doneButton, { marginTop: 16 }]}
        >
          <ThemedText style={styles.doneButtonText}>How often do you want to talk?</ThemedText>
        </TouchableOpacity>

        {/* Removed the extra Done button which linked to a non-existing route.
            Navigation now returns to Friends after saving from the Star Chart. */}
      </View>

      {/* Cadence selection now uses the Star Chart slider page */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: { marginTop: 16, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8 },
  doneButton: { paddingVertical: 10, alignItems: 'center', backgroundColor: '#0A84FF', borderRadius: 6 },
  doneButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '90%', padding: 16, borderRadius: 8 },
  cadenceRow: { paddingVertical: 12, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
});
/**
 * contact-profile-page.tsx
 *
 * Maintainer notes:- This route file is intentionally lightweight and focused on screen composition.
 * Keep navigation contracts and route params in sync with sibling screens.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { formatBirthdayForDisplay, getFriend } from './_friendsStore';

const TIME_ZONE_LABELS: Record<string, string> = {
  'America/New_York': 'New York · Eastern',
  'America/Chicago': 'Chicago · Central',
  'America/Denver': 'Denver · Mountain',
  'America/Los_Angeles': 'Los Angeles · Pacific',
  'Europe/London': 'London',
  'Europe/Paris': 'Paris',
  'Europe/Berlin': 'Berlin',
  'Europe/Athens': 'Athens',
};

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileDetail}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <ThemedText style={styles.profileDetailValue}>{value}</ThemedText>
    </View>
  );
}

/**
 * ContactProfilePage component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.
 * Maintainer guidance: Keep side effects near the top-level component for visibility. 
 * Treat this component as the route contract for downstream navigation and params.
 */
export default function ContactProfilePage() {
  const params = useLocalSearchParams();
  const id = String(params.id || '1');
  const [friendState, setFriendState] = useState(() => getFriend(id));
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const currentFriend = getFriend(id);
      setFriendState(currentFriend);
    }
  }, [isFocused, id]);

  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };
  const messageBubbleBackground = colorScheme === 'dark' ? 'rgba(79,70,229,0.18)' : '#DCE4FF';
  const messageBubbleBorder = colorScheme === 'dark' ? 'rgba(79,70,229,0.32)' : '#5B70D8';
  const messageIconColor = colorScheme === 'dark' ? '#D7DBFF' : '#253B80';

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

  const handleMessagePress = () => {
    if (friendState?.name) {
      router.push(`/inbox/write-message?name=${encodeURIComponent(friendState.name)}`);
    }
  };

  const profile = friendState.profile;
  const sharedSections = [
    profile.broadcast.reachability,
    profile.broadcast.timeZone,
    profile.broadcast.favoriteThings,
    profile.broadcast.slingshots,
    profile.broadcast.icebreakers,
  ].some(Boolean);

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingContainer>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>{friendState.name}</ThemedText>

          <View style={styles.actionRow}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Send message to ${friendState.name}`}
              onPress={handleMessagePress}
              style={[styles.actionButton, styles.messageButton, { backgroundColor: messageBubbleBackground, borderColor: messageBubbleBorder }]}
            >
              <MaterialCommunityIcons name="send" size={18} color={messageIconColor} />
              <ThemedText style={[styles.messageButtonText, { color: messageIconColor }]}>Send message</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => router.push(`/orbits/cadences?friendId=${id}`)}
              style={[styles.actionButton, styles.cadenceButton]}
            >
              <ThemedText style={styles.doneButtonText}>Set reminders</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Contact</ThemedText>
            <View style={styles.infoRow}>
              <ThemedText type="defaultSemiBold">Connected via</ThemedText>
              <ThemedText>{friendState.platform}</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText type="defaultSemiBold">Cadence</ThemedText>
              <ThemedText>{displayCadence}</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText type="defaultSemiBold">Birthday</ThemedText>
              <ThemedText>{formatBirthdayForDisplay(friendState.birthday)}</ThemedText>
            </View>
          </View>

          {profile.broadcast.reachability || profile.broadcast.timeZone ? (
            <View style={styles.card}>
              <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Good times to reach out</ThemedText>
              {profile.broadcast.reachability ? (
                <View style={styles.detailRow}>
                  <ThemedText type="defaultSemiBold">Wee hours</ThemedText>
                  <ThemedText>{profile.weeHoursOk ? 'OK to message' : 'Please avoid'}</ThemedText>
                </View>
              ) : null}
              {profile.broadcast.timeZone ? (
                <View style={styles.detailRow}>
                  <ThemedText type="defaultSemiBold">Timezone</ThemedText>
                  <ThemedText>{TIME_ZONE_LABELS[profile.timeZone] ?? profile.timeZone}</ThemedText>
                </View>
              ) : null}
            </View>
          ) : null}

          {profile.broadcast.favoriteThings ? (
            <View style={styles.card}>
              <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Favorite things</ThemedText>
              {profile.favoriteThings.loveLanguages.length > 0 ? (
                <ProfileDetail label="Love languages" value={profile.favoriteThings.loveLanguages.join(', ')} />
              ) : null}
              {profile.favoriteThings.giftIdeas.length > 0 ? (
                <ProfileDetail label="Gift ideas" value={profile.favoriteThings.giftIdeas.join(', ')} />
              ) : null}
              {profile.favoriteThings.loveLanguages.length === 0 && profile.favoriteThings.giftIdeas.length === 0 ? (
                <ThemedText style={styles.helperText}>No favorite things shared yet.</ThemedText>
              ) : null}
            </View>
          ) : null}

          {profile.broadcast.slingshots ? (
            <View style={styles.card}>
              <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Slingshots</ThemedText>
              <ThemedText style={styles.helperText}>Topics you and {friendState.name} would like to circle back on.</ThemedText>
              {profile.slingshots.length > 0 ? profile.slingshots.map((topic, index) => (
                <ThemedText key={`${index}-${topic}`} style={styles.listItem}>• {topic}</ThemedText>
              )) : <ThemedText style={styles.helperText}>No slingshots shared yet.</ThemedText>}
            </View>
          ) : null}

          {profile.broadcast.icebreakers ? (
            <View style={styles.card}>
              <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Icebreakers</ThemedText>
              {profile.icebreakers.askMeAbout ? <ProfileDetail label="Ask me about…" value={profile.icebreakers.askMeAbout} /> : null}
              {profile.icebreakers.infoDumpOn ? <ProfileDetail label="I will instantly info-dump on…" value={profile.icebreakers.infoDumpOn} /> : null}
              {profile.icebreakers.dontGetMeStartedOn ? <ProfileDetail label="Don’t get me started on…" value={profile.icebreakers.dontGetMeStartedOn} /> : null}
              {!profile.icebreakers.askMeAbout && !profile.icebreakers.infoDumpOn && !profile.icebreakers.dontGetMeStartedOn ? (
                <ThemedText style={styles.helperText}>No icebreakers shared yet.</ThemedText>
              ) : null}
            </View>
          ) : null}

          {!sharedSections ? (
            <View style={styles.card}>
              <ThemedText style={styles.helperText}>{friendState.name} hasn’t chosen to share profile details yet.</ThemedText>
            </View>
          ) : null}

        </ScrollView>
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 48, gap: 14 },
  card: { padding: 16, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.08)', gap: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  profileDetail: { gap: 2 },
  profileDetailValue: { lineHeight: 22 },
  listItem: { lineHeight: 22 },
  helperText: { fontSize: 13, lineHeight: 19, opacity: 0.75 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionButton: { flex: 1, minHeight: 56, paddingVertical: 10, paddingHorizontal: 8, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  messageButton: { flexDirection: 'row', gap: 8, borderWidth: 1 },
  cadenceButton: { backgroundColor: '#0A84FF' },
  messageButtonText: { fontWeight: '600', fontSize: 14, textAlign: 'center' },
  doneButtonText: { color: '#fff', fontWeight: '600', fontSize: 14, textAlign: 'center' },
});
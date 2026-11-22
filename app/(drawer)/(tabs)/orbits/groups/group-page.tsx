import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import {
  completeDemoGroupCheckIn,
  getNextGroupMember,
  GROUP_MEMBER_SYMBOLS,
  updateDemoGroupMemberSymbol,
  useDemoGroups,
  type GroupMemberSymbol,
} from '@/services/demoGroupsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

const MEMBER_SYMBOL_LABELS: Record<GroupMemberSymbol, string> = {
  '🛰️': 'Satellite',
  '☄️': 'Comet',
  '🌠': 'Shooting star',
};

export default function GroupPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const groups = useDemoGroups();
  const group = groups.find((item) => item.id === id);
  const nextMember = group ? getNextGroupMember(group) : undefined;
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  if (!group) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Group not found</ThemedText>
        <Pressable onPress={() => router.replace('/orbits/groups')} style={styles.primaryButton}>
          <ThemedText style={styles.primaryButtonText}>Back to groups</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const explicitlySelectedMember = group.members.find((member) => member.id === selectedMemberId);
  const selectedMember = explicitlySelectedMember ?? nextMember;
  const dueAt = new Date(group.nextDueAt);
  const reminderText = group.lastCheckIn
    ? `Next reminder ${dueAt.toLocaleDateString()}`
    : 'Your first check-in is ready whenever you are';

  function handleCompleteCheckIn() {
    if (!selectedMember) return;
    const memberIndex = group.members.findIndex((member) => member.id === selectedMember.id);
    const followingMember = group.members[(memberIndex + 1) % group.members.length];
    completeDemoGroupCheckIn(group.id, selectedMember.id);
    setSelectedMemberId(null);
    setFeedback(
      followingMember
        ? `${selectedMember.name} marked as checked in. Next up: ${followingMember.name}.`
        : `${selectedMember.name} marked as checked in.`,
    );
  }

  function handleMessagePrivately() {
    if (!selectedMember) return;
    router.push({
      pathname: '/inbox/write-message',
      params: {
        name: selectedMember.name,
        draft: `Hey ${selectedMember.name}, just checking in—how have you been lately?`,
      },
    });
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">{group.name}</ThemedText>
        <ThemedText style={styles.description}>
          (Members not added to a group chat.)
        </ThemedText>

        <View style={[styles.reminderCard, { backgroundColor: theme.bubbleBackground }]}>
          <ThemedText type="defaultSemiBold">Reminder cadence:</ThemedText>
          <ThemedText style={{ color: theme.bubbleText }}>{group.cadence} · Reach out to one</ThemedText>
          <ThemedText style={{ color: theme.bubbleText }}>{reminderText}</ThemedText>
          {nextMember ? (
            <ThemedText style={styles.nextUp}>Up next: {nextMember.name}</ThemedText>
          ) : (
            <ThemedText style={styles.nextUp}>Add people to begin your rotation.</ThemedText>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Orbiting members ({group.members.length})</ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/orbits/groups/add-to-group', params: { id: group.id } })}
            style={styles.textButton}
          >
            <ThemedText style={styles.linkText}>Manage</ThemedText>
          </Pressable>
        </View>

        {group.members.length ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.memberCarousel}
          >
            {group.members.map((member) => {
              const selected = selectedMember?.id === member.id;
              const upNext = nextMember?.id === member.id;
              return (
                <Pressable
                  key={member.id}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  accessibilityLabel={`${member.name}, ${member.context}${upNext ? ', up next' : ''}`}
                  onPress={() => {
                    setSelectedMemberId(member.id);
                    setFeedback('');
                  }}
                  style={({ pressed }) => [
                    styles.memberCard,
                    { backgroundColor: theme.bubbleBackground, borderColor: selected ? '#2563eb' : 'transparent' },
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.memberAvatar}>
                    <ThemedText style={styles.memberSymbol}>{member.symbol}</ThemedText>
                  </View>
                  <ThemedText type="defaultSemiBold" numberOfLines={1}>{member.name}</ThemedText>
                  <ThemedText style={[styles.memberContext, { color: theme.bubbleText }]} numberOfLines={1}>
                    {member.context}
                  </ThemedText>
                  <ThemedText style={upNext ? styles.nextBadge : styles.selectLabel}>
                    {upNext ? 'Up next' : selected ? 'Selected' : 'Choose'}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}

        {explicitlySelectedMember && (
          <View style={[styles.symbolPicker, { backgroundColor: theme.bubbleBackground }]}>
            <ThemedText type="defaultSemiBold">Orbit symbol for {explicitlySelectedMember.name}</ThemedText>
            <View style={styles.symbolOptions}>
              {GROUP_MEMBER_SYMBOLS.map((symbol) => {
                const symbolSelected = explicitlySelectedMember.symbol === symbol;
                return (
                  <Pressable
                    key={symbol}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: symbolSelected }}
                    accessibilityLabel={`${MEMBER_SYMBOL_LABELS[symbol]} for ${explicitlySelectedMember.name}`}
                    onPress={() => {
                      updateDemoGroupMemberSymbol(group.id, explicitlySelectedMember.id, symbol);
                      setSelectedMemberId(null);
                    }}
                    style={({ pressed }) => [
                      styles.symbolOption,
                      { borderColor: symbolSelected ? '#2563eb' : 'transparent' },
                      pressed && styles.pressed,
                    ]}
                  >
                    <ThemedText style={styles.symbolOptionEmoji}>{symbol}</ThemedText>
                    <ThemedText style={styles.symbolOptionLabel}>{MEMBER_SYMBOL_LABELS[symbol]}</ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {selectedMember ? (
          <View style={styles.actions}>
            <ThemedText type="defaultSemiBold">
              Check in with {selectedMember.name}
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              onPress={handleMessagePrivately}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            >
              <ThemedText style={styles.primaryButtonText}>Message {selectedMember.name} privately</ThemedText>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleCompleteCheckIn}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
            >
              <ThemedText style={styles.secondaryButtonText}>Mark as checked in</ThemedText>
            </Pressable>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/orbits/groups/add-to-group', params: { id: group.id } })}
            style={styles.primaryButton}
          >
            <ThemedText style={styles.primaryButtonText}>Add people</ThemedText>
          </Pressable>
        )}

        {group.lastCheckIn && (
          <ThemedText style={styles.lastCheckIn}>
            Last checked in with {group.lastCheckIn.memberName} on{' '}
            {new Date(group.lastCheckIn.completedAt).toLocaleDateString()}.
          </ThemedText>
        )}
        {feedback ? <ThemedText accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</ThemedText> : null}

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/orbits/groups/edit-group-settings', params: { id: group.id } })}
          style={styles.settingsButton}
        >
          <ThemedText style={styles.linkText}>Group settings</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  description: { marginTop: 8, lineHeight: 22 },
  reminderCard: { marginTop: 18, padding: 16, borderRadius: 16, gap: 7 },
  nextUp: { marginTop: 4, fontWeight: '700' },
  sectionHeader: { marginTop: 24, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textButton: { padding: 8 },
  linkText: { color: '#2563eb', fontWeight: '700' },
  memberCarousel: { gap: 10, paddingRight: 8 },
  memberCard: { width: 144, minHeight: 154, padding: 12, borderWidth: 2, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 5 },
  memberAvatar: { width: 54, height: 54, marginBottom: 2, alignItems: 'center', justifyContent: 'center', borderRadius: 27, backgroundColor: '#D6E4FF' },
  memberSymbol: { fontSize: 28 },
  memberContext: { fontSize: 12 },
  nextBadge: { color: '#2563eb', fontWeight: '700' },
  selectLabel: { fontSize: 13, opacity: 0.75 },
  symbolPicker: { marginTop: 16, padding: 14, borderRadius: 16 },
  symbolOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  symbolOption: { minWidth: 82, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 2, borderRadius: 14, alignItems: 'center' },
  symbolOptionEmoji: { fontSize: 24 },
  symbolOptionLabel: { fontSize: 11, textAlign: 'center' },
  actions: { marginTop: 18, gap: 10 },
  primaryButton: { minHeight: 50, marginTop: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderRadius: 14, backgroundColor: '#2563eb' },
  primaryButtonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  secondaryButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: '#2563eb' },
  secondaryButtonText: { color: '#2563eb', fontWeight: '700' },
  pressed: { opacity: 0.75 },
  lastCheckIn: { marginTop: 18, fontSize: 13, opacity: 0.8 },
  feedback: { marginTop: 12, fontWeight: '700' },
  settingsButton: { alignSelf: 'flex-start', marginTop: 18, paddingVertical: 8 },
});

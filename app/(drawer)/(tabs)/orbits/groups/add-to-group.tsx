import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import {
  addDemoGroupMembers,
  GROUP_MEMBER_SYMBOLS,
  removeDemoGroupMember,
  useDemoGroups,
  type CheckInMember,
} from '@/services/demoGroupsStore';
import { getFriends } from '../contacts/_friendsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

export default function AddToGroup() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const groups = useDemoGroups();
  const group = groups.find((item) => item.id === id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const currentIds = new Set(group?.members.map((member) => member.id) ?? []);
  const availableMembers: CheckInMember[] = getFriends()
    .filter((friend) => !currentIds.has(friend.id))
    .map((friend) => ({
      id: friend.id,
      name: friend.name,
      context: `${friend.platform} contact`,
      symbol: GROUP_MEMBER_SYMBOLS[0],
    }));

  if (!group) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Group not found</ThemedText>
      </ThemedView>
    );
  }

  function toggleMember(memberId: string) {
    setSelectedIds((current) => current.includes(memberId)
      ? current.filter((id) => id !== memberId)
      : [...current, memberId]);
  }

  function handleSave() {
    addDemoGroupMembers(group.id, availableMembers.filter((member) => selectedIds.includes(member.id)));
    router.back();
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">Manage people</ThemedText>
        <ThemedText style={styles.description}>
          Add people to your private {group.name} check-in circle. This will not create a group chat.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>In this group</ThemedText>
        {group.members.length ? group.members.map((member) => (
          <View key={member.id} style={[styles.memberRow, { backgroundColor: theme.bubbleBackground }]}>
            <View style={styles.memberCopy}>
              <ThemedText type="defaultSemiBold">{member.name}</ThemedText>
              <ThemedText style={{ color: theme.bubbleText }}>{member.context}</ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${member.name} from ${group.name}`}
              onPress={() => removeDemoGroupMember(group.id, member.id)}
              style={styles.removeButton}
            >
              <ThemedText style={styles.removeText}>Remove</ThemedText>
            </Pressable>
          </View>
        )) : (
          <ThemedText style={styles.emptyText}>No one added yet. Choose contacts below to start a rotation.</ThemedText>
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>Your connections</ThemedText>
        {availableMembers.length ? availableMembers.map((member) => {
          const selected = selectedIds.includes(member.id);
          return (
            <Pressable
              key={member.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              onPress={() => toggleMember(member.id)}
              style={({ pressed }) => [
                styles.memberRow,
                { backgroundColor: theme.bubbleBackground, borderColor: selected ? '#2563eb' : 'transparent' },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.memberCopy}>
                <ThemedText type="defaultSemiBold">{member.name}</ThemedText>
                <ThemedText style={{ color: theme.bubbleText }}>{member.context}</ThemedText>
              </View>
              <ThemedText style={selected ? styles.selectedLabel : styles.addLabel}>
                {selected ? 'Selected' : 'Add'}
              </ThemedText>
            </Pressable>
          );
        }) : (
          <ThemedText style={styles.emptyText}>All demo connections are already in this group.</ThemedText>
        )}

        <Pressable
          accessibilityRole="button"
          disabled={!selectedIds.length}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.primaryButton,
            !selectedIds.length && styles.disabledButton,
            pressed && selectedIds.length > 0 && styles.pressed,
          ]}
        >
          <ThemedText style={styles.primaryButtonText}>
            Add {selectedIds.length ? `${selectedIds.length} ${selectedIds.length === 1 ? 'person' : 'people'}` : 'selected people'}
          </ThemedText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.cancelButton}>
          <ThemedText style={styles.addLabel}>Done</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  description: { marginTop: 8, lineHeight: 22 },
  sectionTitle: { marginTop: 24, marginBottom: 10 },
  memberRow: { minHeight: 62, marginBottom: 8, padding: 12, borderWidth: 2, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  memberCopy: { flex: 1, gap: 3 },
  removeButton: { padding: 8 },
  removeText: { color: '#b91c1c', fontWeight: '600' },
  selectedLabel: { color: '#2563eb', fontWeight: '700' },
  addLabel: { color: '#2563eb', fontWeight: '700' },
  emptyText: { marginTop: 4, lineHeight: 20, opacity: 0.75 },
  primaryButton: { minHeight: 50, marginTop: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#2563eb' },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  disabledButton: { opacity: 0.45 },
  cancelButton: { alignSelf: 'center', marginTop: 12, padding: 12 },
  pressed: { opacity: 0.75 },
});

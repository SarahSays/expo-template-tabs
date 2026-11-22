import { GroupCadencePicker } from '@/components/group-cadence-picker';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { updateDemoGroup, useDemoGroups, type GroupCadence } from '@/services/demoGroupsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';

export default function EditGroupSettings() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const groups = useDemoGroups();
  const group = groups.find((item) => item.id === id);
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const [name, setName] = useState(() => group?.name ?? '');
  const [cadence, setCadence] = useState<GroupCadence>(() => group?.cadence ?? 'Every week');

  if (!group) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Group not found</ThemedText>
      </ThemedView>
    );
  }

  function handleSave() {
    const trimmedName = name.trim();
    if (!group || !trimmedName) return;
    updateDemoGroup(group.id, trimmedName, cadence);
    router.replace({ pathname: '/orbits/groups/group-page', params: { id: group.id } });
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText type="title">Group settings</ThemedText>
        <ThemedText style={styles.description}>
          Your cadence reminds you to check in with one person at a time.
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.label}>Group name</ThemedText>
        <TextInput
          accessibilityLabel="Group name"
          value={name}
          onChangeText={setName}
          placeholder="Group name"
          placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
          style={[
            styles.input,
            { color: theme.text, backgroundColor: theme.bubbleBackground, borderColor: theme.icon },
          ]}
        />

        <ThemedText type="defaultSemiBold" style={styles.label}>Reminder cadence</ThemedText>
        <GroupCadencePicker value={cadence} onChange={setCadence} />
        <ThemedText style={styles.note}>
          After you mark a check-in complete, the next reminder is scheduled using this cadence.
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          disabled={!name.trim()}
          onPress={handleSave}
          style={({ pressed }) => [styles.primaryButton, !name.trim() && styles.disabled, pressed && styles.pressed]}
        >
          <ThemedText style={styles.primaryButtonText}>Save settings</ThemedText>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/orbits/groups/delete-modal', params: { id: group.id } })}
          style={styles.deleteButton}
        >
          <ThemedText style={styles.deleteText}>Delete this group</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  description: { marginTop: 8, lineHeight: 22 },
  label: { marginTop: 24 },
  input: { minHeight: 50, marginTop: 8, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, fontSize: 16 },
  note: { marginTop: 10, fontSize: 13, lineHeight: 20, opacity: 0.75 },
  primaryButton: { minHeight: 50, marginTop: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#2563eb' },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.45 },
  deleteButton: { alignSelf: 'center', marginTop: 24, padding: 12 },
  deleteText: { color: '#b91c1c', fontWeight: '700' },
  pressed: { opacity: 0.75 },
});

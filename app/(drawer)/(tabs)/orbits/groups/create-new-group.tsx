import { GroupCadencePicker } from '@/components/group-cadence-picker';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { createDemoGroup, type GroupCadence } from '@/services/demoGroupsStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';

export default function CreateNewGroup() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const [name, setName] = useState('');
  const [cadence, setCadence] = useState<GroupCadence>('Every week');
  const [error, setError] = useState('');

  function handleCreateGroup() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Enter a name for your group.');
      return;
    }

    const group = createDemoGroup(trimmedName, cadence);
    router.replace({ pathname: '/orbits/groups/group-page', params: { id: group.id } });
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ThemedText type="title">Create a check-in group</ThemedText>
        <ThemedText style={styles.description}>
          Groups are private organizers for you. People you add will not be placed in a shared chat.
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.label}>Group name</ThemedText>
        <TextInput
          accessibilityLabel="Group name"
          value={name}
          onChangeText={(value) => {
            setName(value);
            if (error) setError('');
          }}
          placeholder="e.g. New Moms"
          placeholderTextColor={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
          returnKeyType="done"
          style={[
            styles.input,
            { color: theme.text, backgroundColor: theme.bubbleBackground, borderColor: theme.icon },
          ]}
        />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <ThemedText type="defaultSemiBold" style={styles.label}>Remind me to check in with one person</ThemedText>
        <GroupCadencePicker value={cadence} onChange={setCadence} />
        <ThemedText style={styles.note}>
          The first check-in is ready now. Completing one check-in schedules the next reminder.
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          onPress={handleCreateGroup}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <ThemedText style={styles.primaryButtonText}>Create group</ThemedText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.cancelButton}>
          <ThemedText style={styles.cancelText}>Cancel</ThemedText>
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
  error: { marginTop: 6, color: '#b91c1c' },
  note: { marginTop: 10, fontSize: 13, lineHeight: 20, opacity: 0.75 },
  primaryButton: { minHeight: 50, marginTop: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#2563eb' },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  cancelButton: { alignSelf: 'center', marginTop: 12, padding: 12 },
  cancelText: { color: '#2563eb', fontWeight: '600' },
  pressed: { opacity: 0.75 },
});

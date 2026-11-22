import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { deleteDemoGroup, useDemoGroups } from '@/services/demoGroupsStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function DeleteGroupModal() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const groups = useDemoGroups();
  const group = groups.find((item) => item.id === id);

  function handleDelete() {
    if (!group) return;
    deleteDemoGroup(group.id);
    router.replace('/orbits/groups');
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Delete this group?</ThemedText>
      <ThemedText style={styles.description}>
        {group
          ? `“${group.name}” and its demo check-in history will be removed. Its members will remain in your connections.`
          : 'This group could not be found.'}
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        disabled={!group}
        onPress={handleDelete}
        style={({ pressed }) => [styles.deleteButton, !group && styles.disabled, pressed && styles.pressed]}
      >
        <ThemedText style={styles.deleteText}>Delete group</ThemedText>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.cancelButton}>
        <ThemedText style={styles.cancelText}>Keep group</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  description: { marginTop: 12, lineHeight: 22 },
  deleteButton: { minHeight: 50, marginTop: 24, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#b91c1c' },
  deleteText: { color: '#fff', fontWeight: '700' },
  cancelButton: { alignSelf: 'center', marginTop: 12, padding: 12 },
  cancelText: { color: '#2563eb', fontWeight: '700' },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.75 },
});

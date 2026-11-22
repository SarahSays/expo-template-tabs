import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { getNextGroupMember, useDemoGroups } from '@/services/demoGroupsStore';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

export const screenOptions = {
  title: 'Groups',
  headerBackTitle: '',
  headerRight: undefined,
};

export default function GroupsScreen() {
  const router = useRouter();
  const groups = useDemoGroups();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">Groups</ThemedText>
        <ThemedText style={styles.intro}>
          Personalized check-ins. {'\n'}Intentional community.
        </ThemedText>

        <View style={[styles.infoCard, { backgroundColor: theme.bubbleBackground }]}>
          <ThemedText type="defaultSemiBold">Shared characteristics:</ThemedText>
          <ThemedText style={{ color: theme.bubbleText }}>
            Here you can group together meaningful patterns, such as family or social circles, to check in on.
          </ThemedText>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/orbits/groups/create-new-group')}
          style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}
        >
          <ThemedText style={styles.createButtonText}>Create a check-in group</ThemedText>
        </Pressable>

        <ThemedText type="subtitle" style={styles.sectionTitle}>Your groups</ThemedText>
        {groups.length ? groups.map((group) => {
          const nextMember = getNextGroupMember(group);
          const nextReminder = group.lastCheckIn
            ? `Next reminder ${new Date(group.nextDueAt).toLocaleDateString()}`
            : 'Ready for your first check-in';

          return (
            <Pressable
              key={group.id}
              accessibilityRole="button"
              accessibilityLabel={`${group.name}, ${group.members.length} people, ${group.cadence}`}
              onPress={() => router.push({ pathname: '/orbits/groups/group-page', params: { id: group.id } })}
              style={({ pressed }) => [
                styles.groupCard,
                { backgroundColor: theme.bubbleBackground },
                pressed && { backgroundColor: theme.bubbleBackgroundPressed },
              ]}
            >
              <View style={styles.groupCardHeader}>
                <ThemedText type="subtitle">{group.name}</ThemedText>
                <ThemedText style={styles.memberCount}>{group.members.length} people</ThemedText>
              </View>
              <View style={styles.orbitingMembers}>
                {group.members.slice(0, 6).map((member) => (
                  <ThemedText key={member.id} style={styles.memberSymbol}>{member.symbol}</ThemedText>
                ))}
                {group.members.length > 6 && (
                  <ThemedText style={styles.memberOverflow}>+{group.members.length - 6}</ThemedText>
                )}
              </View>
              <ThemedText style={{ color: theme.bubbleText }}>{group.cadence} · check in with one person</ThemedText>
              <ThemedText style={styles.nextMember}>
                {nextMember ? `Next up: ${nextMember.name}` : 'Add people to start your rotation'}
              </ThemedText>
              <ThemedText style={[styles.reminder, { color: theme.bubbleText }]}>{nextReminder}</ThemedText>
            </Pressable>
          );
        }) : (
          <View style={[styles.emptyCard, { backgroundColor: theme.bubbleBackground }]}>
            <ThemedText type="defaultSemiBold">No groups yet</ThemedText>
            <ThemedText style={{ color: theme.bubbleText }}>
              Create a private circle for the people you want to remember to check in on.
            </ThemedText>
          </View>
        )}
        <ThemedText style={styles.demoNote}>Demo mode: reminders appear here; no push notifications are sent.</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  intro: { marginTop: 8, lineHeight: 22 },
  infoCard: { marginTop: 20, padding: 16, borderRadius: 16, gap: 6 },
  createButton: {
    marginTop: 16,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#2563eb',
  },
  createButtonText: { color: '#fff', fontWeight: '700' },
  sectionTitle: { marginTop: 24, marginBottom: 12 },
  groupCard: { padding: 16, borderRadius: 16, marginBottom: 12, gap: 8 },
  groupCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  memberCount: { fontSize: 13, opacity: 0.75 },
  orbitingMembers: { minHeight: 28, flexDirection: 'row', alignItems: 'center', gap: 5 },
  memberSymbol: { fontSize: 20 },
  memberOverflow: { fontSize: 12, fontWeight: '700' },
  nextMember: { marginTop: 4, fontWeight: '700' },
  reminder: { fontSize: 13, opacity: 0.8 },
  emptyCard: { padding: 16, borderRadius: 16, gap: 6 },
  demoNote: { marginTop: 12, fontSize: 12, opacity: 0.7 },
  pressed: { opacity: 0.8 },
});

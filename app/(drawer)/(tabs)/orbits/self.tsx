/**
 * self.tsx
 *
 * File-level documentation comment.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, useColorScheme, View } from 'react-native';

/**
 * screenOptions options object.
 *
 * Configuration object for screen options.
 */
export const screenOptions = {
  title: 'Self',
  headerBackTitle: '',
  headerRight: undefined,
};

/**
 * SelfScreen component.
 *
 * Renders the UI for the Self screen.
 */
export default function SelfScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.hero, { backgroundColor: colorScheme === 'dark' ? '#0d0920' : '#fff' }]}> 
        <View style={styles.avatar}>
          <ThemedText type="subtitle" lightColor="#2B0F55">📷</ThemedText>
        </View>
        <View style={styles.profileInfo}>
          <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Nova Star</ThemedText>
          <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, marginTop: 4 }}>@nova.sun</ThemedText>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans }}>Online</ThemedText>
          </View>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 6 }]}>🎂 March 15th</ThemedText>
        </View>
      </View>
      
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => router.push('/orbits/self/self-profile-detailed')} style={styles.button}>
          <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#161423' : '#f2f2f7' }]}> 
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Nightowl</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 6 }]}>Wee hours OK/not OK to message me in</ThemedText>
          <Switch value={true} disabled style={{ marginTop: 12 }} trackColor={{ true: '#22c55e' }} />
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Timezone</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 6 }]}>Pacific Time — 10:23 PM</ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>At a glance</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 6 }]}>Love Languages: &quot;Quality Time&quot;</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 6 }]}>Gift ideas: &quot;I don&apos;t like gifts&quot;</ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Icebreakers</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 6 }]}>Ask me about:</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 4 }]}>&quot;Video games&quot;</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 12 }]}>I will instantly info-dump on:</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 4 }]}>&quot;Politics&quot;</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 12 }]}>Don&apos;t get me started on:</ThemedText>
          <ThemedText lightColor="#2B0F55" style={[styles.detailText, { marginTop: 4 }]}>&quot;Climate Change&quot;</ThemedText>
        </View>
      </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  hero: {
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
  },
  body: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: 24,
    borderRadius: 16,
    padding: 18,
  },
  section: {
    marginTop: 18,
  },
  detailText: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
});

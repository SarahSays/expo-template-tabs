/**
 * awards.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { StyleSheet, View, useColorScheme } from 'react-native';

const demoAwards = [
  {
    title: 'Most Connected',
    value: 'Avery',
    details: '5 shared circles',
  },
  {
    title: 'Most Frequently Contacted',
    value: 'Billie',
    details: '360 reach-outs this year',
  },
  {
    title: 'Longest Streak',
    value: 'Casey',
    details: '365 consecutive days',
  },
];

/**
 * AwardsScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function AwardsScreen() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedText type="title">Awards</ThemedText>

      <View style={styles.section}>
        {demoAwards.map((item) => (
          <View key={item.title} style={[styles.card, { backgroundColor: theme.bubbleBackground }]}>
            <ThemedText type="subtitle">{item.title}</ThemedText>
            <ThemedText style={styles.valueText}>{item.value}</ThemedText>
            <ThemedText style={[styles.detailsText, { color: theme.drawerInactiveText }]}>{item.details}</ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  valueText: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
  },
  detailsText: {
    marginTop: 4,
    fontSize: 13,
  },
});
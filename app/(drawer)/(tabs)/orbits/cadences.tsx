/**
 * cadences.tsx
 *
 * Cadences screen — visualizes communication rhythms as an animated
 * solar/planetary metaphor and allows selecting a cadence for a contact.
 *
 * Structure and responsibilities:
 * - `ITEMS`: array of available cadence choices shown as vertically stacked
 *   animated cards (revealed on scroll).
 * - `STARS`: randomized small points rendered in an absolute layer to provide
 *   a parallax starfield behind the cards.
 * - `getPlanetStyle(label)`: maps an ITEM `label` to a compact visual style
 *   (size + color) used for the planet circle shown on each card.
 * - `SunHeader()`: renders a static sun header visual at the top of the
 *   screen while the user scrolls through the cadence cards.
 * - The animated ScrollView drives per-card opacity/translation so each
 *   card fades/slides into view as it becomes centered.
 * - Selecting a card calls `setCadence(contactId, label)` (demo uses id `'1'`)
 *   and shows a confirmation Alert. Replace `'1'` with a real contact id or
 *   wire this screen to the contact selection UI to persist cadence changes.
 *
 * Maintenance notes:
 * - To change cadence entries, update the `ITEMS` array. `label` is used as a
 *   key; avoid re-using identical labels unless you update `getPlanetStyle`.
 * - Star density and behavior are controlled by the `STARS` array length and
 *   per-star `factor` values; reducing the length reduces draw calls.
 * - All measurements are responsive; the orbit graphic clamps to a maximum
 *   width so it displays well on narrow devices.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Alert, Animated, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { setCadence } from './contacts/_friendsStore';

/* export const screenOptions = {
  title: 'Cadences',
  headerBackTitle: '',
  headerRight: undefined,
}; */

/**
 * CadencesScreen component.
 *
 * Renders the UI for the Cadences screen.
 */
export default function CadencesScreen() {
  /**
   * ITEMS: cadence options displayed to the user.
   * - `label` is the unique identifier shown on the card and passed to
   *   `setCadence` when a card is selected.
   * - `caption` is a short secondary description shown under the label.
   * To add/remove options simply edit this array. Keep labels stable to
   * avoid remapping bugs when persisting cadence selections.
   */
  const ITEMS = [
    { label: 'Daily', caption: '1 day' },
    { label: 'Weekly', caption: '1 week' },
    { label: 'Monthly', caption: '1 month' },
    { label: '3 months', caption: 'Mercury' },
    { label: '6 months', caption: 'Venus' },
    { label: '1 year', caption: 'Earth' },
    { label: '2 years', caption: 'Mars' },
    { label: '5 years', caption: '5 years' },
    { label: '10 years', caption: 'Jupiter' },
  ];

  const { height, width } = useWindowDimensions();
  // Shorter cards: reduce vertical footprint so more cards fit on screen
  const itemHeight = Math.round(height * 0.3);
  const scrollY = useRef(new Animated.Value(0)).current;
  const params = useLocalSearchParams();
  const router = useRouter();
  const friendId = String(params.friendId || '');

  /**
   * STARS: precomputed star positions used for a subtle parallax background.
   * Each star includes a `factor` that controls how much it moves relative to
   * the scroll position (smaller = moves less). Reduce the `length` to lower
   * rendering cost on low-end devices.
   */
  const STARS = useRef(
    Array.from({ length: 29 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height * 1.6),
      size: Math.random() * 2.5 + 0.8,
      factor: Math.random() * 0.6 + 0.1,
    }))
  ).current;

  function getPlanetStyle(label: string) {
    switch (label) {
      case '3 months':
        return { width: 26, height: 26, borderRadius: 13, backgroundColor: '#D1D5DB' };
      case '6 months':
        return { width: 28, height: 28, borderRadius: 14, backgroundColor: '#D9FF5C' };
      case '1 year':
        return { width: 32, height: 32, borderRadius: 16, backgroundColor: '#3B82F6' };
      case '2 years':
        return { width: 16, height: 16, borderRadius: 8, backgroundColor: '#D97706' };
      case '5 years':
        return { width: 56, height: 56, borderRadius: 28, backgroundColor: '#B0AFA6' };
      case '10 years':
        // Jupiter
        return { width: 110, height: 110, borderRadius: 55, backgroundColor: '#F59E0B' };
      default:
        return { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F3C94D' };
    }
  }

  function getPlanetEmoji(label: string) {
    switch (label) {
      case 'Daily':
        return '🌎';
      case 'Weekly':
        return '🚀';
      case 'Monthly':
        return '🌕';
      case '5 years':
        return '🌌';
      default:
        return undefined;
    }
  }

  /**
   * SunHeader — simple top header visual for the cadence screen.
   *
   * This static component keeps the sun visible at the top while the user
   * scrolls through the cadence cards below.
   */

  function SunHeader() {
    return (
      <View style={styles.sunOrbitWrapper}>
        <View style={styles.sunContainer}>
          <View style={styles.sun} />
        </View>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Cadences</ThemedText>

      <View style={styles.pageBackground}>
        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.visualBackground}>
            <SunHeader />
          </View>

          {/* parallax stars layer */}
          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {STARS.map((s, idx) => {
            const translateY = Animated.multiply(scrollY, s.factor);
            return (
              <Animated.View
                key={idx}
                style={{
                  position: 'absolute',
                  left: s.x,
                  top: s.y,
                  width: s.size,
                  height: s.size,
                  borderRadius: s.size / 2,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transform: [{ translateY }],
                }}
              />
            );
          })}
        </View>

        {ITEMS.map((it, i) => {
          const planetStyle = getPlanetStyle(it.label);

          // Each card is pressable — in the demo we call `setCadence(contactId, label)`
          // with a hardcoded contact id '1'. Replace this with the currently
          // selected contact id when integrating with the contacts UI.
          return (
            <Pressable
              key={it.label}
              onPress={() => {
                if (friendId) {
                  // Save the human-readable label (e.g. '2 years') as the cadence value for the friend
                  setCadence(friendId, it.label);
                  // Return to the previous screen (contact profile)
                  router.back();
                  return;
                }

                // Fallback behavior for demo/testing
                setCadence('1', it.label);
                Alert.alert('Cadence set', `${it.label} selected`);
              }}
            >
              <View style={[styles.card, { height: itemHeight }]}>
                {getPlanetEmoji(it.label) ? (
                  <ThemedText style={styles.planetEmoji}>{getPlanetEmoji(it.label)}</ThemedText>
                ) : (
                  <View style={[styles.planetCircle, planetStyle]} />
                )}
                {!getPlanetEmoji(it.label) && (
                  <ThemedText type="subtitle" style={styles.cardLabel}>{it.label}</ThemedText>
                )}
                <ThemedText style={styles.cardCaption}>{it.caption}</ThemedText>
              </View>
            </Pressable>
          );
        })}
      </Animated.ScrollView>
    </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  planetCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3C94D',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 20,
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardCaption: {
    fontSize: 16,
    color: '#E2E8F0',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },
  title: {
    marginBottom: 12,
  },
  planetEmoji: {
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center',
    marginBottom: 4,
  },
  sunOrbitWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },
  sunContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sun: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F59E0B',
    shadowColor: '#FBBF24',
    shadowOpacity: 0.9,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },
  visualBackground: {
    backgroundColor: '#081528',
    borderRadius: 24,
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  pageBackground: {
    flex: 1,
    backgroundColor: '#081528',
    borderRadius: 32,
    marginTop: 18,
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
});

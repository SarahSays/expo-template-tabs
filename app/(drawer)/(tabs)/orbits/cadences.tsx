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
 * - `EarthOrbit()`: a self-contained animated mini-visual showing:
 *     - a rotating Earth (1 spin = 1 day),
 *     - a moon orbit loop (fast loop scaled for demo to suggest one month),
 *     - seven tick markers around the orbit to represent a weekly progression.
 *   This component is responsive and sized from the viewport width.
 * - The animated ScrollView drives per-card opacity/translation so each
 *   card fades/slides into view as it becomes centered.
 * - Selecting a card calls `setCadence(contactId, label)` (demo uses id `'1'`)
 *   and shows a confirmation Alert. Replace `'1'` with a real contact id or
 *   wire this screen to the contact selection UI to persist cadence changes.
 *
 * Maintenance notes:
 * - To change cadence entries, update the `ITEMS` array. `label` is used as a
 *   key; avoid re-using identical labels unless you update `getPlanetStyle`.
 * - Tweak animation timing in `EarthOrbit` by editing `duration` values.
 * - Star density and behavior are controlled by the `STARS` array length and
 *   per-star `factor` values; reducing the length reduces draw calls.
 * - All measurements are responsive; the orbit graphic clamps to a maximum
 *   width so it displays well on narrow devices.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Easing, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
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
    { label: '1 day', caption: 'Moon' },
    { label: '1 week', caption: 'Weekly' },
    { label: '1 month', caption: '1 month (Moon)' },
    { label: '3 months', caption: '3 months (Mercury)' },
    { label: '6 months', caption: '6 months (Venus)' },
    { label: '1 year', caption: '1 year (Earth)' },
    { label: '2 years', caption: '2 years (Mars)' },
    { label: '5 years', caption: '5 years (Asteroid Belt)' },
    { label: '10 years', caption: '10 years (Jupiter)' },
  ];

  const { height, width } = useWindowDimensions();
  const itemHeight = Math.round(height * 0.62);
  const scrollY = useRef(new Animated.Value(0)).current;

  /**
   * STARS: precomputed star positions used for a subtle parallax background.
   * Each star includes a `factor` that controls how much it moves relative to
   * the scroll position (smaller = moves less). Reduce the `length` to lower
   * rendering cost on low-end devices.
   */
  const STARS = useRef(
    Array.from({ length: 28 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height * 1.6),
      size: Math.random() * 2.5 + 0.8,
      factor: Math.random() * 0.6 + 0.1,
    }))
  ).current;

  function getPlanetStyle(label: string) {
    // Map a cadence `label` to a compact visual "planet" style.
    // Update these mappings to change planet sizes/colors used on the cards.
    switch (label) {
      case '1 day':
        return { width: 14, height: 14, borderRadius: 7, backgroundColor: '#E5E7EB' };
      case '1 week':
        return { width: 16, height: 16, borderRadius: 8, backgroundColor: '#E5E7EB' };
      case '1 month':
        return { width: 18, height: 18, borderRadius: 9, backgroundColor: '#CBD5E1' };
      case '3 months':
        return { width: 18, height: 18, borderRadius: 9, backgroundColor: '#D1D5DB' };
      case '6 months':
        return { width: 20, height: 20, borderRadius: 10, backgroundColor: '#D9FF5C' };
      case '1 year':
        return { width: 22, height: 22, borderRadius: 11, backgroundColor: '#3B82F6' };
      case '2 years':
        return { width: 16, height: 16, borderRadius: 8, backgroundColor: '#D97706' };
      case '5 years':
        return { width: 26, height: 26, borderRadius: 13, backgroundColor: '#B0AFA6' };
      case '10 years':
        return { width: 46, height: 46, borderRadius: 23, backgroundColor: '#F97316' };
      default:
        return { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F3C94D' };
    }
  }

  /**
   * EarthOrbit — small helper component that renders a responsive orbit
   * visualization demonstrating a day/week/month metaphor:
   * - Earth rotates continuously (representing daily spin).
   * - Moon orbits around Earth (scaled faster for demo purposes).
   * - Seven ticks around the orbit represent the 7 days of a week.
   *
   * Tuning:
   * - Adjust `duration` in the `Animated.timing` calls to scale speed.
   * - Change `orbitSize` computation to alter the max display width.
   */

  function EarthOrbit() {
    const spin = useRef(new Animated.Value(0)).current;
    const moon = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(spin, { toValue: 1, duration: 1200, easing: Easing.linear, useNativeDriver: true })
      ).start();
      Animated.loop(
        Animated.timing(moon, { toValue: 1, duration: 8000, easing: Easing.linear, useNativeDriver: true })
      ).start();
    }, [spin, moon]);

    const earthRotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    const moonRotate = moon.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    const orbitSize = Math.min(220, width - 64);
    const orbitRadius = orbitSize / 2 - 16;

    const ticks = Array.from({ length: 7 }).map((_, i) => {
      const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
      return {
        left: orbitSize / 2 + Math.cos(angle) * orbitRadius - 4,
        top: orbitSize / 2 + Math.sin(angle) * orbitRadius - 4,
      };
    });

    return (
      <View style={styles.orbitContainer}>
        <View style={[styles.orbitPath, { width: orbitSize, height: orbitSize, borderRadius: orbitSize / 2 }]}>
          {ticks.map((t, idx) => (
            // week tick markers: visually show a seven-day progression
            <View key={idx} style={[styles.weekTick, { left: t.left, top: t.top }]} />
          ))}

          <Animated.View style={[styles.earthWrapper, { transform: [{ rotate: earthRotate }] }]}>
            {/* earth + day-overlay: the overlay is a semi-transparent half that
                demonstrates night passing as the earth spins. Tweak the
                overlay transform to change the shadow offset. */}
            <View style={styles.earth} />
            <View style={styles.dayOverlay} />
          </Animated.View>

          {/* moonOrbit rotates the container; the moon is positioned on the
              right edge of the orbit and rotates around Earth. */}
          <Animated.View style={[styles.moonOrbit, { width: orbitSize, height: orbitSize, transform: [{ rotate: moonRotate }] }]} pointerEvents="none">
            <View style={[styles.moon, { left: orbitSize / 2 + orbitRadius - 8 }]} />
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Cadences</ThemedText>

      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <EarthOrbit />
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
          const inputRange = [ (i - 1) * itemHeight, i * itemHeight, (i + 1) * itemHeight ];
          const opacity = scrollY.interpolate({ inputRange, outputRange: [0, 1, 0], extrapolate: 'clamp' });
          const translateY = scrollY.interpolate({ inputRange, outputRange: [20, 0, -20], extrapolate: 'clamp' });
          const planetStyle = getPlanetStyle(it.label);

          // Each card is pressable — in the demo we call `setCadence(contactId, label)`
          // with a hardcoded contact id '1'. Replace this with the currently
          // selected contact id when integrating with the contacts UI.
          return (
            <Pressable
              key={it.label}
              onPress={() => {
                // TODO: replace '1' with real contact id from params/context
                setCadence('1', it.label);
                Alert.alert('Cadence set', `${it.label} selected`);
              }}
            >
              <Animated.View style={[styles.card, { height: itemHeight, opacity, transform: [{ translateY }] }]}>
                <View style={[styles.planetCircle, planetStyle]} />
                <ThemedText type="subtitle" style={styles.cardLabel}>{it.label}</ThemedText>
                <ThemedText style={styles.cardCaption}>{it.caption}</ThemedText>
              </Animated.View>
            </Pressable>
          );
        })}
      </Animated.ScrollView>
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
  },
  planetCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F3C94D',
    marginBottom: 18,
  },
  cardLabel: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardCaption: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
  },
  orbitContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  orbitPath: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekTick: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  earthWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earth: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  dayOverlay: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.25)',
    transform: [{ translateX: 14 }],
  },
  moonOrbit: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moon: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
});

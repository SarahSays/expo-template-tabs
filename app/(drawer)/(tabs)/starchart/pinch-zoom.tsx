import { useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const activityPalette = ['#60A5FA', '#F8FAFC', '#FDE68A', '#FB923C', '#F87171'];

/**
 * Creates a deterministic shuffle of the activity palette.
 *
 * Why this exists:
 * - We want each generated layer to feel organic instead of repeating the
 *   exact same color order.
 * - We still want visuals to be stable for a given input so re-renders do not
 *   "jump" colors unexpectedly.
 */
const buildRandomizedPalette = (seed: number) => {
  const palette = [...activityPalette];
  let nextSeed = seed;

  for (let index = palette.length - 1; index > 0; index -= 1) {
    nextSeed = (nextSeed * 9301 + 49297) % 233280;
    const random = nextSeed / 233280;
    const swapIndex = Math.floor(random * (index + 1));

    [palette[index], palette[swapIndex]] = [palette[swapIndex], palette[index]];
  }

  return palette;
};

/**
 * Places the 12 month nodes in a circular, clock-like layout.
 *
 * Geometry notes:
 * - `centerY` is intentionally fixed so the lower legend has visual space.
 * - `spiralRadius` introduces a subtle inward drift to avoid a perfect rigid
 *   ring and keep the composition feeling more "galactic".
 */
const createMonthNodes = (fieldWidth: number, paletteSeed: number) => {
  const centerX = fieldWidth / 2;
  const centerY = 300;
  const radius = Math.min(190, fieldWidth / 2.1);

  const randomizedPalette = buildRandomizedPalette(paletteSeed);

  return monthNames.map((month, index) => {
    const angle = -Math.PI / 2 - index * ((Math.PI * 2) / 12);
    const spiralRadius = radius - index * 3;
    const x = centerX + Math.cos(angle) * spiralRadius;
    const y = centerY + Math.sin(angle) * spiralRadius;

    return {
      id: month,
      x,
      y,
      size: 28 + (index % 3) * 4,
      tint: randomizedPalette[index % randomizedPalette.length],
      halo: index % 2 === 0 ? 'rgba(96, 165, 250, 0.48)' : 'rgba(248, 113, 113, 0.36)',
    };
  });
};

/**
 * Builds stars shown inside the selected month lens.
 *
 * Behavior contract:
 * - Seed comes from the selected month index so each month keeps a distinct
 *   but stable cluster signature.
 * - Returned points are centered around (0, 0); the caller is responsible for
 *   translating them into lens space.
 */
const createClusterStars = (seed: number) =>
  Array.from({ length: 30 }, (_, index) => {
    const angle = -(index / 30) * Math.PI * 2;
    const radius = 16 + (index % 5) * 7 + ((seed % 3) * 4);
    const randomizedPalette = buildRandomizedPalette(seed + index + 1);
    return {
      id: `${seed}-${index}`,
      angle,
      radius,
      size: 5 + (index % 3),
      glow: randomizedPalette[index % randomizedPalette.length],
    };
  });

/**
 * Generates the background star field for the full scene.
 *
 * This layer is static per width to avoid expensive per-frame recalculation.
 */
const createGalaxyDots = (fieldWidth: number) => {
  const centerX = fieldWidth / 2;
  const centerY = 310;

  return Array.from({ length: 42 }, (_, index) => {
    const angle = index * 0.52;
    const radius = 18 + index * 8.4;
    const x = centerX + Math.cos(angle) * radius + Math.sin(index * 1.7) * 8;
    const y = centerY + Math.sin(angle) * radius * 0.7 + Math.cos(index * 2.4) * 10;

    return {
      id: `dot-${index}`,
      x,
      y,
      size: 1.5 + (index % 3) * 0.9,
      opacity: 0.35 + (index % 4) * 0.12,
      color: ['#FFFFFF', '#B6A3FF', '#9AD7FF', '#FDE68A'][index % 4],
    };
  });
};

/**
 * Generates a deterministic set of tiny florets used to draw each month as a
 * fractal-like head instead of a plain circle.
 */
const createFractalFlorets = (seed: number) =>
  Array.from({ length: 11 }, (_, index) => {
    const angle = index * 0.88 + (seed % 4) * 0.16;
    const ring = 3 + Math.floor(index / 3) * 2.2;
    return {
      id: `${seed}-${index}`,
      x: Math.cos(angle) * ring,
      y: Math.sin(angle) * ring,
      size: index === 0 ? 8 : index < 5 ? 6 : 4,
      color: activityPalette[(seed + index) % activityPalette.length],
    };
  });

/**
 * PinchZoomScreen component.
 *
 * Renders the star chart as a clock-face Milky Way concept where each month sits
 * around the center of the page like the numbers on a clock.
 */
export default function PinchZoomScreen() {
  const { width, height } = useWindowDimensions();
  // Double-tap detection state is kept in refs to avoid re-renders while
  // tracking short-lived gesture timing values.
  const lastTapRef = useRef<number | null>(null);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expansionAnim = useRef(new Animated.Value(0)).current;

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  // Keep scene dimensions responsive while preserving the design's intended
  // proportions and legend spacing on small screens.
  const fieldWidth = Math.min(width - 12, 900);
  const fieldHeight = Math.min(720, Math.max(580, height - 160));
  const paletteSeed = useMemo(() => Math.floor(Math.random() * 100000) + 1, []);
  const galaxyDots = useMemo(() => createGalaxyDots(fieldWidth), [fieldWidth]);
  const months = useMemo(() => createMonthNodes(fieldWidth, paletteSeed), [fieldWidth, paletteSeed]);
  const expandedSurfaceWidth = Math.max(240, fieldWidth - 24);
  const expandedSurfaceHeight = Math.max(260, fieldHeight - 140);
  const expandedSurfaceCenterX = expandedSurfaceWidth / 2;
  const expandedSurfaceCenterY = expandedSurfaceHeight / 2;
  const expandedMonthIndex = expandedMonth ? monthNames.indexOf(expandedMonth) : -1;
  const expandedClusterStars = useMemo(
    () => createClusterStars(expandedMonthIndex >= 0 ? expandedMonthIndex + 1 : 0),
    [expandedMonthIndex],
  );
  const expandedFlorets = useMemo(
    () => (expandedMonthIndex >= 0 ? createFractalFlorets(expandedMonthIndex + 1) : []),
    [expandedMonthIndex],
  );
  const expandedScale = expansionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.42, 1],
  });
  const expandedOpacity = expansionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const expandMonthScene = (monthId: string) => {
    setExpandedMonth(monthId);
    expansionAnim.setValue(0);
    Animated.timing(expansionAnim, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const collapseMonthScene = () => {
    Animated.timing(expansionAnim, {
      toValue: 0,
      duration: 190,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setExpandedMonth(null);
      }
    });
  };

  /**
   * Handles month press and double-tap full-screen expansion.
   *
   * Interaction model:
   * - First tap selects a month.
   * - Double tap on the same month toggles full-screen expansion.
   */
  const handleMonthPress = (monthId: string) => {
    const now = Date.now();
    const doubleTapWindow = 500;

    if (zoomTimerRef.current) {
      clearTimeout(zoomTimerRef.current);
    }

    if (selectedMonth === monthId && lastTapRef.current && now - lastTapRef.current < doubleTapWindow) {
      if (expandedMonth === monthId) {
        collapseMonthScene();
      } else {
        expandMonthScene(monthId);
      }
      lastTapRef.current = null;
      return;
    }

    setSelectedMonth(monthId);
    if (expandedMonth && expandedMonth !== monthId) {
      collapseMonthScene();
    }
    lastTapRef.current = now;

    zoomTimerRef.current = setTimeout(() => {
      lastTapRef.current = null;
    }, doubleTapWindow);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#050312' }]}>
      <View style={styles.fieldShell}>
        <View style={[styles.field, { backgroundColor: '#050312', width: fieldWidth, height: fieldHeight }]}>
          {/* Full-scene background stars rendered behind all interactive layers. */}
          <View style={styles.galaxyBackdrop}>
            {galaxyDots.map((dot) => (
              <View
                key={dot.id}
                style={[
                  styles.galaxyDot,
                  {
                    left: dot.x - dot.size / 2,
                    top: dot.y - dot.size / 2,
                    width: dot.size,
                    height: dot.size,
                    opacity: dot.opacity,
                    backgroundColor: dot.color,
                  },
                ]}
              />
            ))}
          </View>

          {months.map((month) => {
            const active = selectedMonth === month.id || expandedMonth === month.id;
            const monthIndex = monthNames.indexOf(month.id);
            const florets = createFractalFlorets(monthIndex + 1);
            const broccoliSize = month.size + 10;
            return (
              <Pressable
                key={month.id}
                onPress={() => handleMonthPress(month.id)}
                style={({ pressed }) => [
                  styles.monthStar,
                  {
                    left: month.x - broccoliSize / 2,
                    top: month.y - broccoliSize / 2,
                    width: broccoliSize,
                    height: broccoliSize,
                    backgroundColor: 'transparent',
                    opacity: pressed ? 0.82 : 1,
                    borderColor: active ? '#ffffff' : 'transparent',
                    borderWidth: active ? 2 : 0,
                    shadowColor: month.halo,
                  },
                ]}
              >
                {florets.map((floret) => (
                  <View
                    key={floret.id}
                    style={[
                      styles.romanescoFloret,
                      {
                        left: broccoliSize / 2 - floret.size / 2 + floret.x,
                        top: broccoliSize / 2 - floret.size / 2 + floret.y,
                        width: floret.size,
                        height: floret.size,
                        backgroundColor: floret.color,
                      },
                    ]}
                  />
                ))}
                <View style={styles.monthLabelChip}>
                  <ThemedText style={styles.monthLabel}>{month.id}</ThemedText>
                </View>
              </Pressable>
            );
          })}

          {expandedMonth ? (
            <Pressable style={styles.expandedLayerTouch} onPress={collapseMonthScene}>
              <Animated.View
                style={[
                  styles.expandedLayer,
                  {
                    opacity: expandedOpacity,
                    transform: [{ scale: expandedScale }],
                  },
                ]}
              >
              <View style={styles.expandedHeader}>
                <ThemedText style={styles.expandedTitle}>{expandedMonth}</ThemedText>
                <ThemedText style={styles.expandedHint}>Tap anywhere to collapse</ThemedText>
              </View>

              <View
                style={[
                  styles.expandedRomanesco,
                  {
                    width: expandedSurfaceWidth,
                    height: expandedSurfaceHeight,
                  },
                ]}
              >
                {expandedFlorets.map((floret) => (
                  <View
                    key={`expanded-${floret.id}`}
                    style={[
                      styles.expandedFloret,
                      {
                        left: expandedSurfaceCenterX + floret.x * 14,
                        top: expandedSurfaceCenterY + floret.y * 14,
                        width: floret.size * 5,
                        height: floret.size * 5,
                        backgroundColor: floret.color,
                      },
                    ]}
                  />
                ))}
              </View>

              {expandedClusterStars.map((star) => {
                const x = Math.cos(star.angle) * star.radius * 2.6;
                const y = Math.sin(star.angle) * star.radius * 2.3;
                return (
                  <View
                    key={`expanded-cluster-${star.id}`}
                    style={[
                      styles.clusterStar,
                      {
                        left: fieldWidth / 2 + x,
                        top: fieldHeight / 2 + y + 24,
                        width: star.size + 2,
                        height: star.size + 2,
                        backgroundColor: star.glow,
                      },
                    ]}
                  />
                );
              })}
              </Animated.View>
            </Pressable>
          ) : null}

          <View style={styles.legendCard}>
            <View style={styles.legendTextRow}>
              <ThemedText style={styles.legendLabel}>More</ThemedText>
              <View style={styles.legendRow}>
                {activityPalette.map((color) => (
                  <View key={color} style={[styles.legendSwatch, { backgroundColor: color }]} />
                ))}
              </View>
              <ThemedText style={styles.legendLabel}>Less</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingTop: 16,
  },
  title: {
    paddingHorizontal: 4,
    paddingBottom: 6,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  fieldShell: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  field: {
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  galaxyBackdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#050312',
  },
  galaxyDot: {
    position: 'absolute',
    borderRadius: 999,
  },
  monthStar: {
    position: 'absolute',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  romanescoFloret: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  monthLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ECF7FF',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  monthLabelChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: 'rgba(6, 10, 24, 0.62)',
  },
  legendCard: {
    position: 'absolute',
    left: 12,
    right: 12,
    // Keep legend pinned to the tab-bar boundary across screen sizes.
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(8, 11, 31, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  legendTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  legendLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D8E3FF',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  legendSwatch: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  expandedLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 7, 20, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedLayerTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  expandedHeader: {
    position: 'absolute',
    top: 22,
    left: 20,
    right: 20,
    alignItems: 'center',
    gap: 6,
  },
  expandedTitle: {
    color: '#EAF5FF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  expandedHint: {
    color: 'rgba(222, 234, 255, 0.84)',
    fontSize: 12,
    fontWeight: '600',
  },
  expandedRomanesco: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(203, 222, 255, 0.36)',
    backgroundColor: 'rgba(128, 158, 255, 0.1)',
    overflow: 'hidden',
  },
  expandedFloret: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#fff',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  clusterStar: {
    position: 'absolute',
    borderRadius: 999,
    shadowColor: '#fff',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});
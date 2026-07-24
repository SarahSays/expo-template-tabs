import { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const activityPalette = ['#60A5FA', '#F8FAFC', '#FDE68A', '#FB923C', '#F87171'];

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
 * PinchZoomScreen component.
 *
 * Renders the star chart as a clock-face Milky Way concept where each month sits
 * around the center of the page like the numbers on a clock.
 */
export default function PinchZoomScreen() {
  const { width, height } = useWindowDimensions();
  const lastTapRef = useRef<number | null>(null);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  const fieldWidth = Math.min(width - 12, 900);
  const fieldHeight = Math.min(720, Math.max(580, height - 160));
  const paletteSeed = useMemo(() => Math.floor(Math.random() * 100000) + 1, []);
  const galaxyDots = useMemo(() => createGalaxyDots(fieldWidth), [fieldWidth]);
  const months = useMemo(() => createMonthNodes(fieldWidth, paletteSeed), [fieldWidth, paletteSeed]);
  const clusterStars = useMemo(() => createClusterStars(selectedMonth ? monthNames.indexOf(selectedMonth) + 1 : 0), [selectedMonth]);
  const selectedNode = months.find((month) => month.id === selectedMonth);

  const handleMonthPress = (monthId: string) => {
    const now = Date.now();
    const doubleTapWindow = 500;

    if (zoomTimerRef.current) {
      clearTimeout(zoomTimerRef.current);
    }

    if (selectedMonth === monthId && lastTapRef.current && now - lastTapRef.current < doubleTapWindow) {
      setZoomLevel((current) => (current + 1) % 3);
      lastTapRef.current = null;
      return;
    }

    setSelectedMonth(monthId);
    setZoomLevel(1);
    lastTapRef.current = now;

    zoomTimerRef.current = setTimeout(() => {
      lastTapRef.current = null;
    }, doubleTapWindow);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#050312' }]}>
      <View style={styles.fieldShell}>
        <View style={[styles.field, { backgroundColor: '#050312', width: fieldWidth, height: fieldHeight }]}>
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
            const active = selectedMonth === month.id;
            return (
              <Pressable
                key={month.id}
                onPress={() => handleMonthPress(month.id)}
                style={({ pressed }) => [
                  styles.monthStar,
                  {
                    left: month.x - month.size / 2,
                    top: month.y - month.size / 2,
                    width: month.size,
                    height: month.size,
                    backgroundColor: month.tint,
                    opacity: pressed ? 0.82 : 1,
                    borderColor: active ? '#ffffff' : 'transparent',
                    borderWidth: active ? 2 : 0,
                    shadowColor: month.halo,
                  },
                ]}
              >
                <ThemedText style={styles.monthLabel}>{month.id}</ThemedText>
              </Pressable>
            );
          })}

          {selectedNode && zoomLevel >= 1 ? (
            <View style={[styles.clusterLens, { left: selectedNode.x - 118, top: selectedNode.y - 118 }]}>
              {clusterStars.map((star) => {
                const x = Math.cos(star.angle) * star.radius;
                const y = Math.sin(star.angle) * star.radius;
                return (
                  <View
                    key={star.id}
                    style={[
                      styles.clusterStar,
                      {
                        left: 118 + x,
                        top: 118 + y,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.glow,
                      },
                    ]}
                  >
                    {zoomLevel >= 2 ? (
                      <View
                        style={[
                          styles.planetOrbit,
                          {
                            left: -6,
                            top: -6,
                            width: star.size + 12,
                            height: star.size + 12,
                          },
                        ]}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>
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
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1F1B2E',
  },
  legendCard: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
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
  clusterLens: {
    position: 'absolute',
    width: 236,
    height: 236,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#C4B5FD',
    backgroundColor: 'rgba(179, 157, 255, 0.12)',
    overflow: 'hidden',
  },
  clusterStar: {
    position: 'absolute',
    borderRadius: 999,
    shadowColor: '#fff',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  planetOrbit: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
});
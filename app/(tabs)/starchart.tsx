import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView } from 'react-native-gesture-handler';

const THUMB_SIZE = 24;
const TRACK_HEIGHT = 8;
const SCENE_SIZE = 320;

export default function StarchartScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const { width } = useWindowDimensions();
  const trackWidth = Math.min(540, Math.max(280, width - 40));
  const sceneSize = Math.min(SCENE_SIZE, width - 40);
  const [timeLabel, setTimeLabel] = useState('1 Day');
  const progress = useSharedValue(0);

  const updateProgress = (x: number) => {
    const next = Math.min(trackWidth - THUMB_SIZE, Math.max(0, x));
    progress.value = next / (trackWidth - THUMB_SIZE);
  };

  useAnimatedReaction(
    () => progress.value,
    (value, previousValue) => {
      const nextLabel =
        value < 0.15
          ? '1 Day'
          : value < 0.35
            ? '1 Week'
            : value < 0.55
              ? '1 Month'
              : value < 0.8
                ? '1 Year'
                : '10 Years';
      const previousLabel = previousValue == null
        ? nextLabel
        : previousValue < 0.15
          ? '1 Day'
          : previousValue < 0.35
            ? '1 Week'
            : previousValue < 0.55
              ? '1 Month'
              : previousValue < 0.8
                ? '1 Year'
                : '10 Years';

      if (nextLabel !== previousLabel) {
        runOnJS(setTimeLabel)(nextLabel);
      }
    }
  );

  const sceneStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.55]);
    return {
      transform: [{ scale }],
    };
  });

  const sunStyle = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 0.4, 1], [42, 62, 90]);
    const x = interpolate(progress.value, [0, 1], [24, 110]);
    const y = interpolate(progress.value, [0, 1], [-22, -8]);
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      opacity: interpolate(progress.value, [0, 0.1, 1], [0.6, 1, 1]),
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  const earthOrbitStyle = useAnimatedStyle(() => {
    const orbit = interpolate(progress.value, [0.2, 1], [0, 132]);
    const opacity = interpolate(progress.value, [0.15, 0.3], [0, 1]);
    return {
      width: orbit * 2,
      height: orbit * 2,
      borderRadius: orbit,
      opacity,
      transform: [{ translateX: -orbit }, { translateY: -orbit }],
    };
  });

  const earthStyle = useAnimatedStyle(() => {
    const size = interpolate(progress.value, [0, 1], [52, 14]);
    const orbit = interpolate(progress.value, [0, 1], [0, 132]);
    const angle = progress.value * Math.PI * 3.2;
    const x = orbit * Math.cos(angle);
    const y = orbit * Math.sin(angle);
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  const moonStyle = useAnimatedStyle(() => {
    const earthOrbit = interpolate(progress.value, [0, 1], [0, 132]);
    const baseOrbit = interpolate(progress.value, [0, 1], [18, 40]);
    const moonAngle = progress.value * Math.PI * 14;
    const earthAngle = progress.value * Math.PI * 3.2;
    const earthX = earthOrbit * Math.cos(earthAngle);
    const earthY = earthOrbit * Math.sin(earthAngle);
    const x = earthX + baseOrbit * Math.cos(moonAngle);
    const y = earthY + baseOrbit * Math.sin(moonAngle);
    const size = interpolate(progress.value, [0, 1], [14, 6]);
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  const moonOrbitStyle = useAnimatedStyle(() => {
    const orbit = interpolate(progress.value, [0, 1], [18, 40]);
    const earthOrbit = interpolate(progress.value, [0, 1], [0, 132]);
    const angle = progress.value * Math.PI * 3.2;
    const earthX = earthOrbit * Math.cos(angle);
    const earthY = earthOrbit * Math.sin(angle);
    return {
      width: orbit * 2,
      height: orbit * 2,
      borderRadius: orbit,
      opacity: interpolate(progress.value, [0, 0.25, 1], [0, 0.8, 1]),
      transform: [{ translateX: earthX - orbit }, { translateY: earthY - orbit }],
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    const x = progress.value * (trackWidth - THUMB_SIZE);
    return {
      transform: [{ translateX: x }],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      width: progress.value * (trackWidth - THUMB_SIZE) + THUMB_SIZE / 2,
    };
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {/* <ThemedText type="title">Star Chart</ThemedText> */}
        <View style={[styles.sceneWrapper, { minHeight: sceneSize }]}> 
          <Animated.View style={[styles.scene, { width: sceneSize, height: sceneSize, borderRadius: sceneSize / 2 }, sceneStyle]}>
            <View style={styles.spaceBackground} />
            <View style={styles.stars}>
              {[
                { top: 28, left: 20, size: 3, opacity: 0.7 },
                { top: 52, left: 192, size: 4, opacity: 1 },
                { top: 96, left: 72, size: 2, opacity: 0.6 },
                { top: 148, left: 280, size: 3, opacity: 0.75 },
                { top: 206, left: 210, size: 5, opacity: 0.9 },
                { top: 240, left: 68, size: 2, opacity: 0.5 },
                { top: 120, left: 26, size: 3, opacity: 0.65 },
                { top: 56, left: 264, size: 3, opacity: 0.8 },
              ].map((star, index) => (
                <View
                  key={index}
                  style={[
                    styles.star,
                    {
                      top: star.top,
                      left: star.left,
                      width: star.size,
                      height: star.size,
                      borderRadius: star.size / 2,
                      opacity: star.opacity,
                    },
                  ]}
                />
              ))}
            </View>
            <Animated.View style={[styles.sun, sunStyle]} />
            <Animated.View style={[styles.earthOrbitRing, earthOrbitStyle]} />
            <Animated.View style={[styles.moonOrbitRing, moonOrbitStyle]} />
            <Animated.View style={[styles.earth, earthStyle]} />
            <Animated.View style={[styles.moon, moonStyle]} />
          </Animated.View>
        </View>

        <View style={styles.timeline}>
          <ThemedText type="subtitle">Time slider</ThemedText>
          <ThemedText>{timeLabel}</ThemedText>
        </View>

        <Animated.View
          style={[styles.sliderTrack, { width: trackWidth }]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={(event) => updateProgress(event.nativeEvent.locationX)}
          onResponderMove={(event) => updateProgress(event.nativeEvent.locationX)}>
          <Animated.View style={[styles.sliderFill, fillStyle]} />
          <Animated.View style={[styles.sliderThumb, thumbStyle]} />
        </Animated.View>

        <View style={[styles.sliderTickRow, { width: trackWidth }]}> 
          {[
            { label: 'Day', position: 0, align: 'flex-start' as const },
            { label: 'Week', position: 0.12 },
            { label: 'Month', position: 0.28 },
            { label: 'Year', position: 0.55 },
            { label: '10 Years', position: 1, align: 'flex-end' as const },
          ].map((tick) => (
            <View
              key={tick.label}
              style={[
                styles.tickItem,
                {
                  left: tick.position * trackWidth,
                  alignItems: tick.align ?? 'center',
                  transform: tick.position === 0 || tick.position === 1 ? [] : [{ translateX: -32 }],
                },
              ]}>
              <View style={styles.tickMark} />
              <ThemedText style={styles.tickLabel}>{tick.label}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  sceneWrapper: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: SCENE_SIZE,
  },
  scene: {
    width: SCENE_SIZE,
    height: SCENE_SIZE,
    borderRadius: SCENE_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03050a',
  },
  spaceBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#03050a',
  },
  stars: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d8e9ff',
    opacity: 0.8,
  },
  starMedium: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    top: 40,
    left: 60,
  },
  starLarge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    top: 210,
    left: 190,
  },
  sun: {
    position: 'absolute',
    backgroundColor: '#f9ba2f',
    shadowColor: '#f9ba2f',
    shadowOpacity: 0.45,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
  },
  earthOrbitRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(138, 193, 255, 0.32)',
  },
  moonOrbitRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  earth: {
    position: 'absolute',
    backgroundColor: '#3b85ff',
    shadowColor: '#3b85ff',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  moon: {
    position: 'absolute',
    backgroundColor: '#f6f8ff',
    borderWidth: 1,
    borderColor: '#dfe7ff',
  },
  timeline: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderTrack: {
    marginTop: 18,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  sliderFill: {
    height: TRACK_HEIGHT,
    backgroundColor: '#4aa1ff',
  },
  sliderThumb: {
    position: 'absolute',
    top: -(THUMB_SIZE - TRACK_HEIGHT) / 2,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#d7e8ff',
    borderWidth: 1,
    borderColor: '#7fb0ff',
    shadowColor: '#7fb0ff',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  sliderTickRow: {
    marginTop: 12,
    height: 48,
    position: 'relative',
  },
  tickItem: {
    position: 'absolute',
    minWidth: 56,
    alignItems: 'center',
    gap: 4,
  },
  tickMark: {
    width: 2,
    height: 10,
    borderRadius: 1,
    backgroundColor: '#c7dcff',
    marginBottom: 4,
  },
  tickLabel: {
    fontSize: 12,
    color: '#dce7ff',
  },
});

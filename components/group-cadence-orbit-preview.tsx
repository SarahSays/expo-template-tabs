import { type GroupCadence } from '@/services/demoGroupsStore';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const MOON_ORBITS: Record<GroupCadence, number> = {
  'Every week': 0.25,
  'Every 2 weeks': 0.5,
  'Every month': 1,
  'Every 3 months': 3,
};

export function GroupCadenceOrbitPreview({ cadence }: { cadence: GroupCadence }) {
  const progress = useSharedValue(0);
  const moonOrbits = MOON_ORBITS[cadence];
  const earthRotation = moonOrbits * 30;
  const moonRotation = moonOrbits * 360;

  useEffect(() => {
    cancelAnimation(progress);
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: Math.max(800, moonOrbits * 900),
      easing: Easing.linear,
    });
    return () => cancelAnimation(progress);
  }, [cadence, moonOrbits, progress]);

  const earthMotionStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * earthRotation}deg` }],
  }));
  const moonMotionStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * moonRotation}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View accessible={false} style={styles.scene}>
        <View style={[styles.star, styles.starOne]} />
        <View style={[styles.star, styles.starTwo]} />
        <View style={[styles.star, styles.starThree]} />
        <View style={styles.earthOrbitPath} />
        <View style={styles.sun} />
        <Animated.View style={[styles.earthOrbitMotion, earthMotionStyle]}>
          <View style={styles.earth}>
            <View style={styles.moonOrbitPath} />
            <Animated.View style={[styles.moonOrbitMotion, moonMotionStyle]}>
              <View style={styles.moon} />
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 16 },
  scene: {
    width: 220,
    height: 150,
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#081528',
  },
  star: { position: 'absolute', width: 3, height: 3, borderRadius: 2, backgroundColor: '#D8E9FF' },
  starOne: { left: 28, top: 28 },
  starTwo: { left: 185, top: 43, width: 4, height: 4 },
  starThree: { left: 52, top: 118, width: 2, height: 2 },
  earthOrbitPath: {
    position: 'absolute',
    left: 60,
    top: 25,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'rgba(216,233,255,0.38)',
    borderRadius: 50,
  },
  sun: {
    position: 'absolute',
    left: 96,
    top: 61,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F9BA2F',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 0px 18px rgba(249,186,47,0.5)' }
      : { shadowColor: '#F9BA2F', shadowOpacity: 0.6, shadowRadius: 16, shadowOffset: { width: 0, height: 0 } }),
  },
  earthOrbitMotion: {
    position: 'absolute',
    left: 60,
    top: 25,
    width: 100,
    height: 100,
  },
  earth: {
    position: 'absolute',
    left: 41,
    top: -9,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3B85FF',
    borderWidth: 1,
    borderColor: '#A8D0FF',
  },
  moonOrbitPath: {
    position: 'absolute',
    left: -13,
    top: -13,
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(223,233,255,0.35)',
    borderRadius: 22,
  },
  moonOrbitMotion: {
    position: 'absolute',
    left: -13,
    top: -13,
    width: 44,
    height: 44,
  },
  moon: {
    position: 'absolute',
    left: 19,
    top: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F6F8FF',
    borderWidth: 1,
    borderColor: '#D7E2FF',
  },
});

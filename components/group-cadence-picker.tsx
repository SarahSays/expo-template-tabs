import { ThemedText } from '@/components/themed-text';
import { GroupCadenceOrbitPreview } from '@/components/group-cadence-orbit-preview';
import { GROUP_CADENCES, type GroupCadence } from '@/services/demoGroupsStore';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  Pressable,
  Platform,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
  type GestureResponderEvent,
} from 'react-native';

type GroupCadencePickerProps = {
  value: GroupCadence;
  onChange: (cadence: GroupCadence) => void;
};

const TICK_LABELS = ['Weekly', 'Biweekly', 'Monthly', 'Quarterly'] as const;
const THUMB_SIZE = 30;
const TRACK_HEIGHT = 12;

export function GroupCadencePicker({ value, onChange }: GroupCadencePickerProps) {
  const { width: windowWidth } = useWindowDimensions();
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const isDark = colorScheme === 'dark';
  const trackWidth = Math.max(160, Math.min(540, windowWidth - 64));
  const selectedIndex = Math.max(0, GROUP_CADENCES.indexOf(value));
  const progress = selectedIndex / (GROUP_CADENCES.length - 1);
  const [measuredTrackLeft, setMeasuredTrackLeft] = useState(0);
  const sliderProgress = useSharedValue(progress);
  const usableTrackWidth = trackWidth - THUMB_SIZE;
  const tickColor = isDark ? '#D8E8FF' : '#2B0F55';
  const tickMarkColor = isDark ? 'rgba(255,255,255,0.7)' : '#4C4C7E';
  const trackColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(45,118,191,0.18)';
  const thumbBorderColor = isDark ? '#7FB0FF' : '#4EA7FF';

  const fillStyle = useAnimatedStyle(() => ({
    width: sliderProgress.value * usableTrackWidth + THUMB_SIZE / 2,
  }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderProgress.value * usableTrackWidth }],
  }));

  function chooseIndex(index: number, animate = true) {
    const boundedIndex = Math.max(0, Math.min(GROUP_CADENCES.length - 1, index));
    if (animate) {
      sliderProgress.value = withTiming(boundedIndex / (GROUP_CADENCES.length - 1), { duration: 140 });
    }
    onChange(GROUP_CADENCES[boundedIndex]);
  }

  function updateFromPosition(x: number) {
    const normalized = Math.max(0, Math.min(1, (x - THUMB_SIZE / 2) / usableTrackWidth));
    sliderProgress.value = normalized;
    chooseIndex(Math.round(normalized * (GROUP_CADENCES.length - 1)), false);
  }

  function handleSliderGesture(event: GestureResponderEvent) {
    const pageX = event.nativeEvent.pageX ?? event.nativeEvent.locationX;
    updateFromPosition(pageX - measuredTrackLeft);
  }

  function finishSliderGesture(event: GestureResponderEvent) {
    handleSliderGesture(event);
    const snappedProgress = Math.max(
      0,
      Math.min(1, Math.round(sliderProgress.value * (GROUP_CADENCES.length - 1)) / (GROUP_CADENCES.length - 1)),
    );
    sliderProgress.value = withTiming(snappedProgress, { duration: 140 });
  }

  function handleAccessibilityAction(actionName: string) {
    if (actionName === 'increment') chooseIndex(selectedIndex + 1);
    if (actionName === 'decrement') chooseIndex(selectedIndex - 1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <ThemedText type="defaultSemiBold">{TICK_LABELS[selectedIndex]}</ThemedText>
        <ThemedText style={styles.hint}>Drag the slider or choose a tick</ThemedText>
      </View>

      <GroupCadenceOrbitPreview cadence={value} />

      <View
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Group reminder cadence"
        accessibilityValue={{
          min: 0,
          max: GROUP_CADENCES.length - 1,
          now: selectedIndex,
          text: TICK_LABELS[selectedIndex],
        }}
        accessibilityActions={[
          { name: 'decrement', label: 'Shorten reminder interval' },
          { name: 'increment', label: 'Lengthen reminder interval' },
        ]}
        onAccessibilityAction={(event) => handleAccessibilityAction(event.nativeEvent.actionName)}
        onLayout={(event) => {
          setMeasuredTrackLeft(event.nativeEvent.layout.x);
        }}
        onStartShouldSetResponderCapture={() => true}
        onMoveShouldSetResponderCapture={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={handleSliderGesture}
        onResponderMove={handleSliderGesture}
        onResponderRelease={finishSliderGesture}
        onResponderTerminate={finishSliderGesture}
        style={[styles.track, { width: trackWidth, backgroundColor: trackColor }]}
      >
        <Animated.View
          pointerEvents="none"
          style={[styles.fill, fillStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              backgroundColor: isDark ? '#DFE9FF' : '#FFFFFF',
              borderColor: thumbBorderColor,
            },
            thumbStyle,
          ]}
        />
      </View>

      <View style={[styles.tickRow, { width: trackWidth }]}>
        {TICK_LABELS.map((label, index) => {
          const selected = selectedIndex === index;
          const tickCenter = THUMB_SIZE / 2 + (index / (TICK_LABELS.length - 1)) * usableTrackWidth;
          const positionStyle = index === 0
            ? { left: 0, alignItems: 'flex-start' as const }
            : index === TICK_LABELS.length - 1
              ? { right: 0, alignItems: 'flex-end' as const }
              : { left: tickCenter - 32, alignItems: 'center' as const };

          return (
            <Pressable
              key={label}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              accessibilityLabel={`${label} reminder cadence`}
              onPress={() => chooseIndex(index)}
              style={({ pressed }) => [
                styles.tickItem,
                positionStyle,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.tickMark, { backgroundColor: tickMarkColor }]} />
              <ThemedText style={[styles.tickLabel, { color: tickColor }, selected && styles.selectedTickLabel]}>
                {label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10, alignItems: 'center' },
  heading: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  hint: { fontSize: 12, opacity: 0.7 },
  track: { height: TRACK_HEIGHT, marginTop: 16, borderRadius: TRACK_HEIGHT / 2, justifyContent: 'center' },
  fill: { height: TRACK_HEIGHT, borderRadius: TRACK_HEIGHT / 2, backgroundColor: '#4AA1FF' },
  thumb: {
    position: 'absolute',
    top: -(THUMB_SIZE - TRACK_HEIGHT) / 2,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: 2,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 10px rgba(127,176,255,0.35)' }
      : { elevation: 3 }),
  },
  tickRow: { height: 48, marginTop: 10, position: 'relative' },
  tickItem: { position: 'absolute', minWidth: 56, alignItems: 'center', gap: 2, paddingVertical: 2 },
  tickMark: { width: 2, height: 8, borderRadius: 1 },
  tickLabel: { fontSize: 11 },
  selectedTickLabel: { fontWeight: '700' },
  pressed: { opacity: 0.7 },
});

/**
 * HapticTab Component - Tab button with haptic feedback on iOS
 * 
 * Wraps the bottom tab bar button to provide tactile feedback when pressed.
 * Provides a subtle haptic pulse on iOS to enhance user experience.
 */

import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

/**
 * Renders a tab bar button with haptic feedback on press
 * 
 * @param {BottomTabBarButtonProps} props - React Navigation tab button props
 * @returns {React.ReactNode} Platform-specific pressable button with haptic feedback
 * 
 * On iOS:
 * - Triggers light impact haptic feedback when pressed
 * - Provides subtle tactile response to user interaction
 * 
 * On Android/Web:
 * - No haptic feedback (system not available)
 * - Button functions normally without vibration
 * 
 * Usage:
 * ```tsx
 * <Tabs screenOptions={{ tabBarButton: HapticTab }} />\n * ```
 */
export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Trigger soft haptic feedback on iOS when tab is pressed
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}

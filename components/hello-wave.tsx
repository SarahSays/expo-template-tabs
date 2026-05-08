/**
 * HelloWave Component - Animated waving hand emoji
 * 
 * Displays a simple animated greeting using a waving hand emoji.
 * Uses reanimated for smooth, performant animation.
 */

import Animated from 'react-native-reanimated';

/**
 * Renders an animated waving hand emoji greeting
 * 
 * @returns {React.ReactNode} Animated wave emoji with rotation keyframe animation
 * 
 * Animation Details:
 * - Rotates 25 degrees at 50% of the animation
 * - Completes 4 iterations
 * - Each iteration takes 300ms
 * 
 * Usage:
 * ```tsx
 * <HelloWave />
 * ```
 */
export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}

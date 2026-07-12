/**
 * ParallaxScrollView Component - Scroll view with parallax header animation
 * 
 * Provides animated header that scales and translates based on scroll position.
 * Used for creating visually appealing header effects on main screens.
 */

import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

/**
 * Renders a scroll view with animated parallax header effect
 * 
 * @param {Props} props - Component props
 * @param {ReactElement} props.headerImage - Image element to display in header
 * @param {Object} props.headerBackgroundColor - Header background colors for light/dark mode
 * @param {React.ReactNode} props.children - Screen content to scroll
 * @returns {React.ReactNode} Animated scroll view with parallax header
 * 
 * Header Animation:
 * - Scales up 2x when scrolling up beyond header
 * - Translates up as user scrolls down
 * - Creates depth parallax effect
 * - Smooth interpolation based on scroll offset
 * 
 * Usage:
 * ```tsx
 * <ParallaxScrollView
 *   headerImage={<Image source={require('./hero.png')} />}
 *   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}\n *>\n *   <ThemedText>Screen content</ThemedText>\n * </ParallaxScrollView>\n * ```
 */
/**
 * ParallaxScrollView component.
 *
 * Renders the UI for the ParallaxScrollView.
 */
export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  // Get background color and color scheme
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  
  // Create animated scroll view reference
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  
  // Calculate parallax animation based on scroll position
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Translate header up as user scrolls down
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          // Scale header larger when over-scrolling up
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
          headerAnimatedStyle,
        ]}>
        {headerImage}
      </Animated.View>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});

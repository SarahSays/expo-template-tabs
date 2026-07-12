/**
 * ThemedView Component - View element with theme-aware background color
 * 
 * Renders a view with automatic light/dark mode background color support.
 * Allows custom color overrides for specific use cases.
 */

import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * Renders a view with theme-aware background color
 * 
 * @param {ThemedViewProps} props - View component props
 * @param {string} [props.lightColor] - Custom background color for light mode
 * @param {string} [props.darkColor] - Custom background color for dark mode
 * @param {...ViewProps} otherProps - Standard React Native View props
 * @returns {React.ReactNode} Themed view element
 * 
 * Usage:
 * ```tsx
 * <ThemedView>
 *   <ThemedText>Content</ThemedText>
 * </ThemedView>
 * <ThemedView lightColor="#f5f5f5" darkColor="#1a1a1a">
 *   Custom background
 * </ThemedView>
 * ```
 */
/**
 * ThemedView function.
 *
 * Executes the ThemedView behavior.
 */
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Get background color based on theme and custom overrides
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

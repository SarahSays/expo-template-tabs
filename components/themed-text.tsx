/**
 * ThemedText Component - Text element with theme-aware styling
 * 
 * Renders text with typography variants (title, subtitle, link, etc.)
 * and automatic light/dark mode color support using dyslexia-friendly fonts.
 */

import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

/**
 * Renders themed text with automatic color and typography styling
 * 
 * @param {ThemedTextProps} props - Text component props
 * @param {string} [props.lightColor] - Custom color for light mode
 * @param {string} [props.darkColor] - Custom color for dark mode
 * @param {string} [props.type] - Typography variant (default, title, subtitle, link, defaultSemiBold)
 * @param {...TextProps} rest - Standard React Native Text props
 * @returns {React.ReactNode} Themed text element
 * 
 * Usage:
 * ```tsx
 * <ThemedText type="title">Main Heading</ThemedText>
 * <ThemedText type="subtitle">Subheading</ThemedText>
 * <ThemedText lightColor="#fff" darkColor="#000">Custom colors</ThemedText>
 * <ThemedText type="link">Clickable link</ThemedText>
 * ```
 */
/**
 * ThemedText function.
 *
 * Executes the ThemedText behavior.
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Get text color based on theme and custom overrides
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 31,
    fontFamily: Fonts.sans,
  },
  defaultSemiBold: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Fonts.sansBold,
    fontWeight: 'normal',
  },
  title: {
    fontSize: 28,
    lineHeight: 52,
    fontFamily: Fonts.sansBold,
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Fonts.sansBold,
    fontWeight: 'normal',
    lineHeight: 36,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: Fonts.sans,
  },
});

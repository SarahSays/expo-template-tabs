/**
 * useThemeColor Hook - Returns theme-aware colors based on light/dark mode
 * 
 * Allows components to specify custom colors for light and dark modes,
 * with fallback to default theme colors from the theme configuration.
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Gets a color value based on the current theme (light/dark) and user preferences
 * 
 * @param {Object} props - Color overrides for light and dark modes
 * @param {string} [props.light] - Color to use in light mode (optional override)
 * @param {string} [props.dark] - Color to use in dark mode (optional override)
 * @param {keyof (typeof Colors.light & typeof Colors.dark)} colorName - Default color name from theme
 * @returns {string} The appropriate color value for the current theme
 * 
 * Usage:
 * ```tsx
 * const backgroundColor = useThemeColor({}, 'background');
 * const customColor = useThemeColor({ light: '#fff', dark: '#000' }, 'text');
 * ```
 */
/**
 * useThemeColor hook.
 *
 * Custom React hook that provides themecolor support.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Detect current color scheme (light or dark)
  const theme = useColorScheme() ?? 'light';
  
  // Use provided color override if available
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Fall back to default theme color
    return Colors[theme][colorName];
  }
}

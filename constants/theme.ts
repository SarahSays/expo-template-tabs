/**
 * Theme Configuration - Color schemes and typography settings
 * 
 * Defines the color palette and font families for both light and dark modes.
 * Supports dyslexia-friendly typography using OpenDyslexic fonts.
 * Platform-specific font stacks for optimal rendering across web and native.
 */

import { Platform } from 'react-native';

// Primary theme colors
const tintColorLight = '#0A84FF';
const tintColorDark = '#f9d84a';

/**
 * Color definitions for light and dark modes
 * 
 * Defines all theme colors used throughout the application:
 * - text: Primary text color
 * - background: Screen background color
 * - tint: Primary accent color
 * - icon: Icon color
 * - tabBarBackground: Background for bottom tabs
 * - headerBackground: Header bar background
 * - headerText: Text/icon color used in headers
 * - tabIconDefault: Inactive tab icon color
 * - tabIconSelected: Active tab icon color
 */
/**
 * Colors constant.
 *
 * Exported constant for Colors.
 */
export const Colors = {
  light: {
    text: '#2B0F55',
    background: '#E8F4FF',
    tint: tintColorLight,
    icon: '#84C7FF',
    tabBarBackground: '#D8EEFF',
    headerBackground: '#D2E8FF',
    headerText: '#2B0F55',
    drawerBackground: '#E7F3FF',
    drawerActiveText: '#2B0F55',
    drawerInactiveText: '#6A5FA8',
    tabIconDefault: 'midnightblue',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#F0E6FF',
    background: '#0F0A1A',
    tint: tintColorDark,
    icon: '#B19CD9',
    tabBarBackground: '#090512',
    headerBackground: '#07030D',
    headerText: '#F7F4FF',
    drawerBackground: '#07030D',
    drawerActiveText: '#F7F4FF',
    drawerInactiveText: '#C7B7FF',
    tabIconDefault: '#C7B7FF',
    tabIconSelected: tintColorDark,
  },
};

/**
 * Font family definitions for native and web platforms
 * 
 * Uses dyslexia-friendly OpenDyslexic fonts on all platforms.
 * Provides fallback font stacks for web to ensure readability.
 * 
 * Includes:
 * - sans: Standard sans-serif font
 * - serif: Serif font variant
 * - rounded: Rounded font variant
 * - mono: Monospace font for code
 * - sansBold: Bold sans-serif font
 */
/**
 * Fonts constant.
 *
 * Exported constant for Fonts.
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'OpenDyslexic3Regular',
    serif: 'OpenDyslexic3Regular',
    rounded: 'OpenDyslexic3Regular',
    mono: 'OpenDyslexicMonoRegular',
    sansBold: 'OpenDyslexic3Bold',
  },
  android: {
    sans: 'OpenDyslexic3Regular',
    serif: 'OpenDyslexic3Regular',
    rounded: 'OpenDyslexic3Regular',
    mono: 'OpenDyslexicMonoRegular',
    sansBold: 'OpenDyslexic3Bold',
  },
  web: {
    sans: 'OpenDyslexic3Regular, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    serif: 'OpenDyslexic3Regular, Georgia, "Times New Roman", serif',
    rounded: 'OpenDyslexic3Regular, "SF Pro Rounded", "Hiragino Maru Gothic ProN", Meiryo, "MS PGothic", sans-serif',
    mono: 'OpenDyslexicMonoRegular, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    sansBold: 'OpenDyslexic3Bold, system-ui, sans-serif',
  },
  default: {
    sans: 'OpenDyslexic3Regular',
    serif: 'OpenDyslexic3Regular',
    rounded: 'OpenDyslexic3Regular',
    mono: 'OpenDyslexicMonoRegular',
    sansBold: 'OpenDyslexic3Bold',
  },
});

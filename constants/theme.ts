/**
 * Theme Configuration - Color schemes and typography settings
 * 
 * Defines the color palette and font families for both light and dark modes.
 * Supports dyslexia-friendly typography using OpenDyslexic fonts.
 * Platform-specific font stacks for optimal rendering across web and native.
 */

import { Platform } from 'react-native';

// Primary theme colors
const tintColorLight = 'indigo';
const tintColorDark = '#f9d84a';

/**
 * Color definitions for light and dark modes
 * 
 * Defines all theme colors used throughout the application:
 * - text: Primary text color
 * - background: Screen background color
 * - tint: Primary accent color
 * - icon: Icon color
 * - tabIconDefault: Inactive tab icon color
 * - tabIconSelected: Active tab icon color
 */
export const Colors = {
  light: {
    text: '#11181C',
    background: 'azure',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: 'midnightblue',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
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
export const Fonts = Platform.select({
  default: {
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
});

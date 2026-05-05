/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';
const tintColorLight = 'indigo';
const tintColorDark = '#f9d84a';

export const Colors = {
  light: {
    text: '#11181C',
    // background: '#fff',
    background: 'azure',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    // background: '#151718',
    background: 'midnightblue',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

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

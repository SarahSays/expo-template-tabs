/**
 * Root Stack Layout - Entry point for Expo Router navigation
 * 
 * Navigation Hierarchy:
 * RootStack (this file)
 *  └── Drawer Navigator (app/(drawer)/_layout.tsx)
 *       └── Tabs Navigator (app/(drawer)/(tabs)/_layout.tsx)
 *            └── Tab Stacks (app/(drawer)/(tabs)/<tab>/_layout.tsx)
 * 
 * Header Control:
 * - RootStack: headerShown=false (CRITICAL: Prevents header duplication at root level)
 * - All header control delegated to child navigators
 * - Drawer controls hamburger menu display
 * - Tab Stacks control per-screen headers with back buttons
 */

import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from "expo-router";
import React from 'react';
import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Initializes root-level navigation stack and loads custom fonts
 * 
 * @returns {React.ReactNode} Stack navigator with font resources loaded, or null while fonts load
 * 
 * Scope: Expo Router scopes this layout to all routes in the app
 * - Manages font loading for entire application
 * - Provides global navigation context
 * - Hides headers at root to allow child navigators full control
 */
export default function RootLayout() {
  // Load custom dyslexia-friendly fonts from assets
  const [fontsLoaded] = useFonts({
    OpenDyslexic3Regular: require('../assets/fonts/OpenDyslexic3-Regular.ttf'),
    OpenDyslexic3Bold: require('../assets/fonts/OpenDyslexic3-Bold.ttf'),
    OpenDyslexicMonoRegular: require('../assets/fonts/OpenDyslexicMono-Regular.ttf'),
  });

  // Keep `colorScheme`, `router`, and `isTabActive` available for
  // future custom tab-bar or navigation logic. They are unused now
  // but intentionally retained as placeholders.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const colorScheme = useColorScheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Determines if a specific tab is currently active based on pathname
   * @param {string} tabName - Name of tab to check
   * @returns {boolean} True if tab is currently active
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isTabActive = (tabName: string) => {
    if (tabName === 'home') {
      return pathname === '/home' || pathname.startsWith('/(tabs)');
    }
    return pathname.includes(tabName);
  };

  // Prevent rendering until custom fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Hide root header to prevent conflicts with child navigators
        // Each navigator level (Drawer, Tabs, Stacks) manages its own headers
        // This ensures no navigator fights another for header control
        headerShown: false,
      }}
    />
  );
}

// Keep `styles` for future custom tab-bar rendering. Suppress unused
// variable warning until the custom UI is implemented.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    height: 100,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: Fonts.sans,
  },
});
/**
 * Settings Stack Layout - Manages app settings and user preferences navigation
 * 
 * Navigation Hierarchy:
 * Settings Stack (this file)
 *  └── Settings Screens:
 *      - index.tsx (main settings view)
 *      - settings.tsx, appearance.tsx, preferences.tsx
 *      - privacy-security.tsx, help.tsx
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header for menu access
 * - Headers REQUIRED for back navigation between settings screens
 * - This is a drawer-level stack (not under tabs), accessed via hamburger menu
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/settings folder
 * - Manages navigation within settings configuration section
 * - Provides back navigation for nested settings screens
 * - Accessible via drawer menu, not via bottom tabs
 */

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Initializes stack navigation for settings with header and drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/settings/ folder via Expo Router
 * - Enables back navigation between settings configuration screens
 * - Provides drawer access to navigate away from settings
 * - Manages header display for each settings child screen
 */
export default function SettingsLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within settings stack
        // Settings has multiple configuration screens requiring back button access
        // Hiding headers here would prevent proper navigation between settings sections
        headerShown: true,
        headerBackTitle: '',
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
        // Drawer toggle button in header right position
        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 6, padding: 8 }}>
            <IconSymbol
              name="line.3.horizontal"
              size={24}
              color={Colors[colorScheme ?? 'light'].text}
            />
          </Pressable>
        ),
      }}
    />
  );
}

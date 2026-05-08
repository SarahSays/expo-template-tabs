/**
 * Home Tab Stack Layout - Manages home tab screen navigation
 * 
 * Navigation Hierarchy:
 * Home Stack (this file)
 *  └── Home Screens:
 *      - index.tsx (main home landing screen)
 *      - connect-chats.tsx, modal.tsx, notifications.tsx
 *      - username.tsx, verification-code.tsx (auth flows)
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header allows menu access from any home sub-screen
 * - Headers are REQUIRED for navigation between home sub-screens
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/(tabs)/home folder
 * - Manages navigation within home tab section
 * - Provides back navigation for authentication and settings flows
 * - Coordinates with drawer menu for access to other app sections
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
 * Initializes stack navigation for home tab with header displaying drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/(tabs)/home/ folder via Expo Router
 * - Enables back navigation between screens in home tab
 * - Provides drawer access (hamburger menu) from home screens
 * - Each child screen can display in the top header
 */
export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within home tab stack
        // Child screens (auth flows, modals) require headers to navigate back
        // Hiding headers here would break back button functionality
        headerShown: true,
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].headerBackground,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].headerText,
        // Drawer toggle button in header right position
        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 6, padding: 8 }}>
            <IconSymbol
              name="line.3.horizontal"
              size={24}
              color={Colors[colorScheme ?? 'light'].headerText}
            />
          </Pressable>
        ),
      }}
    />
  );
}

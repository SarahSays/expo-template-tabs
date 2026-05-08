/**
 * Feed Tab Stack Layout - Manages feed tab screen navigation
 * 
 * Navigation Hierarchy:
 * Feed Stack (this file)
 *  └── Feed Screens:
 *      - index.tsx (main feed view)
 *      - feed.tsx, placeholder.tsx (feed content screens)
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header for menu access
 * - Headers REQUIRED for back navigation between feed screens
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/(tabs)/feed folder
 * - Manages navigation within feed content section
 * - Provides back navigation for nested feed views
 * - Coordinates with drawer menu
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
 * Initializes stack navigation for feed tab with header and drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/(tabs)/feed/ folder via Expo Router
 * - Enables back navigation between feed screens
 * - Provides drawer access from feed screens
 * - Manages header display for each feed child screen
 */
export default function FeedLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within feed tab stack
        // Feed may have nested screens that require back button access
        // Hiding headers here would prevent proper navigation flow
        headerShown: true,
        headerBackTitle: '',
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

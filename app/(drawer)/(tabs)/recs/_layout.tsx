/**
 * Recs Tab Stack Layout - Manages recs (recommendations/bookmarks) tab navigation
 * 
 * Navigation Hierarchy:
 * Recs Stack (this file)
 *  └── Recs Screens:
 *      - index.tsx (main recs view)
 *      - recs.tsx, addarec.tsx, awards.tsx (recommendations management)
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header for menu access
 * - Headers REQUIRED for back navigation between recs screens
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/(tabs)/recs folder
 * - Manages navigation within recommendations section
 * - Provides back navigation for nested recs views
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
 * Initializes stack navigation for recs tab with header and drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/(tabs)/recs/ folder via Expo Router
 * - Enables back navigation between recs screens
 * - Provides drawer access from all recs screens
 * - Manages header display for each recs child screen
 */
export default function RecsLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within recs tab stack
        // Recs may have nested screens (adding recs, viewing awards) requiring back button access
        // Hiding headers here would prevent proper navigation between recs views
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

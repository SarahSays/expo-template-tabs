/**
 * Star Chart Tab Stack Layout - Manages star chart (analytics) tab navigation
 * 
 * Navigation Hierarchy:
 * Star Chart Stack (this file)
 *  └── Star Chart Screens:
 *      - index.tsx (main star chart view)
 *      - star-chart.tsx, pinch-zoom.tsx, share.tsx (chart interactions)
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header for menu access
 * - Headers REQUIRED for back navigation and zooming/sharing interactions
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/(tabs)/starchart folder
 * - Manages navigation within star chart analytics section
 * - Provides back navigation from interactive views
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
 * Initializes stack navigation for star chart tab with header and drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/(tabs)/starchart/ folder via Expo Router
 * - Enables back navigation between star chart screens and interactions
 * - Provides drawer access from all star chart views
 * - Manages header display for each star chart child screen
 */
export default function StarChartLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within star chart tab stack
        // Star chart has interactive screens (zoom, share) requiring back button access
        // Hiding headers here would prevent proper navigation flow
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

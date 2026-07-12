/**
 * Orbits Tab Stack Layout - Manages orbits (social connections) tab navigation
 * 
 * Navigation Hierarchy:
 * Orbits Stack (this file)
 *  └── Orbits Screens:
 *      - index.tsx (main orbits view)
 *      - orbits.tsx, cadences.tsx, friends.tsx, groups.tsx, self.tsx
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header for accessing menu
 * - Headers REQUIRED for back navigation between orbits screens
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/(tabs)/orbits folder
 * - Manages navigation within orbits social network section
 * - Provides back navigation for nested orbit views
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
 * Initializes stack navigation for orbits tab with header and drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/(tabs)/orbits/ folder via Expo Router
 * - Enables back navigation between orbits screens
 * - Provides drawer access from orbits screens
 * - Manages header display for each orbits child screen
 */
/**
 * OrbitsLayout component.
 *
 * Renders the UI for the Orbits layout.
 */
export default function OrbitsLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within orbits tab stack
        // Orbits screens may have nested views requiring back button access
        // Hiding headers here would prevent proper navigation between orbits views
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

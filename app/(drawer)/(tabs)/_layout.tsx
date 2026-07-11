/**
 * Tabs Navigator Layout - Controls bottom tab bar navigation
 * 
 * Navigation Hierarchy:
 * Tabs Navigator (this file)
 *  └── Tab Stacks:
 *      - home (app/(drawer)/(tabs)/home/_layout.tsx)
 *      - orbits (app/(drawer)/(tabs)/orbits/_layout.tsx)
 *      - feed (app/(drawer)/(tabs)/feed/_layout.tsx)
 *      - starchart (app/(drawer)/(tabs)/starchart/_layout.tsx)
 *      - recs (app/(drawer)/(tabs)/recs/_layout.tsx)
 * 
 * Header Control:
 * - Tabs: headerShown=false (CRITICAL: Each tab stack manages its own headers)
 * - Tab bar displayed at bottom with 5 main navigation options
 * - Each tab can have internal stack navigation with back buttons
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/(tabs) folder
 * - Manages 5 primary navigation tabs visible to all authenticated users
 * - Each tab has independent navigation stack for sub-screens
 */

import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Initializes bottom tab navigation with 5 main app sections
 * 
 * @returns {React.ReactNode} Tabs navigator with all tab screens configured
 * 
 * Scope: Scopes to all routes under (drawer)/(tabs)/ folder via Expo Router
 * - Displays persistent bottom tab bar for main app navigation
 * - Each tab is independent with its own navigation stack
 * - Individual tab stacks handle screen headers and back navigation
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        // CRITICAL: Hide tabs-level headers
        // Each tab's stack (home, orbits, feed, etc.) manages its own headers
        // This prevents header duplication while maintaining back button functionality
        headerShown: false,
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingBottom: 0,
          height: 80,
          position: 'absolute',
          backgroundColor: Colors[colorScheme ?? 'light'].tabBarBackground,
        },
      }}>
      {/* Index tab - entry point with sign-in/skip options */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/* Orbits tab - social connections and friend groups */}
      <Tabs.Screen
        name="orbits"
        options={{
          title: 'Orbits',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="rotate.3d" color={color} />,
        }}
      />
      {/* Feed tab - content and activity stream */}
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="thermometer.variable" color={color} />,
        }}
      />
      {/* Star Chart tab - user analytics and stats visualization */}
      <Tabs.Screen
        name="starchart"
        options={{
          title: 'Star Chart',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkle" color={color} />,
        }}
      />
      {/* Recs tab - recommendations and bookmarks */}
      <Tabs.Screen
        name="recs"
        options={{
          title: 'Recs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
      {/* Home tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.down" color={color} />,
        }}
      />
    </Tabs>
  );
}

/**
 * Email onboarding stack for screens exposed under the /home URL.
 * 
 * These screens live outside the tab navigator so onboarding navigation is
 * not redirected to the authenticated tabs before the screen can mount.
 */

import { Stack } from 'expo-router';
import React from 'react';

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Initializes onboarding navigation with back buttons between its screens.
 * 
 * @returns {React.ReactNode} Stack navigator for email sign-in and onboarding
 * 
 * Scope: Scopes to all routes under (onboarding)/home/ via Expo Router
 */
/**
 * HomeLayout component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
        headerTitle: '',
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTintColor: theme.headerText,
      }}
    />
  );
}

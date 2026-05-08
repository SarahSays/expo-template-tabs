/**
 * Chat Accounts Stack Layout - Manages chat account integrations navigation
 * 
 * Navigation Hierarchy:
 * Chat Accounts Stack (this file)
 *  └── Chat Account Screens:
 *      - index.tsx (main chat accounts view)
 *      - whatsapp.tsx, signal.tsx, messenger.tsx
 *      - instagram.tsx, sms.tsx (account integrations)
 * 
 * Header Control:
 * - Stack: headerShown=true (CRITICAL: Displays headers with back buttons)
 * - Drawer toggle button in header for menu access
 * - Headers REQUIRED for back navigation between account setup screens
 * - This is a drawer-level stack (not under tabs), accessed via hamburger menu
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer)/chat-accounts folder
 * - Manages navigation within chat account integration section
 * - Provides back navigation for nested account setup flows
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
 * Initializes stack navigation for chat accounts with header and drawer toggle
 * 
 * @returns {React.ReactNode} Stack navigator with drawer hamburger in header
 * 
 * Scope: Scopes to all routes under (drawer)/chat-accounts/ folder via Expo Router
 * - Enables back navigation between different chat account integrations
 * - Provides drawer access to navigate away from chat accounts
 * - Manages header display for each account setup screen
 */
export default function ChatAccountsLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        // CRITICAL: Show headers for back navigation within chat accounts stack
        // Chat accounts has multiple integration screens requiring back button access
        // Hiding headers here would prevent proper navigation between integrations
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

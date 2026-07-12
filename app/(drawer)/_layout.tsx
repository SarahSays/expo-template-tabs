/**
 * _layout.tsx
 *
 * File-level documentation comment.
 */

/**
 * Drawer Navigator Layout - Controls hamburger menu navigation
 * 
 * Navigation Hierarchy:
 * Drawer Navigator (this file)
 *  └── Tabs Navigator (app/(drawer)/(tabs)/_layout.tsx)
 *       └── Tab Stacks (app/(drawer)/(tabs)/<tab>/_layout.tsx)
 * 
 * Header Control:
 * - Drawer: headerShown=false (CRITICAL: Child navigators handle headers)
 * - Prevents header duplication; Tabs Navigator manages tab bar
 * - Individual tab stacks manage screen headers and back buttons
 * 
 * Scope: Expo Router scopes this layout to all routes within (drawer) group
 * - Right-aligned drawer for navigation between major app sections
 * - Manages navigation between tabs, settings, and authentication screens
 */

import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Drawer } from 'expo-router/drawer';
import { Platform } from 'react-native';

/**
 * Initializes drawer-based navigation with right-side menu
 * 
 * @returns {React.ReactNode} Drawer navigator with configured screen options
 * 
 * Scope: Scopes to all routes under (drawer) folder via Expo Router file conventions
 * - Provides right-sliding drawer menu
 * - Manages navigation to Chat Accounts, Settings, and Logout screens
 * - Does NOT display headers (delegated to child Tabs Navigator)
 */
const DrawerLayout = () => {
    const colorScheme = useColorScheme();
    const themeMode = colorScheme === 'dark' ? 'dark' : 'light';

    return (
        <Drawer
            screenOptions={{
                // Hide drawer-level headers
                // Child Tabs Navigator and Stack layouts handle all header display
                // This prevents header conflicts between navigation levels
                headerShown: false,
                swipeEnabled: false,
                swipeEdgeWidth: 0,
                swipeMinDistance: 0,
                drawerType: 'front',
                drawerPosition: 'right',
                        drawerLabelStyle: {
                    fontFamily: Fonts.sans,
                },
                drawerStyle: {
                    backgroundColor: Colors[themeMode].drawerBackground,
                },
                drawerContentStyle: {
                    backgroundColor: Colors[themeMode].drawerBackground,
                },
                drawerActiveTintColor: Colors[themeMode].tint,
                drawerInactiveTintColor: Colors[themeMode].drawerInactiveText,
                headerTitleStyle: {
                    fontFamily: Fonts.sans,
                    color: Colors[colorScheme ?? 'light'].tint,
                },
                // Web-specific: Improve accessibility on web to prevent aria-hidden warnings
                ...(Platform.OS === 'web' && {
                    sceneContainerStyle: {
                        overflow: 'visible',
                    },
                }),
            }}>
            {/* Main tabs navigation - home, orbits, feed, starchart, recs */}
            <Drawer.Screen
                name="(tabs)"
                options={{
                    swipeEnabled: false,
                    drawerLabel: 'Home',
                }}
            />
            {/* Chat account management screen */}
            <Drawer.Screen
                name="chat-accounts"
                options={{
                    drawerLabel: 'Chat Accounts',
                    title: 'Chat Accounts',
                }}
            />
            {/* App settings and user preferences */}
            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: 'Settings',
                }}
            />
            {/* User logout confirmation screen */}
            <Drawer.Screen
                name="logout"
                options={{
                    drawerLabel: 'Log Out',
                }}
            />
        </Drawer>
    );
};

export default DrawerLayout;
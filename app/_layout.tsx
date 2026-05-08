// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
      headerShown: false,   // IMPORTANT
      }}
    />
  );
}


/* import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { usePathname, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Fonts } from '@/constants/theme';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    OpenDyslexic3Regular: require('../assets/fonts/OpenDyslexic3-Regular.ttf'),
    OpenDyslexic3Bold: require('../assets/fonts/OpenDyslexic3-Bold.ttf'),
    OpenDyslexicMonoRegular: require('../assets/fonts/OpenDyslexicMono-Regular.ttf'),
  });

  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  const isTabActive = (tabName: string) => {
    if (tabName === 'home') {
      return pathname === '/home' || pathname.startsWith('/(tabs)');
      // TO-DO: improve this logic to handle edge cases (e.g. a file at this level that we don't want to include in the drawer)
    }
    return pathname.includes(tabName);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerShown: false,
              drawerType: 'front',
              drawerPosition: 'right',
              drawerLabelStyle: {
                fontFamily: Fonts.sans,
              },
              headerTitleStyle: {
                fontFamily: Fonts.sans,
              },
            }}>
            <Drawer.Screen
              name="home"
              options={{
                drawerLabel: 'Home',
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="chat-accounts"
              options={{
              drawerLabel: 'Chat Accounts',
              title: 'Chat Accounts',
            }}
            />
            <Drawer.Screen
              name="settings"
              options={{
                drawerLabel: 'Settings',
                headerShown: false,
              }}
            />
          </Drawer>

          // Persistent Tab Bar
          
          <View style={[styles.tabBar, { backgroundColor: Colors[colorScheme ?? 'light'].background, borderTopColor: 'rgba(0,0,0,0.1)' }]}>
            <Pressable
              onPress={() => router.replace('/home')}
              style={styles.tabItem}>
              <IconSymbol
                name="atom"
                size={24}
                color={isTabActive('home') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text}
              />
              <Text style={[styles.tabLabel, { color: isTabActive('home') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text }]}>
                Home
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/orbits')}
              style={styles.tabItem}>
              <IconSymbol
                name="rotate.3d"
                size={24}
                color={isTabActive('orbits') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text}
              />
              <Text style={[styles.tabLabel, { color: isTabActive('orbits') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text }]}>
                Orbits
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/feed')}
              style={styles.tabItem}>
              <IconSymbol
                name="thermometer.variable"
                size={24}
                color={isTabActive('feed') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text}
              />
              <Text style={[styles.tabLabel, { color: isTabActive('feed') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text }]}>
                Feed
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/starchart')}
              style={styles.tabItem}>
              <IconSymbol
                name="sparkle"
                size={24}
                color={isTabActive('starchart') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text}
              />
              <Text style={[styles.tabLabel, { color: isTabActive('starchart') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text }]}>
                Starchart
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace('/recs')}
              style={styles.tabItem}>
              <IconSymbol
                name="bookmark.fill"
                size={24}
                color={isTabActive('recs') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text}
              />
              <Text style={[styles.tabLabel, { color: isTabActive('recs') ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text }]}>
                Recs
              </Text>
            </Pressable>
          </View>
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    height: 100,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: Fonts.sans,
  },
});
 */
// app/_layout.tsx

import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from "expo-router";
import React from 'react';
import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

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
    }
    return pathname.includes(tabName);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
      headerShown: false,   // IMPORTANT
      }}
    />
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
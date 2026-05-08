import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingBottom: 0,
          height: 60,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="atom" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orbits"
        options={{
          title: 'Orbits',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="rotate.3d" color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="thermometer.variable" color={color} />,
        }}
      />
      <Tabs.Screen
        name="starchart"
        options={{
          title: 'Star Chart',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recs"
        options={{
          title: 'Recs',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

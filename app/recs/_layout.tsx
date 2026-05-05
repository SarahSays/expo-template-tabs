import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OrbitsLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
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

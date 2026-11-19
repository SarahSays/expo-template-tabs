import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Stack, useRouter, type Href } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function InboxLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
        headerTitleStyle: { fontFamily: Fonts.sans },
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].headerBackground },
        headerTintColor: Colors[colorScheme ?? 'light'].headerText,
        headerRight: () => (
          <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginRight: 6, padding: 8 }}>
            <IconSymbol name="line.3.horizontal" size={24} color={Colors[colorScheme ?? 'light'].headerText} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Inbox' }} />
      <Stack.Screen
        name="write-message"
        options={{
          headerLeft: () => (
            <Pressable onPress={() => router.replace('/inbox' as Href)} style={{ marginLeft: 8, paddingHorizontal: 8, paddingVertical: 6 }}>
              <MaterialCommunityIcons name="arrow-left" size={22} color={Colors[colorScheme ?? 'light'].headerText} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

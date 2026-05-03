import { Stack } from 'expo-router';
import React from 'react';

import { Fonts } from '@/constants/theme';

export default function OrbitsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
        headerTitleStyle: {
          fontFamily: Fonts.sans,
        },
        headerRight: undefined,
        headerLeft: undefined,
      }}
    />
  );
}
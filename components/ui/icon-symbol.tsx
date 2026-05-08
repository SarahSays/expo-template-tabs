/**
 * IconSymbol Component - Cross-platform icon wrapper (Android/Web fallback)
 * 
 * Uses SF Symbols on iOS and Material Icons on Android/Web for consistent icons.
 * Provides a unified icon API across all platforms with manual symbol mapping.
 */

// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Mapping from SF Symbols (iOS) to Material Icons (Android/Web)
 * 
 * SF Symbols Reference: https://developer.apple.com/sf-symbols/
 * Material Icons Reference: https://icons.expo.fyi
 * 
 * Add new mappings here when using additional icons in the app.
 */
const MAPPING = {
  'house.fill': 'home',
  'sun.max.fill': 'brightness-high',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'thermometer.variable': 'thermostat',
  'sparkle': 'auto-awesome',
  'bookmark.fill': 'bookmark',
  'line.3.horizontal': 'menu',
  'rotate.3d': '360',
  'atom': 'sunny',
} as IconMapping;

/**
 * Renders a cross-platform icon symbol
 * 
 * @param {Object} props - Component props
 * @param {IconSymbolName} props.name - SF Symbol name (mapped to Material Icon)
 * @param {number} [props.size] - Icon size in points (default: 24)
 * @param {string | OpaqueColorValue} props.color - Icon color
 * @param {StyleProp<TextStyle>} [props.style] - Additional styles
 * @param {SymbolWeight} [props.weight] - Font weight (iOS only)
 * @returns {React.ReactNode} Platform-specific icon component
 * 
 * Platform Behavior:
 * - iOS: Uses native SF Symbols with native rendering
 * - Android/Web: Uses Material Icons with CSS/React Native rendering
 * 
 * Usage:
 * ```tsx
 * <IconSymbol name="sparkle" size={28} color="blue" />
 * <IconSymbol name="menu" size={24} color={Colors.text} />
 * ```
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}

/**
 * IconSymbol Component (iOS) - Native SF Symbols implementation
 * 
 * Uses native SF Symbols on iOS for optimal appearance and performance.
 * Only loaded on iOS; Android/Web use the Material Icons fallback instead.
 */

import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Renders a native SF Symbol icon (iOS only)
 * 
 * @param {Object} props - Component props
 * @param {SymbolViewProps['name']} props.name - SF Symbol name
 * @param {number} [props.size] - Icon size in points (default: 24)
 * @param {string} props.color - Icon tint color
 * @param {StyleProp<ViewStyle>} [props.style] - Additional styles
 * @param {SymbolWeight} [props.weight] - Font weight for symbol (default: regular)
 * @returns {React.ReactNode} SymbolView displaying native SF Symbol
 * 
 * SF Symbols Available: Thousands of built-in system icons
 * See: https://developer.apple.com/sf-symbols/
 * 
 * Usage:
 * ```tsx
 * <IconSymbol name="heart" size={20} color="red" />
 * ```
 */
/**
 * IconSymbol function.
 *
 * Executes the IconSymbol behavior.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}

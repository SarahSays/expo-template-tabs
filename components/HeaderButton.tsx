/**
 * HeaderButton Component - Info icon button for header
 * 
 * Renders a pressable info icon that can be placed in screen headers.
 * Uses FontAwesome icon with press state opacity feedback.
 */

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';

/**
 * Renders a header button with info icon and press feedback
 * 
 * @param {Object} props - Component props
 * @param {() => void} [props.onPress] - Callback when button is pressed
 * @param {React.Ref} ref - Forwarded ref to underlying Pressable
 * @returns {React.ReactNode} Pressable info icon button
 * 
 * Features:
 * - Visual feedback on press (opacity change)
 * - Customizable onPress callback
 * - Sized at 25pt with gray color
 * - Right margin for header positioning
 * 
 * Usage:
 * ```tsx
 * <HeaderButton onPress={() => showInfo()} />
 * ```
 */
export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color="gray"
            style={[
              styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);

HeaderButton.displayName = 'HeaderButton';

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});

/**
 * Collapsible Component - Expandable/collapsible section
 * 
 * Renders a header that toggles visibility of content.
 * Displays animated chevron icon indicating open/closed state.
 * Uses theme-aware colors for icon and text.
 */

import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Renders a collapsible section with title and toggleable content
 * 
 * @param {PropsWithChildren & { title: string }} props - Component props
 * @param {React.ReactNode} props.children - Content to show/hide
 * @param {string} props.title - Header title text
 * @returns {React.ReactNode} Collapsible section with animated chevron
 * 
 * Features:
 * - Animated chevron icon rotates 90° when open
 * - Bold title text
 * - Content indented under title
 * - Touch-responsive header
 * - Theme-aware colors
 * 
 * Usage:
 * ```tsx
 * <Collapsible title="More Options">\n *   <ThemedText>Hidden content</ThemedText>\n * </Collapsible>\n * ```
 */
export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  // Track open/closed state
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        {/* Animated chevron icon rotates based on open state */}
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {/* Conditionally render content when expanded */}
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});

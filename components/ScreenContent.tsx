/**
 * ScreenContent Component - Standard screen layout with title and separator
 * 
 * Provides consistent screen header with title and visual separator.
 * Centers content and applies theme-aware styling.
 */

import React from 'react';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

/**
 * Renders a screen layout with title, separator line, and content
 * 
 * @param {ScreenContentProps} props - Component props
 * @param {string} props.title - Screen heading text
 * @param {string} props.path - Path identifier (for reference/debugging)
 * @param {React.ReactNode} [props.children] - Screen content
 * @returns {React.ReactNode} Centered screen container with title and content
 * 
 * Layout:
 * - Centered container
 * - Large title text at top
 * - Horizontal separator line
 * - Content area below
 * 
 * Usage:
 * ```tsx
 * <ScreenContent title="My Screen" path="/my-screen">\n *   <ThemedText>Screen content here</ThemedText>\n * </ScreenContent>\n * ```
 */
/**
 * ScreenContent constant.
 *
 * Exported constant for ScreenContent.
 */
export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  // Get separator color based on theme
  const separatorColor = useThemeColor({ light: '#d1d5db', dark: '#424245' }, 'icon');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedView style={[styles.separator, { backgroundColor: separatorColor }]} />
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    textAlign: 'center',
  },
});

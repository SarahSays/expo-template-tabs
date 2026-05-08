/**
 * Container Component - Wrapper for safe area and consistent screen padding
 * 
 * Provides consistent spacing and safe area handling across all screens.
 * Uses theme-aware background color based on light/dark mode.
 */

import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView, StyleSheet } from 'react-native';

/**
 * Renders a container with safe area insets and theme-aware background
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside container
 * @returns {React.ReactNode} SafeAreaView with themed background and padding
 * 
 * Usage:
 * ```tsx
 * <Container>
 *   <ThemedText>Screen content</ThemedText>
 * </Container>
 * ```
 */
export const Container = ({ children }: { children: React.ReactNode }) => {
  // Get background color based on current theme
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

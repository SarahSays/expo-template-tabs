/**
 * useColorScheme Hook (Web) - Detects and provides the current color scheme
 * 
 * Web-specific implementation that handles hydration on initial page load.
 * Ensures color scheme detection works correctly with static rendering.
 * 
 * Note: Native implementation simply re-exports from 'react-native'.
 */

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Returns the current color scheme (light/dark) after hydration
 * 
 * On web, the component needs to hydrate before accessing the actual color scheme
 * to prevent hydration mismatches. Returns 'light' by default until hydrated.
 * 
 * @returns {('light' | 'dark' | null)} The detected color scheme after hydration
 * 
 * Usage:
 * ```tsx
 * const colorScheme = useColorScheme();
 * const bgColor = colorScheme === 'dark' ? '#000' : '#fff';
 * ```
 */
export function useColorScheme() {
  // Track whether component has hydrated on client
  const [hasHydrated, setHasHydrated] = useState(false);

  // Mark as hydrated after initial render
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Get actual color scheme from React Native
  const colorScheme = useRNColorScheme();

  // Return actual scheme after hydration, light mode as default
  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}

/**
 * ExternalLink Component - Opens links in external browser
 * 
 * Wraps Link component to open external URLs in an in-app browser on native platforms
 * or default browser on web, instead of navigating within the app.
 */

import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

/**
 * Renders a link that opens URLs in external browser
 * 
 * @param {Props} props - Link component props
 * @param {string} props.href - URL to open
 * @param {...ComponentProps<typeof Link>} rest - Standard Link props
 * @returns {React.ReactNode} Link element that opens in external browser
 * 
 * Behavior:
 * - On Web: Opens link in default browser (normal link behavior)
 * - On Native (iOS/Android): Opens in in-app browser for better UX
 * 
 * Usage:
 * ```tsx
 * <ExternalLink href="https://example.com">Visit Example</ExternalLink>
 * ```
 */
export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // On native platforms, prevent default linking behavior
          event.preventDefault();
          // Open URL in in-app browser for better integration
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}

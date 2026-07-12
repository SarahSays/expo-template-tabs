/**
 * settings.tsx
 *
 * File-level documentation comment.
 */
import { Redirect } from "expo-router";

/**
 * SettingsRedirect component.
 *
 * Renders the UI for the SettingsRedirect.
 */
export default function SettingsRedirect() {
  return <Redirect href="/(drawer)/settings" />;
}

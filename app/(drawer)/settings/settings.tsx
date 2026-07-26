/**
 * settings.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { Redirect } from "expo-router";

/**
 * SettingsRedirect component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function SettingsRedirect() {
  return <Redirect href="/(drawer)/settings" />;
}

/**
 * Dynamic route wrapper for contact profiles.
 *
 * Expo Router will resolve /orbits/contacts/:id to this file. We
 * forward rendering to the existing `contact-profile-page` component
 * to keep implementation centralized.
 */

import ContactProfilePage from './contact-profile-page';

/**
 * ContactProfileRoute component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function ContactProfileRoute() {
  return <ContactProfilePage />;
}

/**
 * Dynamic route wrapper for contact profiles.
 *
 * Expo Router will resolve /orbits/contacts/:id to this file. We
 * forward rendering to the existing `contact-profile-page` component
 * to keep implementation centralized.
 */

import ContactProfilePage from './contact-profile-page';

export default function ContactProfileRoute() {
  return <ContactProfilePage />;
}

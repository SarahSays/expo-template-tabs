import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCOUNT_KEY_PREFIX = 'orbits-demo-account:';

export type DemoAccount = {
  email: string;
  username?: string;
  notificationsEnabled?: boolean;
  onboardingComplete: boolean;
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function accountStorageKey(email: string): string {
  return `${ACCOUNT_KEY_PREFIX}${encodeURIComponent(normalizeEmail(email))}`;
}

/** Read a demo account after the email-code step has been completed. */
export async function getDemoAccount(email: string): Promise<DemoAccount | null> {
  try {
    const stored = await AsyncStorage.getItem(accountStorageKey(email));
    return stored ? JSON.parse(stored) as DemoAccount : null;
  } catch {
    return null;
  }
}

/** Save profile/onboarding fields; replace this with an authenticated API later. */
export async function saveDemoAccount(account: DemoAccount): Promise<void> {
  await AsyncStorage.setItem(accountStorageKey(account.email), JSON.stringify(account));
}

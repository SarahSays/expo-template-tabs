/**
 * Demo birthday prompt/push-preference store.
 *
 * Maintainer notes:
 * - This store is intentionally in-memory for demo behavior and rapid iteration.
 * - In production, persist these flags per-user and tie delivery to auth/session state.
 * - Real push workflow should use Expo push tokens + authenticated backend API tokens.
 */

export type BirthdayPromptSettings = {
  promptOnBirthday: boolean;
  enablePrefilledWishPush: boolean;
  enablePrewrittenReplyPush: boolean;
};

let settings: BirthdayPromptSettings = {
  promptOnBirthday: true,
  enablePrefilledWishPush: true,
  enablePrewrittenReplyPush: false,
};

/**
 * Returns a snapshot of current birthday prompt settings.
 */
export function getBirthdayPromptSettings(): BirthdayPromptSettings {
  return { ...settings };
}

/**
 * Updates one or more birthday prompt settings flags.
 */
export function updateBirthdayPromptSettings(partial: Partial<BirthdayPromptSettings>) {
  settings = { ...settings, ...partial };
}

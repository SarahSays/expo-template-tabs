/**
 * In-memory demo store for contacts/friends.
 *
 * This lightweight module provides a small API for listing friends,
 * getting a friend by id, and updating a friend's cadence setting.
 * It is intentionally non-persistent to keep the demo runnable in
 * Expo Go without native AsyncStorage. Replace with Context or
 * persistent storage (AsyncStorage) in production.
 */

export type Friend = {
  id: string;
  name: string;
  platform: 'Instagram' | 'SMS' | 'Signal' | 'Discord' | string;
  cadence?: string; // e.g. '1 day', '1 week'
  status?: 'online' | 'offline';
  birthday?: string; // ISO-like date string e.g. '1994-03-18' (demo only)
};

let friends: Friend[] = [
  { id: '1', name: 'Avery', platform: 'Instagram', cadence: '1 week', status: 'online', birthday: '1994-03-18' },
  { id: '2', name: 'Billie', platform: 'Bluesky', cadence: '1 month', status: 'offline', birthday: '1996-07-07' },
  { id: '3', name: 'Casey', platform: 'Signal', cadence: '1 week', status: 'online', birthday: '1992-11-24' },
  { id: '4', name: 'Darcy', platform: 'Discord', cadence: '1 day', status: 'offline', birthday: '1995-02-03' },
  { id: '5', name: 'Emory', platform: 'SMS', cadence: '1 year', status: 'online', birthday: '1993-08-29' },
  { id: '6', name: 'Finley', platform: 'Facebook', cadence: '2 years', status: 'online', birthday: '1991-05-12' },
  { id: '7', name: 'Gianny', platform: 'G-Message', cadence: '3 months', status: 'online', birthday: '1990-12-15' },
];

/**
 * Formats a demo birthday string into human-readable month/day copy.
 */
export function formatBirthdayForDisplay(birthday?: string): string {
  if (!birthday) {
    return 'Unknown';
  }

  const parsed = new Date(`${birthday}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return 'Unknown';
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Returns friends whose birthday month/day matches the provided date.
 */
export function getTodaysBirthdayFriends(date = new Date()): Friend[] {
  const month = date.getMonth();
  const day = date.getDate();

  return friends.filter((friend) => {
    if (!friend.birthday) {
      return false;
    }

    const birthday = new Date(`${friend.birthday}T00:00:00`);
    if (Number.isNaN(birthday.getTime())) {
      return false;
    }

    return birthday.getMonth() === month && birthday.getDate() === day;
  });
}

/**
 * getFriends function.
 *
 * Executes the getFriends behavior.
 */
export function getFriends(): Friend[] {
  return friends.slice();
}

/**
 * getFriend function.
 *
 * Executes the getFriend behavior.
 */
export function getFriend(id: string): Friend | undefined {
  return friends.find((f) => f.id === id);
}

/**
 * setCadence function.
 *
 * Executes the setCadence behavior.
 */
export function setCadence(id: string, cadence: string) {
  friends = friends.map((f) => (f.id === id ? { ...f, cadence } : f));
}

/**
 * addFriend function.
 *
 * Executes the addFriend behavior.
 */
export function addFriend(friend: Friend) {
  friends = [...friends, friend];
}

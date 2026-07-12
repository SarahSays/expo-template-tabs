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
};

let friends: Friend[] = [
  { id: '1', name: 'Alice', platform: 'Instagram', cadence: '1 week', status: 'online' },
  { id: '2', name: 'Bob', platform: 'SMS', cadence: '1 month', status: 'offline' },
  { id: '3', name: 'Charlie', platform: 'Signal', cadence: '1 week', status: 'online' },
  { id: '4', name: 'Dana', platform: 'Discord', cadence: '1 day', status: 'offline' },
];

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

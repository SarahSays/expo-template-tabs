/**
 * In-memory demo store for contacts/friends.
 *
 * This lightweight module provides a small API for listing friends,
 * getting a friend by id, and updating a friend's profile and cadence.
 * It is intentionally non-persistent to keep the demo runnable in
 * Expo Go without native AsyncStorage. Replace with Context or
 * persistent storage (AsyncStorage) in production.
 */

export type ContactProfile = {
  weeHoursOk: boolean;
  timeZone: string; // IANA timezone, e.g. 'America/New_York'
  broadcast: {
    reachability: boolean;
    timeZone: boolean;
    favoriteThings: boolean;
    slingshots: boolean;
    icebreakers: boolean;
  };
  favoriteThings: {
    loveLanguages: string[];
    giftIdeas: string[];
  };
  slingshots: string[];
  icebreakers: {
    askMeAbout: string;
    infoDumpOn: string;
    dontGetMeStartedOn: string;
  };
};

export type Friend = {
  id: string;
  name: string;
  platform: 'Instagram' | 'SMS' | 'Signal' | 'Discord' | string;
  cadence?: string; // e.g. '1 day', '1 week'
  status?: 'online' | 'offline';
  birthday?: string; // ISO-like date string e.g. '1994-03-18' (demo only)
  profile: ContactProfile;
};

let friends: Friend[] = [
  { id: '1', name: 'Avery', platform: 'Instagram', cadence: '1 week', status: 'online', birthday: '1994-03-18', profile: { weeHoursOk: false, timeZone: 'America/Los_Angeles', broadcast: { reachability: true, timeZone: true, favoriteThings: true, slingshots: true, icebreakers: true }, favoriteThings: { loveLanguages: ['Quality time'], giftIdeas: ['Used books', 'Coffee'] }, slingshots: ['Ask how the new job is going'], icebreakers: { askMeAbout: 'My rescue dog', infoDumpOn: 'Indie films', dontGetMeStartedOn: 'Bad public transit' } } },
  { id: '2', name: 'Billie', platform: 'Bluesky', cadence: '1 month', status: 'offline', birthday: '1996-07-07', profile: { weeHoursOk: true, timeZone: 'America/New_York', broadcast: { reachability: true, timeZone: true, favoriteThings: true, slingshots: false, icebreakers: true }, favoriteThings: { loveLanguages: ['Words of affirmation'], giftIdeas: ['House plants'] }, slingshots: ['Check in about the move'], icebreakers: { askMeAbout: 'Their garden', infoDumpOn: 'Birds', dontGetMeStartedOn: 'Reality TV' } } },
  { id: '3', name: 'Casey', platform: 'Signal', cadence: '1 week', status: 'online', birthday: '1992-11-24', profile: { weeHoursOk: false, timeZone: 'Europe/London', broadcast: { reachability: true, timeZone: true, favoriteThings: true, slingshots: true, icebreakers: true }, favoriteThings: { loveLanguages: ['Acts of service'], giftIdeas: ['Board games'] }, slingshots: ['Follow up on the pottery class'], icebreakers: { askMeAbout: 'Weekend hikes', infoDumpOn: 'Fantasy novels', dontGetMeStartedOn: 'Spoilers' } } },
  { id: '4', name: 'Darcy', platform: 'Discord', cadence: '1 day', status: 'offline', birthday: '1995-02-03', profile: { weeHoursOk: true, timeZone: 'Europe/Paris', broadcast: { reachability: true, timeZone: false, favoriteThings: false, slingshots: true, icebreakers: true }, favoriteThings: { loveLanguages: ['Quality time'], giftIdeas: ['Concert tickets'] }, slingshots: ['Ask how the band audition went'], icebreakers: { askMeAbout: 'Travel stories', infoDumpOn: 'Baking', dontGetMeStartedOn: 'Airport security lines' } } },
  { id: '5', name: 'Emory', platform: 'SMS', cadence: '1 year', status: 'online', birthday: '1993-08-29', profile: { weeHoursOk: false, timeZone: 'America/Chicago', broadcast: { reachability: false, timeZone: true, favoriteThings: true, slingshots: false, icebreakers: true }, favoriteThings: { loveLanguages: ['Gifts'], giftIdeas: ['Fancy tea'] }, slingshots: ['Remember their upcoming race'], icebreakers: { askMeAbout: 'Their cat', infoDumpOn: 'Running shoes', dontGetMeStartedOn: 'Spoiled endings' } } },
  { id: '6', name: 'Finley', platform: 'Facebook', cadence: '2 years', status: 'online', birthday: '1991-05-12', profile: { weeHoursOk: false, timeZone: 'Europe/Berlin', broadcast: { reachability: true, timeZone: true, favoriteThings: false, slingshots: false, icebreakers: true }, favoriteThings: { loveLanguages: ['Physical touch'], giftIdeas: ['Vinyl records'] }, slingshots: ['Ask about the family reunion'], icebreakers: { askMeAbout: 'Local food', infoDumpOn: 'Music history', dontGetMeStartedOn: 'Online arguments' } } },
  { id: '7', name: 'Gianny', platform: 'G-Message', cadence: '3 months', status: 'online', birthday: '1990-12-15', profile: { weeHoursOk: true, timeZone: 'America/Denver', broadcast: { reachability: true, timeZone: true, favoriteThings: true, slingshots: true, icebreakers: false }, favoriteThings: { loveLanguages: ['Acts of service'], giftIdeas: ['Trail maps'] }, slingshots: ['Check on the home renovation'], icebreakers: { askMeAbout: 'Mountain biking', infoDumpOn: 'Space exploration', dontGetMeStartedOn: 'Long checkout lines' } } },
  { id: '8', name: 'Holly', platform: 'Telegram', cadence: '1 week', status: 'online', birthday: '1997-09-21', profile: { weeHoursOk: false, timeZone: 'UTC', broadcast: { reachability: false, timeZone: false, favoriteThings: false, slingshots: false, icebreakers: false }, favoriteThings: { loveLanguages: [], giftIdeas: [] }, slingshots: [], icebreakers: { askMeAbout: '', infoDumpOn: '', dontGetMeStartedOn: '' } } },

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
  return friends.map(cloneFriend);
}

/**
 * getFriend function.
 *
 * Executes the getFriend behavior.
 */
export function getFriend(id: string): Friend | undefined {
  const friend = friends.find((f) => f.id === id);
  return friend ? cloneFriend(friend) : undefined;
}

function cloneFriend(friend: Friend): Friend {
  return {
    ...friend,
    profile: {
      ...friend.profile,
      broadcast: { ...friend.profile.broadcast },
      favoriteThings: {
        loveLanguages: [...friend.profile.favoriteThings.loveLanguages],
        giftIdeas: [...friend.profile.favoriteThings.giftIdeas],
      },
      slingshots: [...friend.profile.slingshots],
      icebreakers: { ...friend.profile.icebreakers },
    },
  };
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

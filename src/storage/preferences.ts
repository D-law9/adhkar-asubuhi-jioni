import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionId } from '../types/dhikr';
import { localDateKey } from '../utils/date';

export type ScriptMode = 'arabic' | 'translit';

export interface StreakState {
  count: number;
  lastCompletedDate: string | null;
}

export interface Preferences {
  scriptMode: ScriptMode;
  showMeaning: boolean;
  streaks: Record<SessionId, StreakState>;
}

const PREFS_KEY = '@adhkar/preferences';

const defaultPreferences: Preferences = {
  scriptMode: 'arabic',
  showMeaning: true,
  streaks: {
    asubuhi: { count: 0, lastCompletedDate: null },
    jioni: { count: 0, lastCompletedDate: null },
  },
};

export async function loadPreferences(): Promise<Preferences> {
  const raw = await AsyncStorage.getItem(PREFS_KEY);
  if (!raw) return defaultPreferences;
  try {
    const parsed = JSON.parse(raw);
    return { ...defaultPreferences, ...parsed, streaks: { ...defaultPreferences.streaks, ...parsed.streaks } };
  } catch {
    return defaultPreferences;
  }
}

export async function savePreferences(prefs: Preferences): Promise<void> {
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

function yesterday(dateKey: string): string {
  const d = new Date(dateKey + 'T00:00:00');
  d.setDate(d.getDate() - 1);
  return localDateKey(d);
}

/** Bumps a session's streak on completion. Consecutive-day completions increment;
 * a gap resets to 1; completing again on an already-counted day is a no-op. */
export function bumpStreak(streak: StreakState): StreakState {
  const today = localDateKey();
  if (streak.lastCompletedDate === today) return streak;
  const wasYesterday = streak.lastCompletedDate === yesterday(today);
  return { count: wasYesterday ? streak.count + 1 : 1, lastCompletedDate: today };
}

/** A streak "shown" to the user should read 0 once a day has been missed,
 * even before the next completion recalculates it. */
export function displayedStreak(streak: StreakState): number {
  if (!streak.lastCompletedDate) return 0;
  const today = localDateKey();
  if (streak.lastCompletedDate === today || streak.lastCompletedDate === yesterday(today)) {
    return streak.count;
  }
  return 0;
}

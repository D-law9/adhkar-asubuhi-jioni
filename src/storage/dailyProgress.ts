import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionId } from '../types/dhikr';
import { localDateKey } from '../utils/date';

export interface DailyProgress {
  dateKey: string;
  currentIndex: number;
  /** Taps recorded so far per item id, for resuming an in-progress item. */
  tapCounts: Record<string, number>;
  completed: boolean;
}

function storageKey(session: SessionId) {
  return `@adhkar/progress/${session}`;
}

function freshProgress(): DailyProgress {
  return { dateKey: localDateKey(), currentIndex: 0, tapCounts: {}, completed: false };
}

/** Loads today's progress for a session, resetting it if it's from a previous day. */
export async function loadDailyProgress(session: SessionId): Promise<DailyProgress> {
  const raw = await AsyncStorage.getItem(storageKey(session));
  if (!raw) return freshProgress();

  try {
    const parsed: DailyProgress = JSON.parse(raw);
    if (parsed.dateKey !== localDateKey()) return freshProgress();
    return parsed;
  } catch {
    return freshProgress();
  }
}

export async function saveDailyProgress(session: SessionId, progress: DailyProgress): Promise<void> {
  await AsyncStorage.setItem(storageKey(session), JSON.stringify(progress));
}

export async function resetDailyProgress(session: SessionId): Promise<DailyProgress> {
  const fresh = freshProgress();
  await saveDailyProgress(session, fresh);
  return fresh;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetDailyProgress } from './dailyProgress';

/** Wipes today's progress for both sessions and all persisted preferences
 * (script/meaning defaults, streaks, reminders) — the Settings "reset data" action. */
export async function resetAllData(): Promise<void> {
  await Promise.all([
    resetDailyProgress('asubuhi'),
    resetDailyProgress('jioni'),
    AsyncStorage.removeItem('@adhkar/preferences'),
  ]);
}

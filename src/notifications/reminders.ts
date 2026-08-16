import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SessionId } from '../types/dhikr';

const NOTIFICATION_ID: Record<SessionId, string> = {
  asubuhi: 'adhkar-reminder-asubuhi',
  jioni: 'adhkar-reminder-jioni',
};

const CONTENT: Record<SessionId, { title: string; body: string }> = {
  asubuhi: {
    title: 'Adhkār za Asubuhi',
    body: 'Wakati wa kusoma adhkār za asubuhi umewadia.',
  },
  jioni: {
    title: 'Adhkār za Jioni',
    body: 'Wakati wa kusoma adhkār za jioni umewadia.',
  },
};

let channelReady = false;

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android' || channelReady) return;
  await Notifications.setNotificationChannelAsync('adhkar-reminders', {
    name: 'Vikumbusho vya Adhkār',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
  channelReady = true;
}

export async function requestNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function scheduleReminder(session: SessionId, hour: number, minute: number): Promise<void> {
  await ensureAndroidChannel();
  await cancelReminder(session);
  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID[session],
    content: CONTENT[session],
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function cancelReminder(session: SessionId): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID[session]).catch(() => {});
}

import { DhikrItem, SessionId } from '../types/dhikr';
import { morningAdhkar } from './morning';
import { eveningAdhkar } from './evening';

export interface SessionMeta {
  id: SessionId;
  label: string; // "Asubuhi" / "Jioni"
  title: string; // "Adhkār za Asubuhi"
  timeWindow: string;
  items: DhikrItem[];
}

export const sessions: Record<SessionId, SessionMeta> = {
  asubuhi: {
    id: 'asubuhi',
    label: 'Asubuhi',
    title: 'Adhkār za Asubuhi',
    timeWindow: 'Baada ya Fajr hadi jua kuchomoza',
    items: morningAdhkar,
  },
  jioni: {
    id: 'jioni',
    label: 'Jioni',
    title: 'Adhkār za Jioni',
    timeWindow: 'Baada ya Asr hadi Magharibi',
    items: eveningAdhkar,
  },
};

export function getSession(id: SessionId): SessionMeta {
  return sessions[id];
}

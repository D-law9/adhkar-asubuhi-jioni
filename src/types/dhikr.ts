// Structured so translatable fields live under a language key (`sw` for v1),
// making it possible to add another language later without restructuring.
export interface DhikrTranslation {
  title: string;
  meaning: string;
  benefit: string;
}

export interface DhikrItem {
  id: string;
  arabic: string;
  translit: string;
  /** Number of taps required, or null for open-ended items ("kadiri uwezavyo"). */
  count: number | null;
  /** Shown next to the count for open-ended items, e.g. "kadiri uwezavyo". */
  openEndedLabel?: string;
  sourceCitation: string;
  sw: DhikrTranslation;
  /** Reserved for future recitation audio; no player wired up yet. */
  audioUrl?: string;
}

export type SessionId = 'asubuhi' | 'jioni';

export interface ClosingContent {
  title: string;
  dua: {
    arabic: string;
    translit: string;
    meaning: string;
    /** Reserved for future recitation audio; no player wired up yet. */
    audioUrl?: string;
  };
  messageLines: string[];
  sourceCitation?: string;
}

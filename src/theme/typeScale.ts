// Type scale — three reader-selectable tiers (Settings > Ukubwa wa Maandishi).
// `medium` is the new default baseline; `small` preserves the app's original
// (pre-redesign) sizes for anyone who prefers them; `large` is the ceiling.
// Every role grows at roughly the same rate except `arabicLarge`/`translitLarge`
// and `bodyText`, which grow faster — per the brief, Arabic script and body
// (meaning/benefit) text get the most generous treatment for older readers.

export type FontScale = 'small' | 'medium' | 'large';

export interface RoleSize {
  fontSize: number;
  lineHeight?: number;
}

export interface TypeScaleTokens {
  /** The big Amiri "Adhkār" wordmark on Home. */
  appTitle: RoleSize;
  /** Session/card/screen titles (Home card title, Session header, Completion title, Settings header). */
  cardTitle: RoleSize;
  /** Primary Arabic recitation text (dhikr card, closing dua). */
  arabicLarge: RoleSize;
  /** Primary transliteration text (Lora italic). */
  translitLarge: RoleSize;
  /** Meaning/benefit paragraphs and other reading-length body copy. */
  bodyText: RoleSize;
  /** Buttons, toggles, nav labels, row labels. */
  uiLabel: RoleSize;
  /** Captions, source citations, streak/progress fraction text. */
  uiSmall: RoleSize;
  /** Small-caps uppercase section labels ("MAANA", "CHAGUO-MSINGI"). */
  sectionLabel: RoleSize;
}

const SCALES: Record<FontScale, TypeScaleTokens> = {
  small: {
    appTitle: { fontSize: 34 },
    cardTitle: { fontSize: 18 },
    arabicLarge: { fontSize: 30, lineHeight: 54 },
    translitLarge: { fontSize: 20, lineHeight: 32 },
    bodyText: { fontSize: 16, lineHeight: 24 },
    uiLabel: { fontSize: 15 },
    uiSmall: { fontSize: 12 },
    sectionLabel: { fontSize: 12 },
  },
  medium: {
    appTitle: { fontSize: 38 },
    cardTitle: { fontSize: 21 },
    arabicLarge: { fontSize: 36, lineHeight: 65 },
    translitLarge: { fontSize: 24, lineHeight: 38 },
    bodyText: { fontSize: 19, lineHeight: 29 },
    uiLabel: { fontSize: 17 },
    uiSmall: { fontSize: 14 },
    sectionLabel: { fontSize: 13 },
  },
  large: {
    appTitle: { fontSize: 42 },
    cardTitle: { fontSize: 24 },
    arabicLarge: { fontSize: 44, lineHeight: 79 },
    translitLarge: { fontSize: 28, lineHeight: 44 },
    bodyText: { fontSize: 22, lineHeight: 33 },
    uiLabel: { fontSize: 19 },
    uiSmall: { fontSize: 16 },
    sectionLabel: { fontSize: 14 },
  },
};

export function getTypeScale(scale: FontScale): TypeScaleTokens {
  return SCALES[scale];
}

export const FONT_SCALE_LABELS: Record<FontScale, string> = {
  small: 'Ndogo',
  medium: 'Wastani',
  large: 'Kubwa',
};

export const FONT_SCALE_ORDER: FontScale[] = ['small', 'medium', 'large'];

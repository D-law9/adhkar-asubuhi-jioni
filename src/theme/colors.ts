// Design language — Adhkār Asubuhi na Jioni
// "Adhkār, Illuminated": warm parchment, deep navy/teal, gold-leaf ornament.
// Every text/background pairing below is WCAG-checked — see the tuning notes
// on `gold` before changing it.

export const colors = {
  ink: '#101d2c',
  inkSoft: '#4a5b71',

  // Screen ground — warm parchment, replacing the old cool grey "paper".
  parchment: '#f8f1e0',
  // Recessed surfaces: segmented-control track, progress track, dividers.
  parchmentDeep: '#efe2c4',
  // Card fill — lifted slightly lighter than the parchment ground beneath it.
  card: '#fffdf6',

  tealDeep: '#0d3f3c',
  teal: '#1f6f6b',

  // Gold used for borders/fills/icons. Tuned (not the naive "rich gold" hex)
  // so it clears WCAG 1.4.11 non-text contrast (>=3:1) against both
  // `parchment` and `card`, AND so `ink` text on a gold fill clears text
  // AA (>=4.5:1) — the two pull in opposite directions, this is the
  // narrow band that satisfies both. Do not use as text color directly.
  gold: '#b08225',
  // Lighter warm highlight for hairline sheen / secondary ornament strokes.
  // Decorative only — never the sole carrier of a required contrast ratio.
  goldBright: '#eec164',
  // Darkened gold for gold-toned text (body size clears WCAG AA 4.5:1;
  // `gold` itself reads under 3:1 as text and must not be used for text).
  goldText: '#7a5a1c',

  line: '#e4d6b0',
  white: '#fffefb',
};

// Morning horizon: pre-dawn indigo → warm gold as progress increases.
export const morningGradient = {
  start: '#1b2440', // pre-dawn indigo
  mid: '#6a5a7a',
  end: '#f2c26b', // warm gold
  sun: '#f4b23e',
  sky: ['#1b2440', '#3a4066', '#8a6a6f', '#f2c26b'],
};

// Evening horizon: warm dusk-orange → deep indigo/navy as progress increases.
export const eveningGradient = {
  start: '#e2762f', // dusk orange
  mid: '#5b4066',
  end: '#101a33', // deep indigo/navy
  moon: '#eef1f6',
  sky: ['#e2762f', '#8a5a63', '#3b3560', '#101a33'],
};

export const theme = {
  colors,
  morningGradient,
  eveningGradient,
};

export type ThemeColors = typeof colors;

// Design language — Adhkār Asubuhi na Jioni
// paper / ink / teal / gold identity, per build spec section 4.

export const colors = {
  paper: '#f4f6f8',
  ink: '#132033',
  inkSoft: '#41546b',
  teal: '#1f6f6b',
  tealDark: '#154f4c',
  gold: '#b4832b',
  goldLight: '#d9ac54',
  // A darkened variant of `gold` for small text specifically — the spec's
  // gold reads ~3.4:1 against paper/white, short of WCAG AA's 4.5:1 for
  // normal text. Reserve `gold` for fills/icons/large text; use this for
  // body-sized text (e.g. source citations, small labels).
  goldText: '#886320',
  line: '#dde4ea',
  white: '#ffffff',
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

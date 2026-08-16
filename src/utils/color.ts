function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Linear-interpolates between two hex colors. t is clamped to [0, 1]. */
export function lerpColor(from: string, to: string, t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  return rgbToHex(r1 + (r2 - r1) * clamped, g1 + (g2 - g1) * clamped, b1 + (b2 - b1) * clamped);
}

/** Interpolates across an array of hex color stops using t in [0, 1]. */
export function lerpColorStops(stops: string[], t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  if (stops.length === 1) return stops[0];
  const segment = 1 / (stops.length - 1);
  const index = Math.min(stops.length - 2, Math.floor(clamped / segment));
  const localT = (clamped - index * segment) / segment;
  return lerpColor(stops[index], stops[index + 1], localT);
}

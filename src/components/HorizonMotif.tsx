import React, { useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle, G, Polygon } from 'react-native-svg';
import { SessionId } from '../types/dhikr';
import { colors, morningGradient, eveningGradient } from '../theme/colors';
import { lerpColorStops } from '../utils/color';

interface Props {
  session: SessionId;
  /** 0..1 fraction through the session. */
  progress: number;
  height?: number;
  width?: number;
}

const STAR_POSITIONS = [
  { x: 0.18, y: 0.28, r: 1.6 },
  { x: 0.3, y: 0.15, r: 1.1 },
  { x: 0.62, y: 0.12, r: 1.3 },
  { x: 0.78, y: 0.24, r: 1.6 },
  { x: 0.88, y: 0.4, r: 1.1 },
  { x: 0.12, y: 0.45, r: 1.1 },
];

function starPoints(cx: number, cy: number, outer: number, inner: number, points: number, rotation = -90): string {
  const n = points * 2;
  const step = 360 / n;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = ((rotation + i * step) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(' ');
}

/** Faint architectural silhouette along the horizon baseline — a dome and two
 * flanking minarets, built from a handful of primitives (no imagery of living
 * beings anywhere in the app). Kept low-opacity and confined to the banner
 * graphic itself, away from any text, so it never affects reading contrast. */
function MosqueSkyline({ width, baseY, color, opacity }: { width: number; baseY: number; color: string; opacity: number }) {
  const s = width / 250;
  const cx = width / 2;
  return (
    <G opacity={opacity} fill={color}>
      <Rect x={cx - 38 * s} y={baseY - 2 * s} width={76 * s} height={2 * s} />
      <Path
        d={`M ${cx - 24 * s} ${baseY} Q ${cx - 24 * s} ${baseY - 20 * s} ${cx} ${baseY - 22 * s} Q ${cx + 24 * s} ${baseY - 20 * s} ${cx + 24 * s} ${baseY} Z`}
      />
      <Circle cx={cx} cy={baseY - 24 * s} r={2.2 * s} />
      <Rect x={cx - 9 * s} y={baseY - 10 * s} width={18 * s} height={10 * s} />
      <Rect x={cx - 58 * s} y={baseY - 30 * s} width={6 * s} height={30 * s} />
      <Polygon
        points={`${cx - 58 * s},${baseY - 30 * s} ${cx - 55 * s},${baseY - 38 * s} ${cx - 52 * s},${baseY - 30 * s}`}
      />
      <Circle cx={cx - 55 * s} cy={baseY - 40 * s} r={1.6 * s} />
      <Rect x={cx + 52 * s} y={baseY - 30 * s} width={6 * s} height={30 * s} />
      <Polygon
        points={`${cx + 52 * s},${baseY - 30 * s} ${cx + 55 * s},${baseY - 38 * s} ${cx + 58 * s},${baseY - 30 * s}`}
      />
      <Circle cx={cx + 55 * s} cy={baseY - 40 * s} r={1.6 * s} />
    </G>
  );
}

export function HorizonMotif({ session, progress, height = 160, width = 340 }: Props) {
  const clamped = Math.min(1, Math.max(0, progress));
  const palette = session === 'asubuhi' ? morningGradient : eveningGradient;
  const gradientId = `sky-${useId()}`;

  const skyTop = lerpColorStops(palette.sky, clamped);
  // Blends into the illuminated card fill beneath it, not the old flat page bg.
  const skyBottom = session === 'asubuhi' ? colors.card : '#0d1220';

  // Horizon arc: quadratic bezier, control point above the viewbox for a shallow dome.
  const p0 = { x: 0, y: height * 0.78 };
  const p2 = { x: width, y: height * 0.78 };
  const pc = { x: width / 2, y: height * -0.45 };
  const t = clamped;
  const bodyX = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * pc.x + t ** 2 * p2.x;
  const bodyY = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * pc.y + t ** 2 * p2.y;

  const bodyColor = session === 'asubuhi' ? morningGradient.sun : eveningGradient.moon;
  const bodyRadius = height * 0.075;

  // Small geometric star accent near the moon — the "crescent and star" motif,
  // built the same way as the crescent (primitives, no imagery of beings).
  const accentStarPts = starPoints(width * 0.74, height * 0.22, height * 0.05, height * 0.02, 5);

  return (
    <View style={[styles.wrap, { height, width }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={skyTop} stopOpacity={1} />
            <Stop offset="1" stopColor={skyBottom} stopOpacity={session === 'asubuhi' ? 0.2 : 0.94} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill={`url(#${gradientId})`} rx={18} />

        <MosqueSkyline
          width={width}
          baseY={height * 0.82}
          color={session === 'asubuhi' ? colors.card : '#f4f0e6'}
          opacity={session === 'asubuhi' ? 0.14 : 0.16}
        />

        {session === 'jioni' &&
          STAR_POSITIONS.map((s, i) => (
            <Circle
              key={i}
              cx={s.x * width}
              cy={s.y * height}
              r={s.r}
              fill="#f4f0e6"
              opacity={Math.min(1, Math.max(0, (clamped - i * 0.08) * 3))}
            />
          ))}

        {session === 'jioni' && (
          <Polygon points={accentStarPts} fill={colors.goldBright} opacity={Math.min(1, Math.max(0, (clamped - 0.3) * 3))} />
        )}

        <Path
          d={`M ${p0.x} ${p0.y} Q ${pc.x} ${pc.y} ${p2.x} ${p2.y}`}
          stroke={session === 'asubuhi' ? colors.card : '#8a93ad'}
          strokeOpacity={0.55}
          strokeWidth={1.5}
          fill="none"
        />

        {session === 'asubuhi' ? (
          <Circle cx={bodyX} cy={bodyY} r={bodyRadius} fill={bodyColor} />
        ) : (
          <>
            <Circle cx={bodyX} cy={bodyY} r={bodyRadius} fill={bodyColor} />
            <Circle
              cx={bodyX + bodyRadius * 0.35}
              cy={bodyY - bodyRadius * 0.25}
              r={bodyRadius * 0.85}
              fill={skyTop}
            />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 18,
    overflow: 'hidden',
  },
});

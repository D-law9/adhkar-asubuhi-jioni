import React, { useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle } from 'react-native-svg';
import { SessionId } from '../types/dhikr';
import { morningGradient, eveningGradient } from '../theme/colors';
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

export function HorizonMotif({ session, progress, height = 160, width = 340 }: Props) {
  const clamped = Math.min(1, Math.max(0, progress));
  const palette = session === 'asubuhi' ? morningGradient : eveningGradient;
  const gradientId = `sky-${useId()}`;

  const skyTop = lerpColorStops(palette.sky, clamped);
  const skyBottom = session === 'asubuhi' ? '#f4f6f8' : '#0b1224';

  // Horizon arc: quadratic bezier, control point above the viewbox for a shallow dome.
  const p0 = { x: 0, y: height * 0.78 };
  const p2 = { x: width, y: height * 0.78 };
  const pc = { x: width / 2, y: height * -0.45 };
  const t = clamped;
  const bodyX = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * pc.x + t ** 2 * p2.x;
  const bodyY = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * pc.y + t ** 2 * p2.y;

  const bodyColor = session === 'asubuhi' ? morningGradient.sun : eveningGradient.moon;
  const bodyRadius = height * 0.075;

  return (
    <View style={[styles.wrap, { height, width }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={skyTop} stopOpacity={1} />
            <Stop offset="1" stopColor={skyBottom} stopOpacity={session === 'asubuhi' ? 0.15 : 0.9} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill={`url(#${gradientId})`} rx={18} />

        {session === 'jioni' &&
          STAR_POSITIONS.map((s, i) => (
            <Circle
              key={i}
              cx={s.x * width}
              cy={s.y * height}
              r={s.r}
              fill="#f4f6f8"
              opacity={Math.min(1, Math.max(0, (clamped - i * 0.08) * 3))}
            />
          ))}

        <Path
          d={`M ${p0.x} ${p0.y} Q ${pc.x} ${pc.y} ${p2.x} ${p2.y}`}
          stroke={session === 'asubuhi' ? '#f4f6f8' : '#5a6a8a'}
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

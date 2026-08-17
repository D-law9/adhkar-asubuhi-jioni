import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { colors } from '../theme/colors';

// 8-point geometric star, purely linework — the app's one recurring
// ornament, used at card corners. No imagery of living beings anywhere
// in the app's decoration; every motif is geometric/architectural.
const STAR_POINTS =
  '11.00,2.00 12.42,7.58 17.36,4.64 14.42,9.58 20.00,11.00 14.42,12.42 17.36,17.36 12.42,14.42 11.00,20.00 9.58,14.42 4.64,17.36 7.58,12.42 2.00,11.00 7.58,9.58 4.64,4.64 9.58,7.58';

export function CornerOrnament({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Polygon points={STAR_POINTS} fill="none" stroke={colors.gold} strokeWidth={1} opacity={0.85} />
    </Svg>
  );
}

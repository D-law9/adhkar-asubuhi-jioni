import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SessionId } from '../types/dhikr';
import { colors } from '../theme/colors';

interface Props {
  session: SessionId;
  current: number; // 1-indexed position
  total: number;
}

export function SessionProgressBar({ session, current, total }: Props) {
  const fraction = total > 0 ? Math.min(1, current / total) : 0;
  const tint = session === 'asubuhi' ? colors.gold : colors.teal;

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${fraction * 100}%`, backgroundColor: tint }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.line,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});

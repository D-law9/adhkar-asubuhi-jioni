import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { CornerOrnament } from './CornerOrnament';
import { colors } from '../theme/colors';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  ornamentSize?: number;
}

/** Shared "illuminated manuscript" card frame — gold border, four corner
 * star ornaments, soft lift shadow. Ornaments sit inset from the edge and
 * the card's own padding keeps content clear of them, so they never
 * compete with text for contrast or legibility. */
export function IlluminatedCard({ children, style, ornamentSize = 18 }: Props) {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.corner, styles.cornerTL]}>
        <CornerOrnament size={ornamentSize} />
      </View>
      <View style={[styles.corner, styles.cornerTR]}>
        <CornerOrnament size={ornamentSize} />
      </View>
      <View style={[styles.corner, styles.cornerBL]}>
        <CornerOrnament size={ornamentSize} />
      </View>
      <View style={[styles.corner, styles.cornerBR]}>
        <CornerOrnament size={ornamentSize} />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.gold,
    padding: 16,
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  corner: {
    position: 'absolute',
    zIndex: 1,
  },
  cornerTL: { top: 4, left: 4 },
  cornerTR: { top: 4, right: 4, transform: [{ scaleX: -1 }] },
  cornerBL: { bottom: 4, left: 4, transform: [{ scaleY: -1 }] },
  cornerBR: { bottom: 4, right: 4, transform: [{ scaleX: -1 }, { scaleY: -1 }] },
});

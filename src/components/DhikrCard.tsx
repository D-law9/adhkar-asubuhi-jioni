import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { DhikrItem, SessionId } from '../types/dhikr';
import { ScriptMode } from '../storage/preferences';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { FontScale, getTypeScale, TypeScaleTokens } from '../theme/typeScale';
import { IlluminatedCard } from './IlluminatedCard';

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Props {
  item: DhikrItem;
  session: SessionId;
  scriptMode: ScriptMode;
  showMeaning: boolean;
  tapCount: number;
  fontScale: FontScale;
  onTap: () => void;
}

export function DhikrCard({ item, session, scriptMode, showMeaning, tapCount, fontScale, onTap }: Props) {
  const t = useMemo(() => getTypeScale(fontScale), [fontScale]);
  const styles = useMemo(() => makeStyles(t), [t]);

  // Text-safe accent: gold reads under WCAG AA at body-text sizes, so use the
  // darker goldText variant here (SessionProgressBar/buttons keep true gold).
  const tint = session === 'asubuhi' ? colors.goldText : colors.teal;
  const accent = session === 'asubuhi' ? colors.gold : colors.teal;
  const isOpenEnded = item.count === null;
  const remaining = isOpenEnded ? null : Math.max(0, item.count! - tapCount);
  // Prominent, upfront rep count — "Mara N" is the established Swahili adhkar
  // convention, and this sits by the title so it's visible before the first
  // tap, not just inferable from the live progress count below the card.
  const repeatLabel = isOpenEnded
    ? capitalize(item.openEndedLabel ?? 'mara nyingi')
    : `Mara ${item.count}`;

  return (
    <View style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{item.sw.title}</Text>

        <View style={styles.repeatBadgeRow}>
          <View style={[styles.repeatBadge, { borderColor: accent }]}>
            <Text style={[styles.repeatBadgeText, { color: tint }]}>{repeatLabel}</Text>
          </View>
        </View>

        <Pressable
          onPress={onTap}
          accessibilityRole="button"
          accessibilityLabel={`${item.sw.title}, gusa kuhesabu`}
          accessibilityHint={
            isOpenEnded ? `Umehesabu mara ${tapCount}` : `Umehesabu ${tapCount} kati ya ${item.count}`
          }
        >
          {({ pressed }) => (
            <IlluminatedCard style={[styles.textArea, pressed && styles.textAreaPressed]}>
              {scriptMode === 'arabic' ? (
                // Arabic script keeps a fixed calligraphic layout; Latin text below
                // scales freely with the system font size per the design spec.
                <Text style={styles.arabicText} maxFontSizeMultiplier={1.2}>
                  {item.arabic}
                </Text>
              ) : (
                <Text style={styles.translitText}>{item.translit}</Text>
              )}
            </IlluminatedCard>
          )}
        </Pressable>

        <View style={styles.counterRow}>
          {isOpenEnded ? (
            <Text style={[styles.counterText, { color: tint }]}>
              Umehesabu {tapCount} · {item.openEndedLabel}
            </Text>
          ) : (
            <Text style={[styles.counterText, { color: tint }]}>
              {tapCount}/{item.count} {remaining! > 0 ? '· gusa kuendelea' : ''}
            </Text>
          )}
        </View>

        {showMeaning && (
          <View style={styles.meaningBlock}>
            <Text style={styles.meaningLabel}>Maana</Text>
            <Text style={styles.meaningText}>{item.sw.meaning}</Text>
            <Text style={styles.meaningLabel}>Faida</Text>
            <Text style={styles.benefitText}>{item.sw.benefit}</Text>
            <Text style={styles.sourceText}>{item.sourceCitation}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function makeStyles(t: TypeScaleTokens) {
  return StyleSheet.create({
    wrap: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 32,
    },
    title: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.cardTitle.fontSize,
      color: colors.inkSoft,
      textAlign: 'center',
      marginBottom: 10,
      letterSpacing: 0.2,
    },
    repeatBadgeRow: {
      alignItems: 'center',
      marginBottom: 18,
    },
    repeatBadge: {
      backgroundColor: colors.parchmentDeep,
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
    repeatBadgeText: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.uiLabel.fontSize,
      letterSpacing: 0.3,
    },
    textArea: {
      minHeight: 180,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 28,
      paddingHorizontal: 12,
    },
    textAreaPressed: {
      backgroundColor: '#f3ead4',
    },
    arabicText: {
      fontFamily: fonts.arabic,
      fontSize: t.arabicLarge.fontSize,
      lineHeight: t.arabicLarge.lineHeight,
      color: colors.ink,
      textAlign: 'center',
      writingDirection: 'rtl',
    },
    translitText: {
      fontFamily: fonts.translit,
      fontSize: t.translitLarge.fontSize,
      lineHeight: t.translitLarge.lineHeight,
      color: colors.ink,
      textAlign: 'center',
    },
    counterRow: {
      marginTop: 18,
      alignItems: 'center',
    },
    counterText: {
      fontFamily: fonts.uiMedium,
      fontSize: t.uiLabel.fontSize,
    },
    meaningBlock: {
      marginTop: 24,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.line,
    },
    meaningLabel: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.sectionLabel.fontSize,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.tealDeep,
      marginBottom: 6,
    },
    meaningText: {
      fontFamily: fonts.meaning,
      fontSize: t.bodyText.fontSize,
      lineHeight: t.bodyText.lineHeight,
      color: colors.ink,
      marginBottom: 18,
    },
    benefitText: {
      fontFamily: fonts.meaningItalic,
      fontSize: t.bodyText.fontSize,
      lineHeight: t.bodyText.lineHeight,
      color: colors.inkSoft,
      marginBottom: 6,
    },
    sourceText: {
      fontFamily: fonts.ui,
      fontSize: t.uiSmall.fontSize,
      color: colors.goldText,
    },
  });
}

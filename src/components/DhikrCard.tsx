import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { DhikrItem, SessionId } from '../types/dhikr';
import { ScriptMode } from '../storage/preferences';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

interface Props {
  item: DhikrItem;
  session: SessionId;
  scriptMode: ScriptMode;
  showMeaning: boolean;
  tapCount: number;
  onTap: () => void;
}

export function DhikrCard({ item, session, scriptMode, showMeaning, tapCount, onTap }: Props) {
  // Text-safe accent: gold reads under WCAG AA at body-text sizes, so use the
  // darker goldText variant here (SessionProgressBar/buttons keep true gold).
  const tint = session === 'asubuhi' ? colors.goldText : colors.teal;
  const isOpenEnded = item.count === null;
  const remaining = isOpenEnded ? null : Math.max(0, item.count! - tapCount);

  return (
    <View style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{item.sw.title}</Text>

        <Pressable
          onPress={onTap}
          style={({ pressed }) => [styles.textArea, pressed && styles.textAreaPressed]}
          accessibilityRole="button"
          accessibilityLabel={`${item.sw.title}, gusa kuhesabu`}
          accessibilityHint={
            isOpenEnded ? `Umehesabu mara ${tapCount}` : `Umehesabu ${tapCount} kati ya ${item.count}`
          }
        >
          {scriptMode === 'arabic' ? (
            // Arabic script keeps a fixed calligraphic layout; Latin text below
            // scales freely with the system font size per the design spec.
            <Text style={styles.arabicText} maxFontSizeMultiplier={1.3}>
              {item.arabic}
            </Text>
          ) : (
            <Text style={styles.translitText}>{item.translit}</Text>
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

const styles = StyleSheet.create({
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
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  textArea: {
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  textAreaPressed: {
    backgroundColor: '#eef2f5',
  },
  arabicText: {
    fontFamily: fonts.arabic,
    fontSize: 30,
    lineHeight: 54,
    color: colors.ink,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  translitText: {
    fontFamily: fonts.translit,
    fontSize: 20,
    lineHeight: 32,
    color: colors.ink,
    textAlign: 'center',
  },
  counterRow: {
    marginTop: 18,
    alignItems: 'center',
  },
  counterText: {
    fontFamily: fonts.uiMedium,
    fontSize: 15,
  },
  meaningBlock: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  meaningLabel: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.teal,
    marginBottom: 6,
  },
  meaningText: {
    fontFamily: fonts.meaning,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
    marginBottom: 18,
  },
  benefitText: {
    fontFamily: fonts.meaningItalic,
    fontSize: 15,
    lineHeight: 23,
    color: colors.inkSoft,
    marginBottom: 6,
  },
  sourceText: {
    fontFamily: fonts.ui,
    fontSize: 12,
    color: colors.goldText,
  },
});

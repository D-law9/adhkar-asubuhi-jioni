import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getClosingContent } from '../data/closing';
import { HorizonMotif } from '../components/HorizonMotif';
import { IlluminatedCard } from '../components/IlluminatedCard';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { getTypeScale, TypeScaleTokens } from '../theme/typeScale';
import { resetDailyProgress } from '../storage/dailyProgress';
import { loadPreferences, Preferences } from '../storage/preferences';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;

export function CompletionScreen({ route, navigation }: Props) {
  const { sessionId } = route.params;
  const closing = getClosingContent(sessionId);
  const tint = sessionId === 'asubuhi' ? colors.gold : colors.teal;
  // White-on-gold fails WCAG AA at button-text size; dark ink clears it while
  // white-on-teal already passes, so the Rudia label color depends on the fill.
  const onTintText = sessionId === 'asubuhi' ? colors.ink : colors.white;

  const [prefs, setPrefs] = useState<Preferences | null>(null);

  useEffect(() => {
    loadPreferences().then(setPrefs);
  }, []);

  const t = useMemo(() => getTypeScale(prefs?.fontScale ?? 'medium'), [prefs?.fontScale]);
  const styles = useMemo(() => makeStyles(t), [t]);

  const handleRudia = useCallback(async () => {
    await resetDailyProgress(sessionId);
    navigation.replace('Session', { sessionId });
  }, [sessionId, navigation]);

  const handleHome = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HorizonMotif session={sessionId} progress={1} height={140} width={320} />

        <Text style={styles.title}>{closing.title}</Text>

        <IlluminatedCard style={styles.duaCard}>
          <Text style={styles.arabic} maxFontSizeMultiplier={1.2}>
            {closing.dua.arabic}
          </Text>
          <Text style={styles.translit}>{closing.dua.translit}</Text>
          <Text style={styles.meaning}>{closing.dua.meaning}</Text>
          {closing.sourceCitation && <Text style={styles.source}>{closing.sourceCitation}</Text>}
        </IlluminatedCard>

        <View style={styles.messageBlock}>
          {closing.messageLines.map((line, i) => (
            <Text key={i} style={styles.messageLine}>
              {line}
            </Text>
          ))}
        </View>

        {prefs && (
          <Text style={styles.streakText}>
            Umekamilisha {sessionId === 'asubuhi' ? 'Asubuhi' : 'Jioni'} kwa siku {prefs.streaks[sessionId].count}{' '}
            mfululizo.
          </Text>
        )}
        {!prefs && <ActivityIndicator color={tint} style={{ marginTop: 8 }} />}

        <View style={styles.buttonRow}>
          <Pressable
            onPress={handleHome}
            style={[styles.button, styles.homeButton]}
            accessibilityRole="button"
            accessibilityLabel="Nenda Nyumbani"
          >
            <Text style={styles.homeButtonText}>Nyumbani</Text>
          </Pressable>
          <Pressable
            onPress={handleRudia}
            style={[styles.button, { backgroundColor: tint }]}
            accessibilityRole="button"
            accessibilityLabel="Rudia Kipindi"
          >
            <Text style={[styles.buttonText, { color: onTintText }]}>Rudia</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function makeStyles(t: TypeScaleTokens) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.parchment,
    },
    content: {
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 40,
    },
    title: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.cardTitle.fontSize,
      color: colors.ink,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    duaCard: {
      width: '100%',
      alignItems: 'center',
    },
    arabic: {
      fontFamily: fonts.arabic,
      fontSize: t.arabicLarge.fontSize,
      lineHeight: t.arabicLarge.lineHeight,
      color: colors.ink,
      textAlign: 'center',
      writingDirection: 'rtl',
      marginBottom: 16,
    },
    translit: {
      fontFamily: fonts.translit,
      fontSize: t.translitLarge.fontSize,
      lineHeight: t.translitLarge.lineHeight,
      color: colors.inkSoft,
      textAlign: 'center',
      marginBottom: 16,
    },
    meaning: {
      fontFamily: fonts.meaning,
      fontSize: t.bodyText.fontSize,
      lineHeight: t.bodyText.lineHeight,
      color: colors.ink,
      textAlign: 'center',
      marginBottom: 10,
    },
    source: {
      fontFamily: fonts.ui,
      fontSize: t.uiSmall.fontSize,
      color: colors.goldText,
    },
    messageBlock: {
      marginTop: 24,
      gap: 8,
    },
    messageLine: {
      fontFamily: fonts.meaningItalic,
      fontSize: t.bodyText.fontSize,
      lineHeight: t.bodyText.lineHeight,
      color: colors.inkSoft,
      textAlign: 'center',
    },
    streakText: {
      fontFamily: fonts.uiMedium,
      fontSize: t.uiLabel.fontSize,
      color: colors.teal,
      marginTop: 18,
      textAlign: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 14,
      marginTop: 32,
      width: '100%',
    },
    button: {
      flex: 1,
      borderRadius: 26,
      paddingVertical: 14,
      alignItems: 'center',
    },
    homeButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.line,
    },
    homeButtonText: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.uiLabel.fontSize,
      color: colors.ink,
    },
    buttonText: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.uiLabel.fontSize,
      color: colors.white,
    },
  });
}

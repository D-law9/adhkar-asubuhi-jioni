import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { sessions } from '../data/sessions';
import { SessionId } from '../types/dhikr';
import { HorizonMotif } from '../components/HorizonMotif';
import { IlluminatedCard } from '../components/IlluminatedCard';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { getTypeScale, TypeScaleTokens } from '../theme/typeScale';
import { DailyProgress, loadDailyProgress } from '../storage/dailyProgress';
import { displayedStreak, loadPreferences, Preferences } from '../storage/preferences';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [progressBySession, setProgressBySession] = useState<Record<SessionId, DailyProgress | null>>({
    asubuhi: null,
    jioni: null,
  });
  const [prefs, setPrefs] = useState<Preferences | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [asubuhi, jioni, loadedPrefs] = await Promise.all([
          loadDailyProgress('asubuhi'),
          loadDailyProgress('jioni'),
          loadPreferences(),
        ]);
        if (cancelled) return;
        setProgressBySession({ asubuhi, jioni });
        setPrefs(loadedPrefs);
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const t = useMemo(() => getTypeScale(prefs?.fontScale ?? 'medium'), [prefs?.fontScale]);
  const styles = useMemo(() => makeStyles(t), [t]);

  const openSession = useCallback(
    (sessionId: SessionId) => {
      const progress = progressBySession[sessionId];
      if (progress?.completed) {
        navigation.navigate('Completion', { sessionId });
      } else {
        navigation.navigate('Session', { sessionId });
      }
    },
    [navigation, progressBySession]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Text style={styles.appTitle}>Adhkār</Text>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            hitSlop={16}
            style={styles.settingsButton}
            accessibilityRole="button"
            accessibilityLabel="Mipangilio"
          >
            <Feather name="settings" size={22} color={colors.inkSoft} />
          </Pressable>
        </View>
        <Text style={styles.appSubtitle}>Asubuhi na Jioni</Text>

        {(['asubuhi', 'jioni'] as SessionId[]).map((sessionId) => {
          const meta = sessions[sessionId];
          const progress = progressBySession[sessionId];
          const total = meta.items.length;
          const done = progress?.completed ? total : progress?.currentIndex ?? 0;
          const fraction = total > 0 ? done / total : 0;
          // Text-safe accent: gold reads under WCAG AA at this text size.
          const tint = sessionId === 'asubuhi' ? colors.goldText : colors.teal;
          const streakCount = prefs ? displayedStreak(prefs.streaks[sessionId]) : 0;

          const statusLabel = progress?.completed
            ? 'Imekamilika leo'
            : `${done} kati ya ${total} imekamilika`;

          return (
            <Pressable
              key={sessionId}
              onPress={() => openSession(sessionId)}
              style={({ pressed }) => [pressed && styles.cardPressed]}
              accessibilityRole="button"
              accessibilityLabel={`${meta.title}. ${meta.timeWindow}. ${statusLabel}.`}
            >
              <IlluminatedCard style={styles.card}>
                <HorizonMotif session={sessionId} progress={fraction} height={110} width={296} />

                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitle}>{meta.title}</Text>
                  {progress?.completed && <Text style={[styles.checkmark, { color: tint }]}>✓</Text>}
                </View>

                <Text style={styles.cardSubtitle}>{meta.timeWindow}</Text>

                <View style={styles.cardFooterRow}>
                  <Text style={[styles.progressText, { color: tint }]}>
                    {done}/{total}
                  </Text>
                  {streakCount > 0 && (
                    <Text style={styles.streakText}>Siku {streakCount} mfululizo</Text>
                  )}
                </View>
              </IlluminatedCard>
            </Pressable>
          );
        })}
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
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 40,
    },
    titleRow: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    appTitle: {
      fontFamily: fonts.arabicBold,
      fontSize: t.appTitle.fontSize,
      color: colors.ink,
      textAlign: 'center',
    },
    settingsButton: {
      position: 'absolute',
      right: 0,
      top: 4,
      padding: 6,
    },
    appSubtitle: {
      fontFamily: fonts.uiMedium,
      fontSize: t.uiSmall.fontSize,
      color: colors.inkSoft,
      textAlign: 'center',
      marginTop: 2,
      marginBottom: 28,
      letterSpacing: 1,
    },
    card: {
      alignItems: 'center',
      padding: 14,
      marginBottom: 20,
    },
    cardPressed: {
      opacity: 0.85,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 14,
    },
    cardTitle: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.cardTitle.fontSize,
      color: colors.ink,
    },
    checkmark: {
      fontFamily: fonts.uiBold,
      fontSize: t.uiLabel.fontSize,
    },
    cardSubtitle: {
      fontFamily: fonts.meaningItalic,
      fontSize: t.uiSmall.fontSize,
      color: colors.inkSoft,
      textAlign: 'center',
      marginTop: 4,
    },
    cardFooterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      marginTop: 10,
    },
    progressText: {
      fontFamily: fonts.uiSemiBold,
      fontSize: t.uiLabel.fontSize,
    },
    streakText: {
      fontFamily: fonts.ui,
      fontSize: t.uiSmall.fontSize,
      color: colors.goldText,
    },
  });
}

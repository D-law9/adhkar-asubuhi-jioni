import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { sessions } from '../data/sessions';
import { SessionId } from '../types/dhikr';
import { HorizonMotif } from '../components/HorizonMotif';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
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
        <Text style={styles.appTitle}>Adhkār</Text>
        <Text style={styles.appSubtitle}>Asubuhi na Jioni</Text>

        {(['asubuhi', 'jioni'] as SessionId[]).map((sessionId) => {
          const meta = sessions[sessionId];
          const progress = progressBySession[sessionId];
          const total = meta.items.length;
          const done = progress?.completed ? total : progress?.currentIndex ?? 0;
          const fraction = total > 0 ? done / total : 0;
          const tint = sessionId === 'asubuhi' ? colors.gold : colors.teal;
          const streakCount = prefs ? displayedStreak(prefs.streaks[sessionId]) : 0;

          return (
            <Pressable
              key={sessionId}
              onPress={() => openSession(sessionId)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
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
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  appTitle: {
    fontFamily: fonts.arabicBold,
    fontSize: 34,
    color: colors.ink,
    textAlign: 'center',
  },
  appSubtitle: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: colors.inkSoft,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 28,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
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
    fontSize: 18,
    color: colors.ink,
  },
  checkmark: {
    fontFamily: fonts.uiBold,
    fontSize: 16,
  },
  cardSubtitle: {
    fontFamily: fonts.meaningItalic,
    fontSize: 13,
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
    fontSize: 14,
  },
  streakText: {
    fontFamily: fonts.ui,
    fontSize: 12,
    color: colors.gold,
  },
});

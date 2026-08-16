import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getClosingContent } from '../data/closing';
import { HorizonMotif } from '../components/HorizonMotif';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { resetDailyProgress } from '../storage/dailyProgress';
import { loadPreferences, Preferences } from '../storage/preferences';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;

export function CompletionScreen({ route, navigation }: Props) {
  const { sessionId } = route.params;
  const closing = getClosingContent(sessionId);
  const tint = sessionId === 'asubuhi' ? colors.gold : colors.teal;

  const [prefs, setPrefs] = useState<Preferences | null>(null);

  useEffect(() => {
    loadPreferences().then(setPrefs);
  }, []);

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

        <View style={styles.duaCard}>
          <Text style={styles.arabic}>{closing.dua.arabic}</Text>
          <Text style={styles.translit}>{closing.dua.translit}</Text>
          <Text style={styles.meaning}>{closing.dua.meaning}</Text>
          {closing.sourceCitation && <Text style={styles.source}>{closing.sourceCitation}</Text>}
        </View>

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
          <Pressable onPress={handleHome} style={[styles.button, styles.homeButton]}>
            <Text style={styles.homeButtonText}>Nyumbani</Text>
          </Pressable>
          <Pressable onPress={handleRudia} style={[styles.button, { backgroundColor: tint }]}>
            <Text style={styles.buttonText}>Rudia</Text>
          </Pressable>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  duaCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 22,
    alignItems: 'center',
  },
  arabic: {
    fontFamily: fonts.arabic,
    fontSize: 24,
    lineHeight: 44,
    color: colors.ink,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 14,
  },
  translit: {
    fontFamily: fonts.translit,
    fontSize: 15,
    lineHeight: 24,
    color: colors.inkSoft,
    textAlign: 'center',
    marginBottom: 14,
  },
  meaning: {
    fontFamily: fonts.meaning,
    fontSize: 15,
    lineHeight: 23,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 10,
  },
  source: {
    fontFamily: fonts.ui,
    fontSize: 11,
    color: colors.gold,
  },
  messageBlock: {
    marginTop: 24,
    gap: 8,
  },
  messageLine: {
    fontFamily: fonts.meaningItalic,
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkSoft,
    textAlign: 'center',
  },
  streakText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13,
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
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  homeButtonText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  buttonText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15,
    color: colors.white,
  },
});

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getSession } from '../data/sessions';
import { DhikrCard } from '../components/DhikrCard';
import { SessionProgressBar } from '../components/SessionProgressBar';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { DailyProgress, loadDailyProgress, saveDailyProgress } from '../storage/dailyProgress';
import { loadPreferences, savePreferences, Preferences, bumpStreak } from '../storage/preferences';
import { localDateKey } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'Session'>;

export function SessionScreen({ route, navigation }: Props) {
  const { sessionId } = route.params;
  const session = getSession(sessionId);
  const total = session.items.length;

  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [tapCounts, setTapCounts] = useState<Record<string, number>>({});
  const [prefs, setPrefs] = useState<Preferences | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Blocks re-entrant navigation while a fade transition is in flight — without
  // this, a quick double-tap on Ruka/Nyuma races two overlapping Animated
  // sequences on the same fadeAnim value and can leave the card stuck invisible.
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    (async () => {
      const [progress, loadedPrefs] = await Promise.all([loadDailyProgress(sessionId), loadPreferences()]);
      // A session already completed today is opened fresh, mirroring "Rudia".
      if (progress.completed) {
        setIndex(0);
        setTapCounts({});
      } else {
        setIndex(Math.min(progress.currentIndex, total - 1));
        setTapCounts(progress.tapCounts);
      }
      setPrefs(loadedPrefs);
      setLoading(false);
    })();
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const persist = useCallback(
    (newIndex: number, newTapCounts: Record<string, number>, completed: boolean) => {
      const progress: DailyProgress = {
        dateKey: localDateKey(),
        currentIndex: newIndex,
        tapCounts: newTapCounts,
        completed,
      };
      saveDailyProgress(sessionId, progress);
    },
    [sessionId]
  );

  const animateTo = useCallback(
    (nextIndex: number) => {
      isTransitioningRef.current = true;
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
        setIndex(nextIndex);
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start(() => {
          isTransitioningRef.current = false;
        });
      });
    },
    [fadeAnim]
  );

  const finishSession = useCallback(async () => {
    persist(total - 1, tapCounts, true);
    if (prefs) {
      const updatedStreaks = { ...prefs.streaks, [sessionId]: bumpStreak(prefs.streaks[sessionId]) };
      const updatedPrefs = { ...prefs, streaks: updatedStreaks };
      setPrefs(updatedPrefs);
      await savePreferences(updatedPrefs);
    }
    navigation.replace('Completion', { sessionId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist, prefs, sessionId, tapCounts, total, navigation]);

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    if (index >= total - 1) {
      finishSession();
      return;
    }
    const nextIndex = index + 1;
    animateTo(nextIndex);
    persist(nextIndex, tapCounts, false);
  }, [index, total, animateTo, persist, tapCounts, finishSession]);

  const goToPrevious = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    if (index === 0) return;
    const prevIndex = index - 1;
    animateTo(prevIndex);
    persist(prevIndex, tapCounts, false);
  }, [index, animateTo, persist, tapCounts]);

  const handleTap = useCallback(() => {
    const item = session.items[index];
    const current = tapCounts[item.id] ?? 0;
    // Once a count-based item has hit its target, ignore further taps —
    // otherwise a fast double-tap keeps re-arming the auto-advance timer.
    if (item.count !== null && current >= item.count) return;

    const next = current + 1;
    const updated = { ...tapCounts, [item.id]: next };
    setTapCounts(updated);
    persist(index, updated, false);

    if (item.count !== null && next >= item.count) {
      advanceTimer.current = setTimeout(() => {
        goToNext();
      }, 380);
    }
  }, [session.items, index, tapCounts, persist, goToNext]);

  const toggleScript = useCallback(() => {
    if (!prefs) return;
    const updated: Preferences = { ...prefs, scriptMode: prefs.scriptMode === 'arabic' ? 'translit' : 'arabic' };
    setPrefs(updated);
    savePreferences(updated);
  }, [prefs]);

  const toggleMeaning = useCallback(() => {
    if (!prefs) return;
    const updated: Preferences = { ...prefs, showMeaning: !prefs.showMeaning };
    setPrefs(updated);
    savePreferences(updated);
  }, [prefs]);

  if (loading || !prefs) {
    return (
      <SafeAreaView style={styles.loadingWrap}>
        <ActivityIndicator color={colors.teal} />
      </SafeAreaView>
    );
  }

  const item = session.items[index];
  const tint = sessionId === 'asubuhi' ? colors.gold : colors.teal;
  // Text-safe accent for the toggle labels — gold reads under WCAG AA at this
  // size, so the finish button (a fill, not text-on-page) keeps true `tint`.
  const textTint = sessionId === 'asubuhi' ? colors.goldText : colors.teal;
  // White-on-gold also fails AA at button-text size; dark ink clears it while
  // white-on-teal already passes, so the label color depends on the fill.
  const onTintText = sessionId === 'asubuhi' ? colors.ink : colors.white;
  const isOpenEnded = item.count === null;
  const tapCount = tapCounts[item.id] ?? 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Rudi Nyumbani"
        >
          <Text style={styles.headerIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{session.title}</Text>
        <View style={styles.headerRightSpace} />
      </View>

      <View style={styles.progressWrap}>
        <SessionProgressBar session={sessionId} current={index + 1} total={total} />
        <Text style={styles.progressLabel}>
          {index + 1}/{total}
        </Text>
      </View>

      <View style={styles.toggleRow}>
        <Pressable
          onPress={toggleScript}
          style={styles.toggleButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={
            prefs.scriptMode === 'arabic' ? 'Badilisha kwenda Matamshi' : 'Badilisha kwenda Kiarabu'
          }
        >
          <Text style={[styles.toggleText, { color: textTint }]}>
            {prefs.scriptMode === 'arabic' ? 'Kiarabu' : 'Matamshi'} ⇄
          </Text>
        </Pressable>
        <Pressable
          onPress={toggleMeaning}
          style={styles.toggleButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={prefs.showMeaning ? 'Ficha Maana' : 'Onyesha Maana'}
        >
          <Text style={[styles.toggleText, { color: textTint }]}>
            {prefs.showMeaning ? '🙈 Ficha Maana' : '👁 Onyesha Maana'}
          </Text>
        </Pressable>
      </View>

      <Animated.View style={[styles.cardWrap, { opacity: fadeAnim }]}>
        <DhikrCard
          item={item}
          session={sessionId}
          scriptMode={prefs.scriptMode}
          showMeaning={prefs.showMeaning}
          tapCount={tapCount}
          onTap={handleTap}
        />
      </Animated.View>

      <View style={styles.footer}>
        <Pressable
          onPress={goToPrevious}
          disabled={index === 0}
          hitSlop={16}
          style={styles.footerNavButton}
          accessibilityRole="button"
          accessibilityLabel="Kipengele Kilichopita"
          accessibilityState={{ disabled: index === 0 }}
        >
          <Text style={[styles.footerNav, index === 0 && styles.footerNavDisabled]}>‹ Nyuma</Text>
        </Pressable>

        {isOpenEnded && (
          <Pressable
            onPress={goToNext}
            style={[styles.finishButton, { backgroundColor: tint }]}
            accessibilityRole="button"
            accessibilityLabel="Nimemaliza, endelea"
          >
            <Text style={[styles.finishButtonText, { color: onTintText }]}>Nimemaliza — endelea</Text>
          </Pressable>
        )}

        <Pressable
          onPress={goToNext}
          hitSlop={16}
          style={styles.footerNavButton}
          accessibilityRole="button"
          accessibilityLabel="Ruka Kipengele Hiki"
        >
          <Text style={styles.footerNav}>Ruka ›</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  loadingWrap: {
    flex: 1,
    backgroundColor: colors.paper,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  headerIcon: {
    fontSize: 28,
    color: colors.ink,
    fontFamily: fonts.ui,
    width: 32,
  },
  headerRightSpace: {
    width: 32,
  },
  headerTitle: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  progressWrap: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressLabel: {
    fontFamily: fonts.uiMedium,
    fontSize: 12,
    color: colors.inkSoft,
    minWidth: 40,
    textAlign: 'right',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 14,
    marginBottom: 4,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  toggleText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13,
  },
  cardWrap: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  footerNavButton: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    minHeight: 44,
    justifyContent: 'center',
  },
  footerNav: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: colors.inkSoft,
  },
  footerNavDisabled: {
    opacity: 0.3,
  },
  finishButton: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 14,
    color: colors.white,
  },
});

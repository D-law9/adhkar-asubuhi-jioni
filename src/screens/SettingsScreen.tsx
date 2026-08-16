import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Switch, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../navigation/types';
import { SessionId } from '../types/dhikr';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { loadPreferences, savePreferences, Preferences, ScriptMode } from '../storage/preferences';
import { resetAllData } from '../storage/resetAll';
import { cancelReminder, requestNotificationPermission, scheduleReminder } from '../notifications/reminders';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SESSION_LABEL: Record<SessionId, string> = { asubuhi: 'Asubuhi', jioni: 'Jioni' };

function formatTime(hour: number, minute: number): string {
  const h = String(hour).padStart(2, '0');
  const m = String(minute).padStart(2, '0');
  return `${h}:${m}`;
}

export function SettingsScreen({ navigation }: Props) {
  const [prefs, setPrefs] = useState<Preferences | null>(null);
  const [pickerFor, setPickerFor] = useState<SessionId | null>(null);

  useEffect(() => {
    loadPreferences().then(setPrefs);
  }, []);

  const persist = useCallback((updated: Preferences) => {
    setPrefs(updated);
    savePreferences(updated);
  }, []);

  const setScriptMode = useCallback(
    (scriptMode: ScriptMode) => {
      if (!prefs) return;
      persist({ ...prefs, scriptMode });
    },
    [prefs, persist]
  );

  const toggleShowMeaning = useCallback(() => {
    if (!prefs) return;
    persist({ ...prefs, showMeaning: !prefs.showMeaning });
  }, [prefs, persist]);

  const toggleReminder = useCallback(
    async (session: SessionId, value: boolean) => {
      if (!prefs) return;
      try {
        if (value) {
          const granted = await requestNotificationPermission();
          if (!granted) {
            Alert.alert(
              'Ruhusa Haijatolewa',
              'Ili kupokea vikumbusho, ruhusu arifa za programu hii kwenye mipangilio ya kifaa chako.'
            );
            return;
          }
          const setting = prefs.reminders[session];
          await scheduleReminder(session, setting.hour, setting.minute);
        } else {
          await cancelReminder(session);
        }
      } catch {
        Alert.alert('Imeshindikana', 'Vikumbusho havipatikani kwenye kifaa hiki kwa sasa.');
        return;
      }
      persist({ ...prefs, reminders: { ...prefs.reminders, [session]: { ...prefs.reminders[session], enabled: value } } });
    },
    [prefs, persist]
  );

  const onPickTime = useCallback(
    async (event: DateTimePickerEvent, selectedDate?: Date) => {
      const session = pickerFor;
      setPickerFor(null);
      if (!session || !prefs || event.type === 'dismissed' || !selectedDate) return;

      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
      const updatedSetting = { ...prefs.reminders[session], hour, minute };
      const updated = { ...prefs, reminders: { ...prefs.reminders, [session]: updatedSetting } };
      persist(updated);
      if (updatedSetting.enabled) {
        await scheduleReminder(session, hour, minute).catch(() => {});
      }
    },
    [pickerFor, prefs, persist]
  );

  const handleResetData = useCallback(() => {
    Alert.alert(
      'Weka Upya Data Yote?',
      'Hatua hii itafuta maendeleo ya leo ya vipindi vyote viwili, mipangilio yako, na mfululizo wa siku. Haiwezi kutenduliwa.',
      [
        { text: 'Ghairi', style: 'cancel' },
        {
          text: 'Futa Data',
          style: 'destructive',
          onPress: async () => {
            await Promise.all([cancelReminder('asubuhi'), cancelReminder('jioni')]);
            await resetAllData();
            const fresh = await loadPreferences();
            setPrefs(fresh);
          },
        },
      ]
    );
  }, []);

  if (!prefs) {
    return (
      <SafeAreaView style={styles.loadingWrap}>
        <ActivityIndicator color={colors.teal} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Rudi Nyuma"
        >
          <Text style={styles.headerIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Mipangilio</Text>
        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Chaguo-Msingi</Text>
        <View style={styles.card}>
          <Text style={styles.rowLabel}>Andiko la Kuonyesha</Text>
          <View style={styles.segmented}>
            <Pressable
              onPress={() => setScriptMode('arabic')}
              style={[styles.segmentButton, prefs.scriptMode === 'arabic' && styles.segmentButtonActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: prefs.scriptMode === 'arabic' }}
              accessibilityLabel="Kiarabu"
            >
              <Text style={[styles.segmentText, prefs.scriptMode === 'arabic' && styles.segmentTextActive]}>
                Kiarabu
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setScriptMode('translit')}
              style={[styles.segmentButton, prefs.scriptMode === 'translit' && styles.segmentButtonActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: prefs.scriptMode === 'translit' }}
              accessibilityLabel="Matamshi"
            >
              <Text style={[styles.segmentText, prefs.scriptMode === 'translit' && styles.segmentTextActive]}>
                Matamshi
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.switchRow}>
            <Text style={styles.rowLabel}>Onyesha Maana kwa Chaguo-Msingi</Text>
            <Switch
              value={prefs.showMeaning}
              onValueChange={toggleShowMeaning}
              trackColor={{ true: colors.teal, false: colors.line }}
              accessibilityLabel="Onyesha Maana kwa Chaguo-Msingi"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Vikumbusho</Text>
        <View style={styles.card}>
          {(['asubuhi', 'jioni'] as SessionId[]).map((session, i) => (
            <View key={session}>
              {i > 0 && <View style={styles.divider} />}
              <View style={styles.switchRow}>
                <Text style={styles.rowLabel}>Kikumbusho cha {SESSION_LABEL[session]}</Text>
                <Switch
                  value={prefs.reminders[session].enabled}
                  onValueChange={(value) => toggleReminder(session, value)}
                  trackColor={{ true: colors.teal, false: colors.line }}
                  accessibilityLabel={`Kikumbusho cha ${SESSION_LABEL[session]}`}
                />
              </View>
              {prefs.reminders[session].enabled && (
                <Pressable
                  onPress={() => setPickerFor(session)}
                  style={styles.timeButton}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Badilisha muda wa kikumbusho cha ${SESSION_LABEL[session]}, sasa ${formatTime(prefs.reminders[session].hour, prefs.reminders[session].minute)}`}
                >
                  <Text style={styles.timeButtonText}>
                    Muda: {formatTime(prefs.reminders[session].hour, prefs.reminders[session].minute)}
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
          <Text style={styles.helperText}>
            Vikumbusho ni vya hiari na haviashirii wakati kamili wa faradhi — daima rejea saa za sala za eneo lako.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Data</Text>
        <View style={styles.card}>
          <Pressable
            onPress={handleResetData}
            style={styles.resetButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Weka Upya Data Yote"
          >
            <Text style={styles.resetText}>Weka Upya Data Yote</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Kuhusu Chanzo</Text>
        <View style={styles.card}>
          <Text style={styles.aboutText}>
            Tafsiri za maana zilizomo humu ni ufafanuzi wa lugha rahisi, si tafsiri kamili ya kitaalamu (tafsir).
            Daraja za hadithi (kama ṣaḥīḥ au ḥasan) zinafuata kazi za Sheikh Muhammad Nāṣiruddīn al-Albānī —
            hasa Ṣaḥīḥ al-Jāmi' aṣ-Ṣaghīr, Ṣaḥīḥ at-Targhīb wat-Tarhīb, na Ṣaḥīḥ Sunan at-Tirmidhī — isipokuwa
            pale mwanachuoni mwingine anapotajwa waziwazi. Kwa maelezo zaidi ya kina, wasiliana na mwalimu au
            mwanachuoni mwenye ujuzi.
          </Text>
          <Text style={[styles.aboutText, styles.aboutTextSpaced]}>
            Programu hii haikusanyi wala kutuma taarifa zako popote — data yote (maendeleo, mipangilio) inabaki
            kwenye kifaa chako pekee.
          </Text>
        </View>
      </ScrollView>

      {pickerFor && (
        <DateTimePicker
          value={(() => {
            const d = new Date();
            d.setHours(prefs.reminders[pickerFor].hour, prefs.reminders[pickerFor].minute, 0, 0);
            return d;
          })()}
          mode="time"
          is24Hour
          display="default"
          onChange={onPickTime}
        />
      )}
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
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.teal,
    marginBottom: 8,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 18,
  },
  rowLabel: {
    fontFamily: fonts.uiMedium,
    fontSize: 15,
    color: colors.ink,
    marginBottom: 10,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.paper,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 9,
    alignItems: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.teal,
  },
  segmentText: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    color: colors.inkSoft,
  },
  segmentTextActive: {
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  timeButtonText: {
    fontFamily: fonts.uiMedium,
    fontSize: 13,
    color: colors.teal,
  },
  helperText: {
    fontFamily: fonts.meaningItalic,
    fontSize: 12,
    lineHeight: 18,
    color: colors.inkSoft,
    marginTop: 16,
  },
  resetButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  resetText: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 15,
    color: '#b3413c',
    textAlign: 'center',
  },
  aboutText: {
    fontFamily: fonts.meaning,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkSoft,
  },
  aboutTextSpaced: {
    marginTop: 14,
  },
});

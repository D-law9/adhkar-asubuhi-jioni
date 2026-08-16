import { ClosingContent, SessionId } from '../types/dhikr';

// Closing dua (Kaffārat al-Majlis) shared by both sessions, per spec section 5/6
// ("reuse the same closing screen content as the morning session").
const closingDua = {
  arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
  translit: "Subḥānaka Allāhumma wa biḥamdik, ash-hadu an lā ilāha illā ant, astaghfiruka wa atūbu ilayk.",
  meaning:
    'Umetakasika Ewe Allah, na sifa njema ni Zako. Nashuhudia hakuna mola apasaye kuabudiwa kwa haki ila Wewe. Nakuomba msamaha na natubu Kwako.',
};

const messageLinesBySession: Record<SessionId, string[]> = {
  asubuhi: [
    'Umeanza siku yako ukiwa umejikinga kwa maneno ya Mtume ﷺ.',
    'Hifadhi hii inadumu — Allah anakulinda hadi jioni, kwa idhini Yake.',
    'Endelea na siku yako ukiwa na dhikri hii moyoni.',
  ],
  jioni: [
    'Umeifunga siku yako ukiwa umejikinga kwa maneno ya Mtume ﷺ.',
    'Hifadhi hii inadumu — Allah anakulinda hadi asubuhi, kwa idhini Yake.',
    'Lala ukiwa na amani, ukiwa umemkumbuka Allah.',
  ],
};

export function getClosingContent(session: SessionId): ClosingContent {
  return {
    title: session === 'asubuhi' ? 'Umemaliza Adhkār za Asubuhi' : 'Umemaliza Adhkār za Jioni',
    dua: closingDua,
    messageLines: messageLinesBySession[session],
    sourceCitation: 'At-Tirmidhī 3433; graded ṣaḥīḥ by Al-Albani.',
  };
}

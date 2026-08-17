import { DhikrItem } from '../types/dhikr';

// Āyat al-Kursī and the Three Quls open both sessions (spec section 5 & 6).
// Text is identical morning/evening; only the benefit note differs, so each
// session builds its own copy via these factories rather than duplicating
// the Arabic/translit/meaning blocks.

export function ayatAlKursi(variant: 'asubuhi' | 'jioni'): DhikrItem {
  const sharedBenefit =
    "\"Aliyesoma Āyat al-Kursī mwishoni mwa kila swala ya faradhi, hakuna kinachomzuia kuingia Peponi isipokuwa kufa.\" — Imepokewa na An-Nasā'ī na Ibn Ḥibbān (wakaisahihisha); Sheikh Al-Albani ameisahihisha katika Ṣaḥīḥ al-Jāmi' (Na. 6464) na Ṣaḥīḥ at-Targhīb.";
  const bedtimeBenefit =
    'Ukienda kulala, soma Āyat al-Kursī: utaendelea kuwa na mlinzi kutoka kwa Allah, wala shetani hatakukaribia mpaka asubuhi. — Ṣaḥīḥ al-Bukhārī (Kitāb al-Wakālah), ḥadīthi ya Abū Hurayrah.';

  return {
    id: `${variant}-01-ayat-al-kursi`,
    arabic:
      'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    translit:
      "Allāhu lā ilāha illā Huwa, al-Ḥayyul-Qayyūm, lā ta'khudhuhū sinatun wa lā nawm, lahū mā fis-samāwāti wa mā fil-arḍ, man dhal-ladhī yashfa'u 'indahū illā bi-idhnih, ya'lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bishay'in min 'ilmihī illā bimā shā', wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa Huwal-'Aliyyul-'Aẓīm.",
    count: 1,
    sourceCitation:
      "An-Nasā'ī, 'Amal al-Yawm wal-Laylah; graded ṣaḥīḥ by Al-Albani.",
    sw: {
      title: 'Āyat al-Kursī',
      meaning:
        'Allah — hakuna Mungu ila Yeye, Aliye Hai, Msimamizi wa kila kitu. Hashikwi na usingizi wala kulala. Ni vyake vyote vilivyomo mbinguni na duniani. Ni nani awezaye kuombea mbele Yake bila ruhusa Yake? Anajua yaliyo mbele yao na yaliyo nyuma yao, wala hawawezi kujua chochote katika ujuzi Wake isipokuwa apendavyo. Kiti Chake cha Enzi kimeenea mbinguni na duniani, wala haumchoshi kuvihifadhi. Naye ndiye Aliye Juu, Mkuu.',
      benefit:
        variant === 'jioni'
          ? `${sharedBenefit}\n\n${bedtimeBenefit}`
          : sharedBenefit,
    },
  };
}

const sharedQulBenefit =
  "Soma Qul Huwallāhu Aḥad na al-Mu'awwidhatayn (al-Falaq na an-Nās) mara tatu kila asubuhi na jioni; zitakutosha dhidi ya kila kitu. — Abū Dāwūd (5082), at-Tirmidhī (3575, aliyeiita Ḥasan Ṣaḥīḥ Gharīb); Imam an-Nawawi na Sheikh Al-Albani (katika Ṣaḥīḥ at-Tirmidhī) wameisahihisha.";

export function suratAlIkhlas(variant: 'asubuhi' | 'jioni'): DhikrItem {
  return {
    id: `${variant}-02-al-ikhlas`,
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾',
    translit:
      "Bismillāhir-Raḥmānir-Raḥīm. Qul huwallāhu aḥad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul-lahū kufuwan aḥad.",
    count: 3,
    sourceCitation: 'Abū Dāwūd 5082; at-Tirmidhī 3575.',
    sw: {
      title: 'Sūrat al-Ikhlāṣ',
      meaning:
        'Sema: Yeye Allah ni Mmoja. Allah ni Wa Kutegemewa (kila kitu kinamhitaji, Yeye hahitaji kitu). Hakuzaa wala hakuzaliwa. Wala hakuna yeyote sawa Naye.',
      benefit: sharedQulBenefit,
    },
  };
}

export function suratAlFalaq(variant: 'asubuhi' | 'jioni'): DhikrItem {
  return {
    id: `${variant}-03-al-falaq`,
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِنْ شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾',
    translit:
      "Bismillāhir-Raḥmānir-Raḥīm. Qul a'ūdhu birabbil-falaq. Min sharri mā khalaq. Wa min sharri ghāsiqin idhā waqab. Wa min sharrin-naffāthāti fil-'uqad. Wa min sharri ḥāsidin idhā ḥasad.",
    count: 3,
    sourceCitation: 'Abū Dāwūd 5082; at-Tirmidhī 3575.',
    sw: {
      title: 'Sūrat al-Falaq',
      meaning:
        "Sema: Najikinga kwa Mola wa mapambazuko. Na shari ya alichokiumba. Na shari ya giza la usiku linapoingia. Na shari ya wanaopuliza vifundo. Na shari ya mwenye husuda anapohusudu.",
      benefit: sharedQulBenefit,
    },
  };
}

export function suratAnNas(variant: 'asubuhi' | 'jioni'): DhikrItem {
  return {
    id: `${variant}-04-an-nas`,
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾',
    translit:
      "Bismillāhir-Raḥmānir-Raḥīm. Qul a'ūdhu birabbin-nās. Malikin-nās. Ilāhin-nās. Min sharril-waswāsil-khannās. Alladhī yuwaswisu fī ṣudūrin-nās. Minal-jinnati wan-nās.",
    count: 3,
    sourceCitation: 'Abū Dāwūd 5082; at-Tirmidhī 3575.',
    sw: {
      title: 'Sūrat an-Nās',
      meaning:
        "Sema: Najikinga kwa Mola wa watu. Mfalme wa watu. Mungu wa watu. Kutokana na shari ya mnong'onezaji anayejificha, anayenong'oneza vifuani mwa watu, kutokana na majini na watu.",
      benefit: sharedQulBenefit,
    },
  };
}

export function threeQuls(variant: 'asubuhi' | 'jioni'): DhikrItem[] {
  return [suratAlIkhlas(variant), suratAlFalaq(variant), suratAnNas(variant)];
}

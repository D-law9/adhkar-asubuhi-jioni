import { DhikrItem } from '../types/dhikr';
import { ayatAlKursi, threeQuls } from './quran';

// Adhkār za Jioni. Order per spec section 6: Āyat al-Kursī (bedtime variant)
// and the three Quls open the session, then the remaining evening duas.
// Items 6-12 and 15-18 are textually identical to the morning list (the
// narrations use the same wording for both sessions) and are reused verbatim.
// Tasbīḥ ya Juwayriyah and the Elimu/Riziki/Matendo dua are morning-only per
// spec and are intentionally not duplicated here.

const duas: DhikrItem[] = [
  {
    id: 'jioni-05-sayyid-al-istighfar',
    arabic:
      'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    translit:
      "Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa anā 'abduk, wa anā 'alā 'ahdika wa wa'dika mastaṭa't, a'ūdhu bika min sharri mā ṣana't, abū'u laka bini'matika 'alayya, wa abū'u bidhanbī faghfir lī fa'innahū lā yaghfirudh-dhunūba illā ant.",
    count: 1,
    sourceCitation: 'Ṣaḥīḥ al-Bukhārī 6306.',
    sw: {
      title: 'Sayyid al-Istighfār',
      meaning:
        'Ewe Allah, Wewe ni Mola wangu, hakuna mola apasaye kuabudiwa kwa haki ila Wewe. Umeniumba na mimi ni mja Wako, na niko katika ahadi Yako na miadi Yako kwa kadiri niwezavyo. Najikinga kwako na shari ya niliyoyatenda. Nakiri kwako neema Zako juu yangu, na nakiri dhambi zangu, basi nisamehe, kwani hakuna asamehaye dhambi ila Wewe.',
      benefit:
        'Atakayeisema jioni akiwa na yakini nayo, kisha akafa usiku huo, atakuwa miongoni mwa watu wa Peponi. — Ṣaḥīḥ al-Bukhārī (6306).',
    },
  },
  {
    id: 'jioni-06-kuanza-jioni',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    translit: 'Allāhumma bika amsaynā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūtu, wa ilaykal-maṣīr.',
    count: 1,
    sourceCitation: 'At-Tirmidhī 3391 (evening form); graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: 'Dua ya Kuanza Jioni',
      meaning:
        'Ewe Allah, kwa uwezo Wako tumeifikia jioni, kwa uwezo Wako tunaifikia asubuhi, kwa uwezo Wako tunaishi na tunakufa, na Kwako ndiko marejeo.',
      benefit: 'Mtume ﷺ alikuwa akiisema kila jioni. — At-Tirmidhī (3391).',
    },
  },
  {
    id: 'jioni-07-ufalme-ni-wa-allah',
    arabic:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    translit:
      "Amsaynā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr. Rabbi as'aluka khayra mā fī hādhihil-laylati wa khayra mā ba'dahā, wa a'ūdhu bika min sharri mā fī hādhihil-laylati wa sharri mā ba'dahā. Rabbi a'ūdhu bika minal-kasali wa sū'il-kibar, Rabbi a'ūdhu bika min 'adhābin fin-nāri wa 'adhābin fil-qabr.",
    count: 1,
    sourceCitation: 'Ṣaḥīḥ Muslim 2723 (evening form).',
    sw: {
      title: 'Jioni Imefika, Ufalme ni wa Allah',
      meaning:
        'Tumeifikia jioni, na ufalme ni wa Allah, sifa njema zote ni za Allah. Hakuna mola apasaye kuabudiwa kwa haki ila Allah, Peke Yake, hana mshirika. Ufalme ni wake na sifa njema ni zake, na Yeye ni Muweza wa kila kitu. Mola wangu, nakuomba kheri ya usiku huu na kheri ya baada yake, na najikinga kwako na shari ya usiku huu na shari ya baada yake. Mola wangu, najikinga kwako na uvivu na uzee mbaya. Mola wangu, najikinga kwako na adhabu ya Motoni na adhabu ya kaburini.',
      benefit:
        'Mtume ﷺ alifundisha dua hii kwa masahaba wake ili waiseme kila jioni. — Ṣaḥīḥ Muslim (2723).',
    },
  },
  {
    id: 'jioni-08-kumshuhudisha-allah',
    arabic:
      'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    translit:
      "Allāhumma innī amsaytu ush-hiduk, wa ush-hidu ḥamalata 'arshik, wa malā'ikatak, wa jamī'a khalqik, annaka antallāhu lā ilāha illā anta waḥdaka lā sharīka lak, wa anna Muḥammadan 'abduka wa rasūluk.",
    count: 4,
    sourceCitation: 'Abū Dāwūd 5069 (evening form); graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: 'Kumshuhudisha Allah na Viumbe Vyake',
      meaning:
        'Ewe Allah, hakika mimi nimeifikia jioni nikikushuhudisha Wewe, na nawashuhudisha wabeba Kiti chako cha Enzi, na Malaika Wako, na viumbe Vyako vyote, kwamba Wewe ndiwe Allah, hakuna mola apasaye kuabudiwa kwa haki ila Wewe Peke Yako, hauna mshirika, na kwamba Muhammad ni mja Wako na Mtume Wako.',
      benefit:
        'Yeyote atakayesema hivyo mara nne jioni, Allah atamwokoa robo yake na Motoni. Na atakayesema mara nane, Allah atamwokoa yote na Motoni. — Abū Dāwūd (5069).',
    },
  },
  {
    id: 'jioni-09-kumshukuru-kwa-neema',
    arabic: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
    translit:
      "Allāhumma mā amsā bī min ni'matin aw bi'aḥadin min khalqik, faminka waḥdaka lā sharīka lak, falakal-ḥamdu wa lakash-shukr.",
    count: 1,
    sourceCitation: 'Abū Dāwūd 5073 (evening form); graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: 'Kumshukuru Allah kwa Neema',
      meaning:
        'Ewe Allah, kila neema niliyoifikia nayo jioni hii, au mtu yeyote katika viumbe Vyako, basi imetoka Kwako Peke Yako, hauna mshirika. Basi sifa njema ni Zako na shukrani ni Zako.',
      benefit:
        'Atakayeisema jioni, atakuwa amemtekelezea Allah shukrani ya usiku huo. — Abū Dāwūd (5073).',
    },
  },
  {
    id: 'jioni-10-afya-mwili-kusikia-kuona',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ',
    translit: "Allāhumma 'āfinī fī badanī, Allāhumma 'āfinī fī sam'ī, Allāhumma 'āfinī fī baṣarī, lā ilāha illā ant.",
    count: 3,
    sourceCitation: 'Abū Dāwūd 5090; graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: 'Kuomba Afya ya Mwili, Kusikia na Kuona',
      meaning:
        'Ewe Allah, nipe afya mwilini mwangu. Ewe Allah, nipe afya katika kusikia kwangu. Ewe Allah, nipe afya katika kuona kwangu. Hakuna mola apasaye kuabudiwa kwa haki ila Wewe.',
      benefit:
        'Mtume ﷺ hakuacha kusema dua hizi kila asubuhi na jioni. — Abū Dāwūd (5090).',
    },
  },
  {
    id: 'jioni-11-hasbiyallah',
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    translit: "Ḥasbiyallāhu lā ilāha illā Huwa, 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Aẓīm.",
    count: 7,
    sourceCitation: 'Abū Dāwūd 5081; graded ḥasan by Al-Albani.',
    sw: {
      title: 'Allah Ananitosha',
      meaning:
        'Allah ananitosha, hakuna mola apasaye kuabudiwa kwa haki ila Yeye. Namtegemea Yeye, naye ni Mola wa Kiti cha Enzi kikubwa.',
      benefit:
        'Atakayeisema mara saba asubuhi na jioni, Allah atamtosheleza katika kila alichokihuzunikia, la dunia au la akhera. — Abū Dāwūd (5081).',
    },
  },
  {
    id: 'jioni-12-afwa-na-afiyah',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    translit:
      "Allāhumma innī as'alukal-'afwa wal-'āfiyata fid-dunyā wal-ākhirah, Allāhumma innī as'alukal-'afwa wal-'āfiyata fī dīnī wa dunyāya wa ahlī wa mālī, Allāhummastur 'awrātī wa āmin raw'ātī, Allāhummaḥfaẓnī min bayni yadayya wa min khalfī, wa 'an yamīnī wa 'an shimālī, wa min fawqī, wa a'ūdhu bi'aẓamatika an ughtāla min taḥtī.",
    count: 1,
    sourceCitation: 'Abū Dāwūd 5074; Ibn Mājah 3871; graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: "Kuomba Msamaha na 'Āfiyah",
      meaning:
        'Ewe Allah, nakuomba msamaha na afya njema katika dunia na akhera. Ewe Allah, nakuomba msamaha na afya njema katika dini yangu, dunia yangu, familia yangu na mali yangu. Ewe Allah, sitiri aibu zangu na nitulize hofu zangu. Ewe Allah, nilinde mbele yangu, nyuma yangu, kuliani kwangu, kushotoni kwangu, na juu yangu, na najikinga kwa Ukuu Wako nisije nikanyakuliwa kutoka chini yangu.',
      benefit:
        "Ni miongoni mwa dua alizokuwa akiziomba Mtume ﷺ kila asubuhi na jioni, isipokuwa hakuwa akiziacha. — Abū Dāwūd (5074), Ibn Mājah (3871).",
    },
  },
  {
    id: 'jioni-13-ubaya-nafsi-shaytani',
    arabic:
      'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
    translit:
      "Allāhumma 'Ālimal-ghaybi wash-shahādah, Fāṭiras-samāwāti wal-arḍ, Rabba kulli shay'in wa malīkah, ash-hadu an lā ilāha illā ant, a'ūdhu bika min sharri nafsī wa min sharrish-shayṭāni wa shirkih, wa an aqtarifa 'alā nafsī sū'an aw ajurrahū ilā muslim.",
    count: 1,
    sourceCitation: 'At-Tirmidhī 3529; graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: 'Kujikinga na Ubaya wa Nafsi na Shaytani',
      meaning:
        'Ewe Allah, Mjuzi wa siri na dhahiri, Muumba wa mbingu na ardhi, Mola na Mmiliki wa kila kitu, nashuhudia hakuna mola apasaye kuabudiwa kwa haki ila Wewe. Najikinga kwako na shari ya nafsi yangu, na shari ya shetani na ushirikina wake, na nisije nikajipatia mimi mwenyewe ubaya au nikamletea Muislamu mwenzangu.',
      benefit:
        'Mtume ﷺ alimwambia Abū Bakr aiseme asubuhi, jioni, na anapotaka kulala. — At-Tirmidhī (3529).',
    },
  },
  {
    id: 'jioni-14-bismillah-ulinzi',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    translit: "Bismillāhil-ladhī lā yaḍurru ma'as-mihī shay'un fil-arḍi wa lā fis-samā'i wa Huwas-Samī'ul-'Alīm.",
    count: 3,
    sourceCitation: 'Abū Dāwūd 5088; at-Tirmidhī 3388; graded ṣaḥīḥ by Al-Albani.',
    sw: {
      title: 'Bismillah — Dua ya Ulinzi',
      meaning:
        'Kwa jina la Allah ambaye pamoja na jina Lake hakuna kitu chochote kiwezacho kudhuru, ardhini wala mbinguni, naye ni Mwenye kusikia, Mwenye kujua.',
      benefit:
        'Atakayeisema mara tatu kila asubuhi na jioni, hakuna kitakachomdhuru. — Abū Dāwūd (5088), at-Tirmidhī (3388).',
    },
  },
  {
    id: 'jioni-15-nimeridhika',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    translit: "Raḍītu billāhi rabbā, wa bil-Islāmi dīnā, wa bi-Muḥammadin ṣallallāhu 'alayhi wa sallama nabiyyā.",
    count: 3,
    sourceCitation: 'Aḥmad 15816; at-Tirmidhī 3389; graded ḥasan by Al-Albani.',
    sw: {
      title: 'Nimeridhika na Allah, Uislamu na Muhammad ﷺ',
      meaning:
        'Nimeridhika Allah kuwa ni Mola wangu, na Uislamu kuwa ni Dini yangu, na Muhammad ﷺ kuwa ni Mtume wangu.',
      benefit:
        'Atakayeisema mara tatu kila asubuhi na jioni, ni haki juu ya Allah kumridhisha Siku ya Kiyama. — Aḥmad (15816); at-Tirmidhī (3389).',
    },
  },
  {
    id: 'jioni-16-ya-hayyu-ya-qayyum',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    translit: "Yā Ḥayyu yā Qayyūmu, biraḥmatika astaghīth, aṣliḥ lī sha'nī kullah, wa lā takilnī ilā nafsī ṭarfata 'ayn.",
    count: 1,
    sourceCitation: "An-Nasā'ī, 'Amal al-Yawm wal-Laylah; Al-Ḥākim; graded ḥasan by Al-Albani.",
    sw: {
      title: 'Ya Ḥayyu Ya Qayyūm',
      meaning:
        'Ewe Aliye Hai, Ewe Msimamizi wa kila kitu, kwa rehema Yako naomba msaada. Nirekebishie mambo yangu yote, wala usiniachie nafsi yangu hata kwa kupepesa jicho.',
      benefit:
        "Dua ya kuomba Allah kuwa msimamizi wa mambo yote ya mja, ipendekezwayo asubuhi na jioni. — An-Nasā'ī, 'Amal al-Yawm wal-Laylah.",
    },
  },
  {
    id: 'jioni-17-kheri-ya-usiku',
    arabic:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ: فَتْحَهَا وَنَصْرَهَا وَنُورَهَا وَبَرَكَتَهَا وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا',
    translit:
      "Amsaynā wa amsal-mulku lillāhi Rabbil-'ālamīn, Allāhumma innī as'aluka khayra hādhihil-laylah: fatḥahā wa naṣrahā wa nūrahā wa barakatahā wa hudāhā, wa a'ūdhu bika min sharri mā fīhā wa sharri mā ba'dahā.",
    count: 1,
    sourceCitation: 'Abū Dāwūd 5084 (evening form); graded ḥasan by Al-Albani.',
    sw: {
      title: 'Kuomba Kheri ya Usiku',
      meaning:
        'Tumeifikia jioni, na ufalme ni wa Allah, Mola wa walimwengu wote. Ewe Allah, nakuomba kheri ya usiku huu: ufunguzi wake, msaada wake, nuru yake, baraka zake na uongofu wake, na najikinga kwako na shari iliyomo humo na shari ya baada yake.',
      benefit:
        "Sehemu ya dua ndefu iliyopokewa kutoka kwa Abdullāh bin Mas'ūd (Allah amuwiye radhi). — Abū Dāwūd (5084).",
    },
  },
  {
    id: 'jioni-18-fitrah-ya-uislamu',
    arabic:
      'أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    translit:
      "Amsaynā 'alā fiṭratil-Islām, wa 'alā kalimatil-ikhlāṣ, wa 'alā dīni Nabiyyinā Muḥammadin ṣallallāhu 'alayhi wa sallam, wa 'alā millati abīnā Ibrāhīma ḥanīfan musliman wa mā kāna minal-mushrikīn.",
    count: 1,
    sourceCitation: 'Aḥmad 15367 (evening form); graded ḥasan by Al-Albani.',
    sw: {
      title: 'Kuumaliza Siku Juu ya Uislamu',
      meaning:
        'Tumeifikia jioni tukiwa juu ya maumbile ya Uislamu, na juu ya neno la ikhlasi, na juu ya dini ya Nabii wetu Muhammad ﷺ, na juu ya mila ya baba yetu Ibrahim, mnyoofu, Muislamu, wala hakuwa miongoni mwa washirikina.',
      benefit: 'Imepokewa kutoka kwa hadithi ya Abū Hurayrah. — Aḥmad (15367).',
    },
  },
  {
    id: 'jioni-19-subhanallahi-wa-bihamdih',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translit: 'Subḥānallāhi wa biḥamdih.',
    count: 100,
    sourceCitation: 'Ṣaḥīḥ al-Bukhārī 6405; Muslim 2691.',
    sw: {
      title: 'Subḥānallāhi wa Biḥamdih',
      meaning: 'Ametakasika Allah, na sifa njema zote ni Zake.',
      benefit:
        'Atakayeisema mara mia moja kwa siku, dhambi zake zitafutwa hata kama ni nyingi kama povu la bahari. — Ṣaḥīḥ al-Bukhārī (6405), Muslim (2691).',
    },
  },
  {
    id: 'jioni-20-la-ilaha-illallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    translit: "Lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa Huwa 'alā kulli shay'in qadīr.",
    count: null,
    openEndedLabel: 'kadiri uwezavyo',
    sourceCitation: 'Ṣaḥīḥ al-Bukhārī 6403; Muslim 2693.',
    sw: {
      title: 'Lā Ilāha Illallāh',
      meaning:
        'Hakuna mola apasaye kuabudiwa kwa haki ila Allah, Peke Yake, hana mshirika. Ufalme ni Wake na sifa njema ni Zake, naye ni Muweza wa kila kitu.',
      benefit:
        'Atakayeisema mara kumi ana thawabu sawa na kuacha huru watumwa wanne katika kizazi cha Ismā‘īl. — Ṣaḥīḥ al-Bukhārī (6403), Muslim (2693).',
    },
  },
  {
    id: 'jioni-21-istighfar',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    translit: 'Astaghfirullāha wa atūbu ilayh.',
    count: null,
    openEndedLabel: 'mara nyingi',
    sourceCitation: 'Ṣaḥīḥ al-Bukhārī 6307.',
    sw: {
      title: 'Istighfār',
      meaning: 'Namuomba Allah msamaha na natubu Kwake.',
      benefit:
        'Naapa kwa Allah, hakika mimi namuomba Allah msamaha na kutubu Kwake zaidi ya mara sabini kwa siku. — Ṣaḥīḥ al-Bukhārī (6307).',
    },
  },
  {
    id: 'jioni-22-salawat',
    arabic:
      'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    translit:
      "Allāhumma ṣalli 'alā Muḥammadin wa 'alā āli Muḥammad, kamā ṣallayta 'alā Ibrāhīma wa 'alā āli Ibrāhīm, innaka Ḥamīdun Majīd.",
    count: null,
    openEndedLabel: 'kadiri uwezavyo',
    sourceCitation: 'Ṣaḥīḥ Muslim 384.',
    sw: {
      title: 'Ṣalāh na Salām kwa Mtume ﷺ',
      meaning:
        'Ewe Allah, mrehemu Muhammad na jamaa zake, kama ulivyomrehemu Ibrahim na jamaa zake. Hakika Wewe ni Msifiwa, Mtukufu.',
      benefit:
        'Atakayenitakia rehema mara moja, Allah atamrehemu mara kumi. — Ṣaḥīḥ Muslim (384).',
    },
  },
];

export const eveningAdhkar: DhikrItem[] = [
  ayatAlKursi('jioni'),
  ...threeQuls('jioni'),
  ...duas,
];

/**
 * AgriSmart - Frontend Application Logic
 * Solving: Scattered advice, Language barriers, High input costs
 */

// Multilingual Translations Dictionary
const translations = {
  en: {
    header_subtitle: "Unifying advice, breaking language barriers & cutting input costs",
    audio_assist: "Voice Assist",
    pillar1_title: "No More Scattered Advice",
    pillar1_desc: "One verified calendar from seed to harvest",
    pillar2_title: "Zero Language Barriers",
    pillar2_desc: "Instant translation & full audio voice narration",
    pillar3_title: "Cut Input Costs 60-80%",
    pillar3_desc: "DIY bio-fertilizers, tool sharing & bulk buying",
    tab_advisory: "Crop Advisory",
    tab_doctor: "Crop Doctor",
    tab_calc: "Cost Calculator",
    tab_recipes: "DIY Bio-Inputs",
    tab_tools: "Tool Sharing",
    tab_bulk: "Bulk Buying Pool",
    advisory_heading: "Step-by-Step Crop Lifecycle Guides",
    advisory_sub: "Structured guidance for first-time farmers: avoid conflicting tips and know exactly what to do at each stage.",
    filter_category: "Category:",
    doctor_heading: "Crop Doctor & Diagnostic Guide",
    doctor_sub: "Identify leaf diseases and pests quickly. Prioritizes natural and low-cost remedies over expensive chemicals.",
    select_crop: "Select Crop:",
    enter_symptoms: "Describe Symptoms or Plant Parts:",
    diagnose_btn: "🔍 Diagnose",
    calc_heading: "Farm Input & Cost Optimizer",
    calc_sub: "Smallholder farmers frequently overspend on seeds and synthetic fertilizers. Calculate precise quantities and see your savings.",
    enter_plot_details: "Enter Plot Details",
    land_size: "Land Area (in Acres)",
    acre_helper: "1 Acre ≈ 0.4 Hectare ≈ 8 Kanals / 40 Guntas",
    calc_action_btn: "⚡ Optimize My Input Costs",
    ready_to_calculate: "Ready to calculate!",
    calc_hint: "Select your crop and land size above to see exact seed rates, chemical costs vs DIY organic alternatives, and net money saved.",
    recipes_heading: "DIY Bio-Inputs: High Savings Recipes",
    recipes_sub: "Replace costly chemical bags with farm-made organic inputs that cost up to 90% less and replenish soil ecology.",
    equipment_heading: "Neighbor Tool & Machine Sharing",
    equipment_sub: "Don't buy expensive tractors or power sprayers. Rent or borrow from fellow smallholder farmers at low hourly rates.",
    list_tool_btn: "➕ List My Equipment",
    bulk_heading: "Collective Group Purchasing Circles",
    bulk_sub: "Single smallholders pay high retail markups. Pool your seed and fertilizer orders with nearby farmers for wholesale discounts (25-40%).",
    read_advice: "🔊 Read Aloud",
    rent_contact: "📞 Call Owner",
    join_circle: "🤝 Join Bulk Order"
  },
  hi: {
    header_subtitle: "बिखरी सलाह को एक करना, भाषा की बाधा हटाना और खेती की लागत घटाना",
    audio_assist: "बोलकर सुनाएं",
    pillar1_title: "सटीक और पक्की सलाह",
    pillar1_desc: "बुवाई से लेकर कटाई तक एक संपूर्ण और सही कैलेंडर",
    pillar2_title: "मातृभाषा में आसान समाधान",
    pillar2_desc: "अपनी भाषा में पढ़ें और आवाज़ में सलाह सुनें",
    pillar3_title: "लागत में 60-80% की भारी बचत",
    pillar3_desc: "घर पर जैविक खाद, औजार साझेदारी और सामूहिक खरीद",
    tab_advisory: "फसल सलाह",
    tab_doctor: "फसल डॉक्टर",
    tab_calc: "लागत कैलकुलेटर",
    tab_recipes: "जैविक खाद नुस्खे",
    tab_tools: "कृषि यंत्र साझा करें",
    tab_bulk: "सामूहिक खरीद",
    advisory_heading: "फसल अनुसार संपूर्ण कृषि मार्गदर्शिका",
    advisory_sub: "नए किसान भाइयों के लिए: इधर-उधर की भ्रामक सलाह से बचें, सही समय पर सही कार्य करें।",
    filter_category: "श्रेणी:",
    doctor_heading: "फसल डॉक्टर एवं रोग निदान",
    doctor_sub: "पत्तियों और कीटों के लक्षण पहचानें। महंगे रसायनों की जगह सस्ते जैविक उपचार अपनाएं।",
    select_crop: "फसल चुनें:",
    enter_symptoms: "लक्षण लिखें (उदा. पीली पत्तियां, छेद, सुंडी):",
    diagnose_btn: "🔍 रोग पहचानें",
    calc_heading: "बीज व खाद लागत कैलकुलेटर",
    calc_sub: "छोटे किसान अक्सर जरूरत से ज्यादा बीज व रासायनिक खाद खरीदकर नुकसान उठाते हैं। सटीक गणना करें।",
    enter_plot_details: "जमीन का विवरण",
    land_size: "जमीन का रकबा (एकड़ में)",
    acre_helper: "1 एकड़ ≈ 0.4 हेक्टेयर ≈ 8 कनाल / 40 गुंठा",
    calc_action_btn: "⚡ लागत बचत देखें",
    ready_to_calculate: "गणना करने के लिए तैयार!",
    calc_hint: "फसल और रकबा दर्ज करें और देखें कि जैविक तरीके से आपके कितने पैसे बचेंगे।",
    recipes_heading: "घर पर बनाएं सस्ती जैविक खाद व कीटनाशक",
    recipes_sub: "जीवामृत, नीमास्त्र और छाछ स्प्रे बनाकर रासायनिक खाद पर होने वाला खर्च 90% तक घटाएं।",
    equipment_heading: "ट्रैक्टर व कृषि उपकरण साझेदारी",
    equipment_sub: "महंगा ट्रैक्टर खरीदने की जरूरत नहीं! पड़ोसी किसानों से सस्ते प्रति घंटे किराये पर लें।",
    list_tool_btn: "➕ अपना यंत्र दर्ज करें",
    bulk_heading: "किसानों की सामूहिक थोक खरीद",
    bulk_sub: "अकेले खरीदने पर महंगा पड़ता है। साथी किसानों के साथ मिलकर थोक भाव में 25-40% छूट पाएं।",
    read_advice: "🔊 बोलकर सुनाएं",
    rent_contact: "📞 मालिक से संपर्क करें",
    join_circle: "🤝 ऑर्डर में शामिल हों"
  },
  es: {
    header_subtitle: "Unificando asesoría, superando barreras de idioma y reduciendo costos",
    audio_assist: "Asistente de Voz",
    pillar1_title: "Sin Consejos Dispersos",
    pillar1_desc: "Un calendario verificado desde la siembra hasta la cosecha",
    pillar2_title: "Cero Barreras de Idioma",
    pillar2_desc: "Traducción instantánea y narración de audio completa",
    pillar3_title: "Reduce Costos 60-80%",
    pillar3_desc: "Biofertilizantes caseros, herramientas compartidas y compras conjuntas",
    tab_advisory: "Asesoría de Cultivos",
    tab_doctor: "Doctor de Cultivos",
    tab_calc: "Calculadora de Costos",
    tab_recipes: "Bio-Insumos Caseros",
    tab_tools: "Compartir Maquinaria",
    tab_bulk: "Compras Grupales",
    advisory_heading: "Guías Paso a Paso para Agricultores",
    advisory_sub: "Guía clara para pequeños agricultores: evite consejos contradictorios.",
    filter_category: "Categoría:",
    doctor_heading: "Diagnóstico y Control de Plagas",
    doctor_sub: "Identifique enfermedades rápidamente con remedios naturales de bajo costo.",
    select_crop: "Seleccionar Cultivo:",
    enter_symptoms: "Describa los síntomas:",
    diagnose_btn: "🔍 Diagnosticar",
    calc_heading: "Optimizador de Insumos y Costos",
    calc_sub: "Calcule la cantidad exacta de semillas y fertilizantes necesarios.",
    enter_plot_details: "Detalles del Terreno",
    land_size: "Área de Terreno (Acres)",
    acre_helper: "1 Acre ≈ 0.4 Hectáreas",
    calc_action_btn: "⚡ Optimizar Costos",
    ready_to_calculate: "¡Listo para calcular!",
    calc_hint: "Seleccione cultivo y área para ver el ahorro con bioinsumos.",
    recipes_heading: "Bioinsumos Caseros: Máximo Ahorro",
    recipes_sub: "Reemplace químicos costosos con biofertilizantes hechos en su propia finca.",
    equipment_heading: "Alquiler y Préstamo de Maquinaria",
    equipment_sub: "Alquile tractores y fumigadoras de vecinos por hora a bajo costo.",
    list_tool_btn: "➕ Publicar Mi Equipo",
    bulk_heading: "Círculos de Compra Colectiva",
    bulk_sub: "Agrúpese con otros agricultores para obtener descuentos mayoristas.",
    read_advice: "🔊 Escuchar",
    rent_contact: "📞 Llamar",
    join_circle: "🤝 Unirse a Compra"
  },
  sw: {
    header_subtitle: "Kuunganisha ushauri, kuondoa vikwazo vya lugha na kupunguza gharama",
    audio_assist: "Sauti ya Ushauri",
    pillar1_title: "Ushauri wa Uhakika",
    pillar1_desc: "Ratiba moja kuanzia mbegu hadi mavuno",
    pillar2_title: "Hakuna Kikwazo cha Lugha",
    pillar2_desc: "Tafsiri ya papo hapo na usomaji wa sauti",
    pillar3_title: "Punguza Gharama kwa 60-80%",
    pillar3_desc: "Mbolea ya asili, kugawana mashine na ununuzi wa pamoja",
    tab_advisory: "Mwongozo wa Mazao",
    tab_doctor: "Daktari wa Mimea",
    tab_calc: "Kikokotoo cha Gharama",
    tab_recipes: "Mbolea za Kienyeji",
    tab_tools: "Kukodisha Zana",
    tab_bulk: "Ununuzi wa Pamoja",
    advisory_heading: "Mwongozo wa Hatua kwa Hatua wa Kilimo",
    advisory_sub: "Mwongozo kwa wakulima wapya: epuka ushauri unaopishana.",
    filter_category: "Aina ya Zao:",
    doctor_heading: "Utambuzi wa Wadudu na Magonjwa",
    doctor_sub: "Tambua magonjwa ya mimea haraka kwa kutumia tiba asilia za bei nafuu.",
    select_crop: "Chagua Zao:",
    enter_symptoms: "Eleza dalili za mmea:",
    diagnose_btn: "🔍 Chunguza Zao",
    calc_heading: "Kikokotoo cha Mbegu na Pembejeo",
    calc_sub: "Hesabu kiasi halisi cha mbegu na mbolea unazohitaji bila kupoteza fedha.",
    enter_plot_details: "Taarifa za Shamba",
    land_size: "Ukubwa wa Shamba (Ekari)",
    acre_helper: "Ekari 1 ≈ Hekta 0.4",
    calc_action_btn: "⚡ Kokotoa Gharama",
    ready_to_calculate: "Tayari kukokotoa!",
    calc_hint: "Weka zao na ukubwa wa shamba uone fedha utakazookoa.",
    recipes_heading: "Mbolea na Dawa za Asili za Kutengeneza Nyumbani",
    recipes_sub: "Okoa gharama kwa kutengeneza mbolea ya samadi na majani ya mwarobaini.",
    equipment_heading: "Ushirikiano wa Kukodisha Zana za Shambani",
    equipment_sub: "Usigharamike kununua trekta; kodisha kutoka kwa wakulima wenzako.",
    list_tool_btn: "➕ Weka Zana Yangu",
    bulk_heading: "Umoja wa Kununua Pembejeo kwa Pamoja",
    bulk_sub: "Ungana na wakulima wenzako kupata punguzo la bei ya jumla.",
    read_advice: "🔊 Sikiliza Sauti",
    rent_contact: "📞 Piga Simu",
    join_circle: "🤝 Jiunge na Kikundi"
  },
  pa: {
    header_subtitle: "ਸਹੀ ਸਲਾਹ, ਮਾਂ-ਬੋਲੀ ਵਿੱਚ ਜਾਣਕਾਰੀ ਅਤੇ ਖੇਤੀ ਖਰਚਿਆਂ ਵਿੱਚ ਵੱਡੀ ਕਟੌਤੀ",
    audio_assist: "ਆਵਾਜ਼ ਸੁਣੋ",
    pillar1_title: "ਇੱਕ ਥਾਂ ਪੱਕੀ ਸਲਾਹ",
    pillar1_desc: "ਬਿਜਾਈ ਤੋਂ ਵਾਢੀ ਤੱਕ ਸਹੀ ਕੈਲੰਡਰ",
    pillar2_title: "ਭਾਸ਼ਾ ਦੀ ਕੋਈ ਰੁਕਾਵਟ ਨਹੀਂ",
    pillar2_desc: "ਪੰਜਾਬੀ ਵਿੱਚ ਜਾਣਕਾਰੀ ਅਤੇ ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣਨ ਦੀ ਸਹੂਲਤ",
    pillar3_title: "ਖਰਚਿਆਂ 'ਚ 60-80% ਕਟੌਤੀ",
    pillar3_desc: "ਘਰੇਲੂ ਜੈਵਿਕ ਖਾਦ, ਸੰਦਾਂ ਦੀ ਸਾਂਝ ਅਤੇ ਸਾਂਝੀ ਖਰੀਦ",
    tab_advisory: "ਫਸਲ ਸਲਾਹ",
    tab_doctor: "ਫਸਲ ਡਾਕਟਰ",
    tab_calc: "ਲਾਗਤ ਕੈਲਕੁਲੇਟਰ",
    tab_recipes: "ਦੇਸੀ ਖਾਦ ਨੁਸਖੇ",
    tab_tools: "ਮਸ਼ੀਨਰੀ ਸਾਂਝ",
    tab_bulk: "ਸਾਂਝੀ ਖਰੀਦ",
    advisory_heading: "ਫਸਲਾਂ ਦਾ ਕਦਮ-ਦਰ-ਕਦਮ ਮਾਰਗਦਰਸ਼ਨ",
    advisory_sub: "ਨਵੇਂ ਕਿਸਾਨ ਵੀਰਾਂ ਲਈ: ਵੱਖ-ਵੱਖ ਭਰਮਾਊ ਸਲਾਹਾਂ ਤੋਂ ਬਚੋ ਅਤੇ ਸਹੀ ਕੰਮ ਕਰੋ।",
    filter_category: "ਸ਼੍ਰੇਣੀ:",
    doctor_heading: "ਫਸਲ ਡਾਕਟਰ ਅਤੇ ਬਿਮਾਰੀ ਜਾਂਚ",
    doctor_sub: "ਪੱਤਿਆਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਅਤੇ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਕਰਕੇ ਦੇਸੀ ਸਸਤਾ ਇਲਾਜ ਕਰੋ।",
    select_crop: "ਫਸਲ ਚੁਣੋ:",
    enter_symptoms: "ਲੱਛਣ ਲਿਖੋ (ਜਿਵੇਂ ਪੀਲੇ ਪੱਤੇ, ਸੁੰਡੀ):",
    diagnose_btn: "🔍 ਜਾਂਚ ਕਰੋ",
    calc_heading: "ਬੀਜ ਅਤੇ ਖਾਦ ਲਾਗਤ ਕੈਲਕੁਲੇਟਰ",
    calc_sub: "ਲੋੜ ਤੋਂ ਵੱਧ ਬੀਜ ਅਤੇ ਰਸਾਇਣਕ ਖਾਦ ਪਾ ਕੇ ਪੈਸੇ ਬਰਬਾਦ ਨਾ ਕਰੋ। ਸਹੀ ਮਾਤਰਾ ਜਾਣੋ।",
    enter_plot_details: "ਜ਼ਮੀਨ ਦਾ ਵੇਰਵਾ",
    land_size: "ਜ਼ਮੀਨ (ਏਕੜਾਂ ਵਿੱਚ)",
    acre_helper: "1 ਏਕੜ ≈ 8 ਕਨਾਲਾਂ",
    calc_action_btn: "⚡ ਬੱਚਤ ਦੇਖੋ",
    ready_to_calculate: "ਹਿਸਾਬ ਲਗਾਉਣ ਲਈ ਤਿਆਰ!",
    calc_hint: "ਫਸਲ ਅਤੇ ਜ਼ਮੀਨ ਚੁਣੋ ਅਤੇ ਜਾਣੋ ਕਿ ਤੁਹਾਡੇ ਕਿੰਨੇ ਪੈਸੇ ਬਚਣਗੇ।",
    recipes_heading: "ਘਰੇਲੂ ਦੇਸੀ ਖਾਦਾਂ ਅਤੇ ਕੀਟਨਾਸ਼ਕ",
    recipes_sub: "ਜੀਵਾਮ੍ਰਿਤ ਅਤੇ ਨਿੰਮ ਦੇ ਘੋਲ ਨਾਲ ਰਸਾਇਣਕ ਖਾਦਾਂ ਦਾ 90% ਖਰਚਾ ਬਚਾਓ।",
    equipment_heading: "ਸੰਦ ਅਤੇ ਮਸ਼ੀਨਰੀ ਸਾਂਝ",
    equipment_sub: "ਮਹਿੰਗੇ ਟਰੈਕਟਰ ਖਰੀਦਣ ਦੀ ਥਾਂ ਪਿੰਡ ਦੇ ਕਿਸਾਨਾਂ ਤੋਂ ਘੰਟਿਆਂ ਦੇ ਹਿਸਾਬ ਨਾਲ ਕਿਰਾਏ 'ਤੇ ਲਓ।",
    list_tool_btn: "➕ ਆਪਣਾ ਸੰਦ ਦਰਜ ਕਰੋ",
    bulk_heading: "ਕਿਸਾਨਾਂ ਦੀ ਸਾਂਝੀ ਥੋਕ ਖਰੀਦ",
    bulk_sub: "ਇਕੱਲੇ ਮਹਿੰਗਾ ਖਰੀਦਣ ਦੀ ਥਾਂ ਦੂਜੇ ਕਿਸਾਨਾਂ ਨਾਲ ਰਲ ਕੇ ਥੋਕ ਭਾਅ 25-40% ਛੋਟ ਲਵੋ।",
    read_advice: "🔊 ਸੁਣੋ",
    rent_contact: "📞 ਮਾਲਕ ਨੂੰ ਫ਼ੋਨ ਕਰੋ",
    join_circle: "🤝 ਆਰਡਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ"
  },
  mr: {
    header_subtitle: "विखुरलेला सल्ला एकत्रीकरण, भाषेची अडचण दूर करणे आणि उत्पादन खर्च कमी करणे",
    audio_assist: "आवाज सहाय्य",
    pillar1_title: "एकाच ठिकाणी खात्रीशीर सल्ला",
    pillar1_desc: "पेरणीपासून काढणीपर्यंत अचूक वेळापत्रक",
    pillar2_title: "भाषेचा कोणताही अडथळा नाही",
    pillar2_desc: "मराठीमध्ये माहिती व ऐकण्याची सुविधा",
    pillar3_title: "खर्चात ६०-८०% बचत",
    pillar3_desc: "घरगुती सेंद्रिय खते, अवजारे देवाणघेवाण आणि सामूहिक खरेदी",
    tab_advisory: "पीक सल्ला",
    tab_doctor: "पीक डॉक्टर",
    tab_calc: "खर्च कॅल्क्युलेटर",
    tab_recipes: "सेंद्रिय खत पाककृती",
    tab_tools: "यंत्रसामग्री वाटप",
    tab_bulk: "सामूहिक खरेदी",
    advisory_heading: "टप्प्याटप्प्याने पीक मार्गदर्शन",
    advisory_sub: "नवीन शेतकरी बांधवांसाठी अचूक आणि खात्रीशीर मार्गदर्शन.",
    filter_category: "वर्गवारी:",
    doctor_heading: "पीक डॉक्टर व रोग निदान",
    doctor_sub: "पानांवरील रोगांची लक्षणे ओळखा आणि कमी खर्चाचे नैसर्गिक उपाय करा.",
    select_crop: "पीक निवडा:",
    enter_symptoms: "लक्षणे लिहा (उदा. पिवळी पाने, अळी):",
    diagnose_btn: "🔍 निदान करा",
    calc_heading: "बियाणे व खत खर्च कॅल्क्युलेटर",
    calc_sub: "अतिरिक्त बियाणे व रासायनिक खतांवर होणारा वायफळ खर्च टाळा.",
    enter_plot_details: "जमिनीचा तपशील",
    land_size: "जमीन क्षेत्र (एकर)",
    acre_helper: "१ एकर ≈ ४० गुंठे",
    calc_action_btn: "⚡ बचत तपासा",
    ready_to_calculate: "गणना करण्यासाठी सज्ज!",
    calc_hint: "पीक आणि क्षेत्र निवडा व सेंद्रिय शेतीतून किती पैसे वाचतील ते पहा.",
    recipes_heading: "घरच्या घरी तयार करा सेंद्रिय खते",
    recipes_sub: "जीवामृत व निंबोळी अर्क वापरून रासायनिक खतांचा खर्च ९०% पर्यंत वाचवा.",
    equipment_heading: "शेती अवजारे भाडेतत्त्वावर",
    equipment_sub: "महागडे ट्रॅक्टर विकत न घेता शेजारील शेतकऱ्यांकडून रास्त दरात भाड्याने घ्या.",
    list_tool_btn: "➕ माझे यंत्र जोडा",
    bulk_heading: "शेतकऱ्यांची सामूहिक घाऊक खरेदी",
    bulk_sub: "एकत्र खरेदी करून २५-४०% पर्यंत घाऊक सवलत मिळवा.",
    read_advice: "🔊 ऐका",
    rent_contact: "📞 मालकाशी संपर्क साधा",
    join_circle: "🤝 खरेदीत सामील व्हा"
  },
  bn: {
    header_subtitle: "বিক্ষিপ্ত পরামর্শ দূরীকরণ, ভাষার বাধা দূর করা এবং চাষের খরচ কমানো",
    audio_assist: "ভয়েস সহায়তা",
    pillar1_title: "নির্ভুল কৃষিপরামর্শ",
    pillar1_desc: "বীজ বপন থেকে ফসল কাটা পর্যন্ত সম্পূর্ণ ক্যালেন্ডার",
    pillar2_title: "কোনো ভাষার বাধা নেই",
    pillar2_desc: "সহজ বাংলা এবং অডিও শুনে বোঝার সুবিধা",
    pillar3_title: "খরচ ৬০-৮০% কমান",
    pillar3_desc: "ঘরের তৈরি জৈব সার, কৃষি যন্ত্র ভাগাভাগি ও পাইকারি কেনাকাটা",
    tab_advisory: "ফসল পরামর্শ",
    tab_doctor: "ফসল ডাক্তার",
    tab_calc: "খরচ ক্যালকুলেটর",
    tab_recipes: "জৈব সারের রেসিপি",
    tab_tools: "যন্ত্রপাতি ভাগাভাগি",
    tab_bulk: "সম্মিলিত কেনাকাটা",
    advisory_heading: "ধাপে ধাপে ফসলের নির্দেশিকা",
    advisory_sub: "নতুন চাষী ভাইদের জন্য স্পষ্ট ও বিভ্রান্তিমুক্ত নির্দেশিকা।",
    filter_category: "বিভাগ:",
    doctor_heading: "ফসল ডাক্তার ও রোগ নির্ণয়",
    doctor_sub: "রোগ ও পোকা চিনে কম খরচে প্রাকৃতিক উপায়ে সমাধান করুন।",
    select_crop: "ফসল নির্বাচন:",
    enter_symptoms: "লক্ষণ লিখুন (যেমন হলুদ পাতা, ছিদ্র):",
    diagnose_btn: "🔍 রোগ নির্ণয়",
    calc_heading: "সার ও বীজের খরচ ক্যালকুলেটর",
    calc_sub: "অতিরিক্ত বীজ ও রাসায়নিক সারের অপচয় বন্ধ করুন।",
    enter_plot_details: "জমির বিবরণ",
    land_size: "জমির পরিমাণ (একর)",
    acre_helper: "১ একর ≈ ৩ বিঘা ৮ কাঠা",
    calc_action_btn: "⚡ খরচের হিসাব দেখুন",
    ready_to_calculate: "হিসাব করতে প্রস্তুত!",
    calc_hint: "ফসল ও জমির পরিমাণ নির্বাচন করে আপনার সঞ্চয়ের পরিমাণ দেখুন।",
    recipes_heading: "ঘরেই তৈরি করুন স্বল্পমূল্যের জৈব সার",
    recipes_sub: "জীবাশ্ম ও নিম পাতার স্প্রে তৈরি করে ৯০% পর্যন্ত রাসায়নিক খরচ বাঁচান।",
    equipment_heading: "কৃষি সরঞ্জাম ও ট্র্যাক্টর ভাড়া",
    equipment_sub: "দামী যন্ত্রপাতি না কিনে প্রতিবেশী কৃষকদের কাছ থেকে সাশ্রয়ী মূল্যে ভাড়া নিন।",
    list_tool_btn: "➕ আমার যন্ত্রের তালিকা দিন",
    bulk_heading: "কৃষকদের যৌথ পাইকারি ক্রয়",
    bulk_sub: "একত্রে বীজ ও সার কিনে ২৫-৪০% পাইকারি ছাড় পান।",
    read_advice: "🔊 শুনুন",
    rent_contact: "📞 যোগাযোগ করুন",
    join_circle: "🤝 অর্ডারে যোগ দিন"
  }
};

let currentLang = 'en';
let speechSynth = window.speechSynthesis;
let allCrops = [];
let allDiseases = [];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initHostAvailabilityCheck();
  initTabs();
  initLanguageSwitcher();
  initAudioMasterToggle();
  initWeatherBanner();
  loadCrops();
  loadDiseases();
  loadRecipes();
  loadEquipment();
  loadBulkOrders();
  initCalculator();
  initModalListeners();
});

// 1. Host Availability Checker (Verifies backend and host connection)
async function initHostAvailabilityCheck() {
  const hostBadge = document.getElementById('host-status');
  const hostText = document.getElementById('host-status-text');
  const hostDisplay = document.getElementById('host-url-display');
  const currentHost = window.location.origin || 'http://localhost:5000';

  if (hostDisplay) {
    hostDisplay.textContent = currentHost;
  }

  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Status code ' + res.status);
    const data = await res.json();

    if (data.status === 'online') {
      hostBadge.className = 'host-badge online';
      hostText.textContent = `🟢 Host Active (${window.location.port || '5000'})`;
      console.log('Host verification successful:', data);
    } else {
      throw new Error('Unhealthy status reported');
    }
  } catch (err) {
    console.warn('Host verification error:', err);
    hostBadge.className = 'host-badge offline';
    hostText.textContent = '🔴 Host Disconnected';
    showToast('Warning: Backend host is unreachable at ' + currentHost);
  }
}

// 2. Weather & Spray Advisory
async function initWeatherBanner() {
  const weatherTitle = document.getElementById('weather-title');
  const weatherDesc = document.getElementById('weather-desc');
  const badge = document.getElementById('spray-verdict-badge');
  const icon = document.getElementById('weather-icon');

  try {
    const res = await fetch('/api/weather-advisory');
    const data = await res.json();

    if (data.spray_recommended) {
      badge.className = 'weather-badge safe';
      badge.textContent = 'Safe to Spray';
      icon.textContent = '☀️';
      weatherTitle.textContent = `Optimal Weather: ${data.temperature_celsius}°C, Wind ${data.wind_speed_kmh} km/h`;
      weatherDesc.textContent = `${data.spray_advisory_message} (Rain chance: ${data.rain_probability_pct}%)`;
    } else {
      badge.className = 'weather-badge unsafe';
      badge.textContent = 'Do Not Spray';
      icon.textContent = '🌧️';
      weatherTitle.textContent = `Caution: Rain or High Wind Predicted!`;
      weatherDesc.textContent = `${data.spray_advisory_message} ${data.cost_warning}`;
    }
  } catch (err) {
    weatherTitle.textContent = "Weather Advisory: Moderate conditions";
    weatherDesc.textContent = "Spray during calm morning or late evening hours to prevent drift.";
    badge.textContent = "Normal";
    badge.className = "weather-badge safe";
  }
}

// 3. Language Switcher Engine
function initLanguageSwitcher() {
  const select = document.getElementById('lang-select');
  select.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang] || translations.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Re-render components with translated dynamic labels
  renderCrops();
  renderDiseases();
  showToast(`Language switched: ${document.querySelector(`#lang-select option[value="${lang}"]`).textContent}`);
}

// 4. Tab Navigation
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });
}

// 5. Speech Audio Narration (Web Speech API)
function initAudioMasterToggle() {
  const btn = document.getElementById('master-speech-btn');
  btn.addEventListener('click', () => {
    if (speechSynth.speaking) {
      speechSynth.cancel();
      btn.classList.remove('active');
      showToast('Speech stopped');
    } else {
      speakText("Welcome to AgriSmart. Click any audio button to listen to advice in your language.");
      btn.classList.add('active');
    }
  });
}

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('Audio narration not supported on this device/browser');
    return;
  }

  speechSynth.cancel(); // Stop any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text);

  // Set language voice
  const langCodes = {
    en: 'en-US',
    hi: 'hi-IN',
    es: 'es-ES',
    sw: 'sw',
    pa: 'pa-IN',
    mr: 'mr-IN',
    bn: 'bn-IN'
  };
  utterance.lang = langCodes[currentLang] || 'en-US';
  utterance.rate = 0.95; // Slightly slower for clear rural understanding
  utterance.pitch = 1.0;

  speechSynth.speak(utterance);
}

// 6. Crop Advisories Module (Unified Advice)
async function loadCrops() {
  const container = document.getElementById('crops-container');
  try {
    const res = await fetch('/api/crops');
    allCrops = await res.json();
    renderCrops();

    const filterSelect = document.getElementById('crop-filter-select');
    filterSelect.addEventListener('change', () => {
      renderCrops(filterSelect.value);
    });
  } catch (err) {
    container.innerHTML = `<div class="card"><p>Failed to load crop advisories: ${err.message}</p></div>`;
  }
}

function renderCrops(categoryFilter = '') {
  const container = document.getElementById('crops-container');
  const filtered = categoryFilter ? allCrops.filter(c => c.category === categoryFilter) : allCrops;
  const t = translations[currentLang] || translations.en;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card"><p>No crops found for this category.</p></div>`;
    return;
  }

  container.innerHTML = filtered.map(crop => {
    const speechScript = `${crop.name}. Season: ${crop.season}. Duration: ${crop.duration_days} days. Step 1 sowing: ${crop.stage_1_sowing}. Step 2 vegetative: ${crop.stage_2_vegetative}. Step 3 flowering: ${crop.stage_3_flowering}. Harvest: ${crop.stage_4_harvest}`;

    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${crop.name}</h3>
          <span class="card-badge">${crop.category}</span>
        </div>
        <div class="card-meta">
          <span>📅 ${crop.season}</span>
          <span>⏳ ${crop.duration_days} Days</span>
          <span>💧 ${crop.water_requirement}</span>
        </div>
        
        <div class="timeline">
          <div class="timeline-step">
            <span class="step-marker">1</span>
            <div><strong>Sowing:</strong> ${crop.stage_1_sowing}</div>
          </div>
          <div class="timeline-step">
            <span class="step-marker">2</span>
            <div><strong>Vegetative Growth:</strong> ${crop.stage_2_vegetative}</div>
          </div>
          <div class="timeline-step">
            <span class="step-marker">3</span>
            <div><strong>Flowering & Fruit:</strong> ${crop.stage_3_flowering}</div>
          </div>
          <div class="timeline-step">
            <span class="step-marker">4</span>
            <div><strong>Harvesting:</strong> ${crop.stage_4_harvest}</div>
          </div>
        </div>

        <div class="card-footer">
          <small>Expected Yield: <strong>${crop.yield_estimate}</strong></small>
          <button class="read-btn" onclick="speakText('${escapeQuotes(speechScript)}')">
            ${t.read_advice}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 7. Crop Doctor & Pest Diagnosis
async function loadDiseases() {
  try {
    const res = await fetch('/api/diagnose');
    allDiseases = await res.json();
    renderDiseases();

    document.getElementById('doc-search-btn').addEventListener('click', executeDiagnosis);
    document.getElementById('doc-symptom-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') executeDiagnosis();
    });
  } catch (err) {
    console.error('Error loading diseases:', err);
  }
}

async function executeDiagnosis() {
  const crop = document.getElementById('doc-crop-select').value;
  const symptom = document.getElementById('doc-symptom-input').value;

  try {
    const res = await fetch(`/api/diagnose?crop=${encodeURIComponent(crop)}&symptom=${encodeURIComponent(symptom)}`);
    allDiseases = await res.json();
    renderDiseases();
  } catch (err) {
    showToast('Failed to execute diagnosis query');
  }
}

function renderDiseases() {
  const container = document.getElementById('diseases-container');
  const t = translations[currentLang] || translations.en;

  if (allDiseases.length === 0) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <h3>No matching diseases or pests found.</h3>
        <p>Try searching with general terms like 'yellow', 'spots', 'leaf', or select 'All Crops'.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = allDiseases.map(d => {
    const speechScript = `Disease: ${d.disease_name} affecting ${d.crop}. Symptoms: ${d.symptom_summary}. Recommended low-cost organic remedy: ${d.low_cost_organic_remedy}. Cost saving: ${d.estimated_cost_reduction}`;

    return `
      <div class="card disease-card">
        <div class="card-header">
          <h3 class="card-title">${d.disease_name}</h3>
          <span class="card-badge" style="background:#fee2e2; color:#b91c1c;">${d.crop}</span>
        </div>
        <div class="symptom-tag">
          <strong>Symptoms:</strong> ${d.symptom_summary}
        </div>
        <div style="font-size:0.8rem; color:#64748b; margin-bottom:0.5rem;">
          Affected Part: <strong>${d.affected_part}</strong> | Cause: ${d.cause || 'Pathogen'}
        </div>

        <div class="remedy-box">
          <strong>🌿 Low-Cost Organic Remedy:</strong>
          <p>${d.low_cost_organic_remedy}</p>
        </div>

        <div class="chemical-box">
          <strong>⚠️ Synthetic Chemical Alternative:</strong>
          <span>${d.chemical_remedy} (Harmful to beneficial bugs & soil)</span>
        </div>

        <div style="margin: 0.5rem 0; font-size: 0.82rem;">
          <strong>Prevention:</strong> ${d.prevention_tips}
        </div>

        <div class="card-footer">
          <span class="savings-highlight">💰 ${d.estimated_cost_reduction}</span>
          <button class="read-btn" onclick="speakText('${escapeQuotes(speechScript)}')">
            ${t.read_advice}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 8. Input Cost Calculator
function initCalculator() {
  const form = document.getElementById('calc-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('calc-crop-select').value;
    const acres = parseFloat(document.getElementById('calc-acres-input').value) || 1.0;

    const resArea = document.getElementById('calc-result-area');
    resArea.innerHTML = `<div class="loading-spinner">Calculating input metrics...</div>`;

    try {
      const res = await fetch('/api/calculator/inputs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, acres })
      });
      const data = await res.json();
      renderCalcResults(data);
    } catch (err) {
      resArea.innerHTML = `<div class="card"><p>Failed to calculate: ${err.message}</p></div>`;
    }
  });
}

function renderCalcResults(data) {
  const container = document.getElementById('calc-result-area');
  const speechScript = `Cost report for ${data.acres} acres of ${data.crop}. Exact seed required: ${data.seed_required} with budget ${data.seed_budget}. Conventional chemical input cost is ${data.conventional_chemical_cost}. If you use farm-made bio-inputs, cost is only ${data.organic_diy_alternative_cost}. Net money saved is ${data.net_money_saved}, saving ${data.savings_percentage}.`;

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <h3 style="font-size:1.2rem; font-weight:800; color:var(--primary);">
        📊 Optimization Report: ${data.crop} (${data.acres} Acre${data.acres > 1 ? 's' : ''})
      </h3>
      <button class="read-btn" onclick="speakText('${escapeQuotes(speechScript)}')">
        🔊 Read Summary
      </button>
    </div>

    <div class="results-stat-grid">
      <div class="stat-box">
        <span>Exact Seed Required</span>
        <strong>${data.seed_required}</strong>
        <small style="color:#64748b;">Budget: ${data.seed_budget}</small>
      </div>
      <div class="stat-box">
        <span>Chemical Cost (Synthetics)</span>
        <strong style="color:#dc2626;">${data.conventional_chemical_cost}</strong>
        <small style="color:#64748b;">Fertilizers + Toxic sprays</small>
      </div>
      <div class="stat-box">
        <span>DIY Bio-Input Cost</span>
        <strong style="color:#16a34a;">${data.organic_diy_alternative_cost}</strong>
        <small style="color:#64748b;">Jeevamrutha + Neem Extract</small>
      </div>
      <div class="stat-box highlight">
        <span>Net Cash Money Saved</span>
        <strong>${data.net_money_saved}</strong>
        <small style="color:#166534; font-weight:700;">${data.savings_percentage} Total Savings</small>
      </div>
    </div>

    <div class="tips-list">
      <strong style="display:block; margin-bottom:0.5rem; color:#15803d;">💡 First-Time Farmer Cost Reduction Rules:</strong>
      <ul>
        ${data.actionable_tips.map(tip => `<li>${tip}</li>`).join('')}
        <li>Recommended Irrigation Sessions: <strong>${data.recommended_water_cycles} times</strong> across full crop cycle.</li>
      </ul>
    </div>
  `;
}

// 9. DIY Bio-Input Recipes (High Savings)
async function loadRecipes() {
  const container = document.getElementById('recipes-container');
  try {
    const res = await fetch('/api/recipes');
    const recipes = await res.json();
    const t = translations[currentLang] || translations.en;

    container.innerHTML = recipes.map(r => {
      const speechScript = `Recipe for ${r.title}. Intended for ${r.target_use}. Estimated preparation cost is ${r.estimated_cost} compared to commercial cost of ${r.commercial_alternative_cost}, giving ${r.savings_percentage}. Materials needed: ${r.materials_needed}`;

      return `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${r.title}</h3>
          </div>
          <div class="recipe-savings">
            💰 ${r.savings_percentage} (Cost: ${r.estimated_cost} vs Market: ${r.commercial_alternative_cost})
          </div>

          <div class="recipe-section">
            <strong>Target Use:</strong>
            <p>${r.target_use}</p>
          </div>

          <div class="recipe-section">
            <strong>Ingredients & Materials:</strong>
            <p>${r.materials_needed}</p>
          </div>

          <div class="recipe-section">
            <strong>Preparation Steps:</strong>
            <p>${r.preparation_steps}</p>
          </div>

          <div class="recipe-section">
            <strong>Application Method:</strong>
            <p>${r.application_method}</p>
          </div>

          <div class="card-footer">
            <button class="read-btn" onclick="speakText('${escapeQuotes(speechScript)}')">
              ${t.read_advice}
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = `<div class="card"><p>Failed to load recipes: ${err.message}</p></div>`;
  }
}

// 10. Community Equipment Sharing
async function loadEquipment() {
  const container = document.getElementById('equipment-container');
  try {
    const res = await fetch('/api/equipment');
    const items = await res.json();
    const t = translations[currentLang] || translations.en;

    container.innerHTML = items.map(item => `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${item.tool_name}</h3>
          <span class="card-badge" style="background:#fef3c7; color:#92400e;">${item.category}</span>
        </div>
        <div class="card-meta">
          <span>📍 ${item.village_location}</span>
          <span>👤 ${item.owner_name}</span>
        </div>
        <p style="font-size:0.85rem; color:#475569; margin-bottom:1rem;">
          ${item.description || 'Maintained in good working condition. Ready for small farm plots.'}
        </p>
        <div class="card-footer">
          <div>
            <strong style="font-size:1.2rem; color:#15803d;">$${item.price_per_hour}</strong>
            <small style="color:#64748b;"> / hour</small>
          </div>
          <a href="tel:${item.contact_phone}" class="btn btn-secondary" style="font-size:0.8rem; padding:0.35rem 0.75rem; text-decoration:none;">
            ${t.rent_contact} (${item.contact_phone})
          </a>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div class="card"><p>Failed to load equipment: ${err.message}</p></div>`;
  }
}

// 11. Bulk Buying Pools
async function loadBulkOrders() {
  const container = document.getElementById('bulk-container');
  try {
    const res = await fetch('/api/bulk-orders');
    const orders = await res.json();
    const t = translations[currentLang] || translations.en;

    container.innerHTML = orders.map(ord => {
      const pct = Math.min(100, Math.round((ord.current_committed_units / ord.min_order_units) * 100));
      const unitSavings = (ord.retail_price_per_unit - ord.bulk_price_per_unit).toFixed(2);

      return `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${ord.item_name}</h3>
            <span class="card-badge" style="background:#e0e7ff; color:#3730a3;">${ord.category}</span>
          </div>
          <div style="font-size:0.85rem; margin-bottom:0.75rem;">
            Single Farmer Retail: <del style="color:#ef4444;">$${ord.retail_price_per_unit}</del> 
            &nbsp;➡️&nbsp; 
            <strong>Group Price: <span style="color:#15803d; font-size:1.1rem;">$${ord.bulk_price_per_unit}</span> / ${ord.unit}</strong>
            <div class="savings-highlight" style="margin-top:0.35rem;">Saves $${unitSavings} per ${ord.unit}</div>
          </div>

          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width: ${pct}%"></div>
          </div>
          <div class="progress-text">
            <span>Progress: <strong>${ord.current_committed_units} / ${ord.min_order_units} ${ord.unit}</strong></span>
            <span>${pct}% funded</span>
          </div>

          <div style="font-size:0.78rem; color:#64748b; margin: 0.75rem 0;">
            Organizer: ${ord.organizer_contact}<br>
            Order Cutoff: <strong>${ord.deadline_date}</strong>
          </div>

          <div class="card-footer">
            <button class="btn btn-primary btn-block" style="font-size:0.85rem;" onclick="joinBulkPool(${ord.id}, '${ord.unit}')">
              ${t.join_circle} (+1 ${ord.unit})
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = `<div class="card"><p>Failed to load bulk pools: ${err.message}</p></div>`;
  }
}

async function joinBulkPool(orderId, unit) {
  try {
    const res = await fetch(`/api/bulk-orders/${orderId}/commit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ units: 1 })
    });
    const data = await res.json();
    showToast(data.message + ` Estimated savings: ${data.farmer_estimated_savings}`);
    loadBulkOrders();
  } catch (err) {
    showToast('Failed to join bulk order pool');
  }
}

// 12. Modal & Form Handling
function initModalListeners() {
  const modal = document.getElementById('tool-modal');
  const openBtn = document.getElementById('open-tool-modal-btn');
  const closeBtn = document.getElementById('close-tool-modal');
  const cancelBtn = document.getElementById('cancel-tool-btn');
  const form = document.getElementById('tool-form');

  if (openBtn) openBtn.addEventListener('click', () => modal.classList.add('active'));
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  if (cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        tool_name: document.getElementById('tool-name-input').value,
        category: document.getElementById('tool-cat-select').value,
        price_per_hour: parseFloat(document.getElementById('tool-price-input').value),
        owner_name: document.getElementById('tool-owner-input').value,
        contact_phone: document.getElementById('tool-phone-input').value,
        village_location: document.getElementById('tool-loc-input').value,
        description: document.getElementById('tool-desc-input').value
      };

      try {
        const res = await fetch('/api/equipment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Listing submission failed');
        modal.classList.remove('active');
        form.reset();
        showToast('Equipment listed successfully for neighbors!');
        loadEquipment();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    });
  }
}

// 13. Toast Notification Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Utility: escape quotes in speech text
function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
}

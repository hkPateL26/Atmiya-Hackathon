export interface SchemeItem {
  id: string;
  category: 'agriculture' | 'healthcare' | 'education' | 'welfare';
  categoryGu: string;
  categoryEn: string;
  titleGu: string;
  titleEn: string;
  department: string;
  benefit: string;
  benefitGu: string;
  slaDays: number;
  fee: number;
  validityYears?: number;
  requiredDocs: Array<{
    nameGu: string;
    nameEn: string;
    checkType: 'income_expiry_3yr' | 'aadhaar_regex' | 'land_record_712' | 'caste_cert' | 'marksheet' | 'generic';
    required: boolean;
  }>;
  validationRuleDesc: string;
}

export const ALL_YOJANAS: SchemeItem[] = [
  // 🌾 1. AGRICULTURE & FARMING (12 SCHEMES)
  {
    id: 'ikhedut-subsidy-schemes',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'i-Khedut સબસિડી યોજનાઓ (ટ્રેક્ટર, સાધનો અને સિંચાઈ કિટ્સ)',
    titleEn: 'i-Khedut Subsidy Schemes (Tractors, Tools & Irrigation Kits)',
    department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
    benefit: 'Comprehensive single-window portal subsidies for farm machinery, implements and irrigation',
    benefitGu: 'ખેતી યંત્રો, ઓજારો, પાઈપલાઈન અને સિંચાઈ સાધનો માટે સંકલિત સબસિડી પોર્ટલ',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ અને ૮-અ જમીનની નકલ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'બેંક પાસબુક / રદ કરેલ ચેક', nameEn: 'Bank Passbook / Cancelled Cheque', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'i-Khedut પોર્ટલ નોંધણી અને 7/12 ખાતા વેરિફિકેશન'
  },
  {
    id: 'ikhedut-tractor',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'i-Khedut ટ્રેક્ટર સહાય યોજના',
    titleEn: 'i-Khedut Tractor Assistance Scheme',
    department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
    benefit: 'Subsidy up to ₹45,000 to ₹60,000 on new tractor purchase',
    benefitGu: 'નવા ટ્રેક્ટરની ખરીદી પર ₹૪૫,૦૦૦ થી ₹૬૦,૦૦૦ સુધીની સરકારી સબસિડી',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ અને ૮-અ જમીનની નકલ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'બેંક પાસબુક / રદ કરેલ ચેક', nameEn: 'Bank Passbook / Cancelled Cheque', checkType: 'generic', required: true },
      { nameGu: 'જાતિનો દાખલો (SC/ST ખેડૂતો માટે)', nameEn: 'Caste Certificate (For SC/ST)', checkType: 'caste_cert', required: false }
    ],
    validationRuleDesc: '7/12 જમીન ખાતા નંબર અને આધાર કાર્ડ નામ મેળવણી ચકાસણી'
  },
  {
    id: 'ikhedut-tools',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'i-Khedut ખેતી સાધનો/ઓજારો સહાય',
    titleEn: 'i-Khedut Tools & Implements Assistance',
    department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
    benefit: 'Subsidy up to 50% on rotavator, thresher, cultivators',
    benefitGu: 'રોટાવેટર, થ્રેશર અને પ્લાઉની ખરીદી પર ૫૦% સુધીની સબસિડી',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ અને ૮-અ નકલ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'ઓથોરાઇઝ્ડ ડીલરનું ક્વોટેશન', nameEn: 'Authorized Dealer Quotation', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ઓજારોની માન્યતા અને ખેડૂત ખાતા વેરિફિકેશન'
  },
  {
    id: 'ikhedut-drip',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'i-Khedut ડ્રીપ ઈરીગેશન / ટપક સિંચાઈ સહાય',
    titleEn: 'i-Khedut Irrigation / Drip Irrigation Assistance',
    department: 'GGRC & કૃષિ વિભાગ',
    benefit: '70% to 85% financial assistance on micro irrigation kits',
    benefitGu: 'ટપક/ફુવારા પદ્ધતિ માટે ૭૦% થી ૮૫% સુધીનું આર્થિક અનુદાન (GGRC)',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨, ૮-અ અને ૧૬ નંબર ફોર્મ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'વીજ બિલ / બોરવેલ દાખલો', nameEn: 'Electricity Bill / Water Source Proof', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'પાણીનો સ્ત્રોત અને જમીન માપણી વિસ્તાર વેલિડેશન'
  },
  {
    id: 'ikhedut-tarpaulin',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'i-Khedut તાડપત્રી સહાય યોજના',
    titleEn: 'i-Khedut Tarpaulin Assistance Scheme',
    department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
    benefit: '50% to 75% subsidy on purchasing protective tarpaulin sheets',
    benefitGu: 'પાક સંરક્ષણ તાડપત્રી ખરીદી પર ૫૦% થી ૭૫% સહાય (મહત્તમ ૨ નંગ)',
    slaDays: 3,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ નકલ', nameEn: '7/12 Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ખાતા દીઠ મહત્તમ ૨ તાડપત્રી લિમિટ ચેક'
  },
  {
    id: 'ikhedut-seeds',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'i-Khedut પ્રમાણિત બિયારણ સહાય યોજના',
    titleEn: 'i-Khedut Certified Seed Assistance',
    department: 'કૃષિ અને સહકાર વિભાગ',
    benefit: 'Subsidized certified seeds for Groundnut, Cotton, Wheat, Pulses',
    benefitGu: 'મગફળી, કપાસ અને ઘઉંના પ્રમાણિત બિયારણની ખરીદી પર સબસિડી',
    slaDays: 3,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ અને ૮-અ નકલ', nameEn: '7/12 Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'માન્ય જીએસટી બિયારણ બિલ', nameEn: 'Certified Seed GST Bill', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'માન્ય બિયારણ વેચાણ કેન્દ્ર જીએસટી બિલ ચકાસણી'
  },
  {
    id: 'crop-storage-godown',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'પાક સંગ્રહ સ્ટ્રક્ચર / ગોડાઉન સહાય',
    titleEn: 'Crop Storage / Godown Assistance Scheme',
    department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
    benefit: 'Up to ₹50,000 or 50% subsidy for on-farm crop storage structure',
    benefitGu: 'ખેતરમાં પાક સંગ્રહ ગોડાઉન બનાવવા માટે ₹૫૦,૦૦૦ સુધીની સહાય',
    slaDays: 10,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨, ૮-અ જમીન નકલ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'ખેતરનો નકશો અને જીઓ-ટેગ ફોટો', nameEn: 'Plot Map & Geo-tagged Photo', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'જીઓ-ટેગ નકશો અને સ્થળ નિરીક્ષણ વેલિડેશન'
  },
  {
    id: 'pm-kisan',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'PM-KISAN સન્માન નિધિ યોજના',
    titleEn: 'PM-KISAN Samman Nidhi Yojana',
    department: 'કૃષિ મંત્રાલય (ભારત સરકાર)',
    benefit: '₹6,000 per year direct cash transfer in 3 equal installments',
    benefitGu: 'વાર્ષિક ₹૬,૦૦૦ ની સીધી ખાતામાં સહાય (₹૨,૦૦૦ ના ૩ હપ્તા)',
    slaDays: 3,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ જમીનની નકલ (RoR)', nameEn: 'Land RoR / 7/12', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ (મોબાઈલ લિંક્ડ)', nameEn: 'Aadhaar Card (Mobile Linked)', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'NPCI DBT લિંક્ડ બેંક પાસબુક', nameEn: 'NPCI / DBT Linked Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'e-KYC અને આધાર સીડેડ બેંક એકાઉન્ટ ઓટો-ચેક'
  },
  {
    id: 'mksy-crop-loss',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'મુખ્યમંત્રી કિસાન સહાય યોજના (MKSY)',
    titleEn: 'Mukhyamantri Kisan Sahay Yojana',
    department: 'મહેસૂલ અને કૃષિ વિભાગ',
    benefit: 'Zero-premium crop compensation for drought, flood or unseasonal rain',
    benefitGu: 'અતિવૃષ્ટિ કે કમોસમી વરસાદમાં હેક્ટર દીઠ ₹૨૫,૦૦૦ સુધી નુકસાન વળતર',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ અને ૮-અ નકલ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'તલાટીનો વાવેતર દાખલો', nameEn: 'Talati Sowing Certificate', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'વાવેતર પાક અને સર્વે નંબર નુકસાની ટકાવારી ગણતરી'
  },
  {
    id: 'deshi-gay-sahay',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'દેશી ગાય નિભાવ ખર્ચ સહાય યોજના',
    titleEn: 'Deshi Gay Nibhav Kharch Sahay Yojana',
    department: 'કૃષિ અને પ્રાકૃતિક કૃષિ બોર્ડ',
    benefit: '₹900 per month (₹10,800/yr) for natural cow-based organic farming',
    benefitGu: 'એક દેશી ગાય દીઠ દર મહિને ₹૯૦૦ (વાર્ષિક ₹૧૦,૮૦૦) નિભાવ સહાય',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ જમીન નકલ', nameEn: '7/12 Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'ગાયનો કાનનો ટેગ નંબર (INAF)', nameEn: 'Cow Ear Tag ID (INAF)', checkType: 'generic', required: true },
      { nameGu: 'પ્રાકૃતિક ખેતી તાલીમ પ્રમાણપત્ર', nameEn: 'Natural Farming Certificate', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ અને બેંક પાસબુક', nameEn: 'Aadhaar & Bank Passbook', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: '૧૨-ડિજિટ પશુ ટેગ આઈડી અને પ્રાકૃતિક ખેતી પ્રમાણપત્ર વેરિફિકેશન'
  },
  {
    id: 'smartphone-sahay',
    category: 'agriculture',
    categoryGu: 'ખેતીવાડી',
    categoryEn: 'Agriculture & Farming',
    titleGu: 'ખેડૂત સ્માર્ટફોન સહાય યોજના',
    titleEn: 'Smartphone Sahay Yojana for Farmers',
    department: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ',
    benefit: '40% cost subsidy or up to ₹6,000 for purchasing smartphone',
    benefitGu: 'ખેતી માહિતી માટે સ્માર્ટફોન ખરીદી પર ૪૦% અથવા ₹૬,૦૦૦ સુધી સહાય',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: '૭/૧૨ અને ૮-અ નકલ', nameEn: '7/12 & 8-A Land Record', checkType: 'land_record_712', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'સ્માર્ટફોનનું GST બિલ (IMEI સાથે)', nameEn: 'Smartphone GST Bill with IMEI', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'GST બિલ તારીખ અને IMEI નંબર વેલિડિટી'
  },

  // 🏥 2. HEALTHCARE & SOCIAL SECURITY (9 SCHEMES)
  {
    id: 'pmjay-ayushman',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'PM-JAY આયુષ્માન કાર્ડ (MAA Card)',
    titleEn: 'PM-JAY / Ayushman Bharat Card',
    department: 'આરોગ્ય અને પરિવાર કલ્યાણ વિભાગ',
    benefit: 'Up to ₹10 Lakh cashless hospitalization cover per family per year',
    benefitGu: 'ગુજરાતના પરિવાર દીઠ વાર્ષિક ₹૧૦ લાખ સુધીની કેશલેસ સરકારી/ખાનગી હોસ્પિટલ સારવાર',
    slaDays: 1,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'રેશન કાર્ડ (NFSA અથવા મા કાર્ડ)', nameEn: 'Ration Card (NFSA List)', checkType: 'generic', required: true },
      { nameGu: 'આવકનો દાખલો (જો NFSA ન હોય તો)', nameEn: 'Income Certificate (< ₹4L)', checkType: 'income_expiry_3yr', required: true }
    ],
    validationRuleDesc: '૩-વર્ષ આવક દાખલો (< ₹૪ લાખ) અને રેશનકાર્ડ લિંકિંગ'
  },
  {
    id: 'maa-amrutam',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'મુખ્યમંત્રી અમૃતમ (મા વાત્સલ્ય યોજના)',
    titleEn: 'Mukhyamantri Amrutam (MAA Vatsalya)',
    department: 'આરોગ્ય કમિશનરેટ, ગુજરાત',
    benefit: '100% free treatment for heart, kidney, cancer, neuro diseases',
    benefitGu: 'કેન્સર, કિડની, હૃદયરોગ અને ન્યુરો જેવી ગંભીર બીમારીઓ માટે નિઃશુલ્ક સારવાર',
    slaDays: 2,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'આવકનો દાખલો (વાર્ષિક ₹૪ લાખથી ઓછી)', nameEn: 'Income Certificate (< ₹4L)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'રેશન કાર્ડ', nameEn: 'Ration Card', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'વાર્ષિક આવક મર્યાદા ₹૪,૦૦,૦૦૦ અને ૩ વર્ષ સમયાવધિ ચેક'
  },
  {
    id: 'ganga-swarupa',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'ગંગા સ્વરૂપા આર્થિક સહાય (વિધવા પેન્શન)',
    titleEn: 'Ganga Swarupa Financial Assistance Scheme',
    department: 'મહિલા અને બાળ વિકાસ વિભાગ',
    benefit: '₹1,250 per month lifetime pension directly in bank account',
    benefitGu: 'વિધવા માતાઓને દર મહિને ₹૧,૨૫૦ આજીવન સીધી બેંક સહાય',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: 'પતિનો મરણનો દાખલો', nameEn: "Husband's Death Certificate", checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'પુનઃલગ્ન ન કર્યાનું સોગંદનામું', nameEn: 'Non-Remarriage Affidavit', checkType: 'generic', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'મરણ દાખલો તારીખ અને ૩-વર્ષ આવક મર્યાદા (ગ્રામીણ ₹૧.૨L / શહેરી ₹૧.૫L)'
  },
  {
    id: 'pmsby-insurance',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'પ્રધાનમંત્રી સુરક્ષા વીમા યોજના (PMSBY)',
    titleEn: 'Pradhan Mantri Suraksha Bima Yojana',
    department: 'નાણાં મંત્રાલય / બેંકિંગ ડિવિઝન',
    benefit: '₹2 Lakh accidental death/disability insurance for ₹20/year premium',
    benefitGu: 'વાર્ષિક માત્ર ₹૨૦ ના પ્રીમિયમે ₹૨ લાખનું અકસ્માત મૃત્યુ/દિવ્યાંગતા કવચ',
    slaDays: 1,
    fee: 20,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'બેંક બચત ખાતું પાસબુક', nameEn: 'Bank Savings Account Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ઉંમર ૧૮ થી ૭૦ વર્ષ આધાર જન્મ તારીખથી ઓટો-વેલિડેટ'
  },
  {
    id: 'matrushakti-yojana',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'મુખ્યમંત્રી માતૃશક્તિ યોજના (MMY)',
    titleEn: 'Mukhyamantri Matrushakti Yojana',
    department: 'મહિલા અને બાળ વિકાસ વિભાગ',
    benefit: '2 kg Chana, 1 kg Tuver Dal, 1L Groundnut Oil monthly for 1,000 days',
    benefitGu: 'ગર્ભવતી અને ધાત્રી માતાઓને ૧,૦૦૦ દિવસ સુધી દર મહિને મફત પૌષ્ટિક આહાર કીટ',
    slaDays: 2,
    fee: 0,
    requiredDocs: [
      { nameGu: 'મમતા કાર્ડ (MCP Card)', nameEn: 'Mamta Card (MCP Card)', checkType: 'generic', required: true },
      { nameGu: 'માતા અને પિતાનું આધાર કાર્ડ', nameEn: "Mother & Husband's Aadhaar", checkType: 'aadhaar_regex', required: true },
      { nameGu: 'રેશન કાર્ડ', nameEn: 'Ration Card', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'મમતા કાર્ડ નોંધણી અને બાળકની પ્રથમ ૧,૦૦૦ દિવસની ગણતરી'
  },
  {
    id: 'chiranjeevi-yojana',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'ચિરંજીવી યોજના (પ્રસૂતિ સહાય)',
    titleEn: 'Chiranjeevi Yojana (Maternal Delivery Assistance)',
    department: 'આરોગ્ય અને પરિવાર કલ્યાણ વિભાગ',
    benefit: '100% free delivery and cesarean in private empanelled hospitals for BPL/APL',
    benefitGu: 'ખાનગી માન્ય હોસ્પિટલોમાં પણ ૧૦૦% મફત સુવાવડ અને સિઝેરિયન ઓપરેશન',
    slaDays: 1,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'BPL રેશનકાર્ડ અથવા આવકનો દાખલો', nameEn: 'BPL Ration Card / Income Certificate', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'મમતા કાર્ડ', nameEn: 'Mamta Card', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'બીપીએલ કાર્ડ અથવા ૩-વર્ષ આવક દાખલો ચકાસણી'
  },
  {
    id: 'poshan-sudha',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'પોષણ સુધા યોજના',
    titleEn: 'Poshan Sudha Yojana',
    department: 'આદિજાતિ વિકાસ વિભાગ',
    benefit: 'One full hot cooked nutritious meal and iron supplements in tribal areas',
    benefitGu: 'આદિવાસી તાલુકાઓમાં સગર્ભા બહેનોને એક ટંકનું સંપૂર્ણ ગરમ પૌષ્ટિક ભોજન',
    slaDays: 2,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'મમતા કાર્ડ', nameEn: 'Mamta Card', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'અધિસૂચિત ૧૪ આદિવાસી જિલ્લા કવરેજ ચેક'
  },
  {
    id: 'janani-suraksha',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'જનની સુરક્ષા યોજના (JSY)',
    titleEn: 'Janani Suraksha Yojana',
    department: 'આરોગ્ય મંત્રાલય (NHM)',
    benefit: '₹1,400 rural / ₹1,000 urban cash incentive for institutional birth',
    benefitGu: 'સરકારી હોસ્પિટલમાં સુવાવડ કરાવવા પર ગ્રામીણ માતાઓને ₹૧,૪૦૦ રોકડ સહાય',
    slaDays: 2,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'સરકારી સંસ્થાકીય પ્રસૂતિ ડિસ્ચાર્જ કાર્ડ', nameEn: 'Institutional Delivery Slip', checkType: 'generic', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'હોસ્પિટલ ડિસ્ચાર્જ સ્લિપ અને બેંક એકાઉન્ટ વેરિફિકેશન'
  },
  {
    id: 'niradhar-vrudh',
    category: 'healthcare',
    categoryGu: 'આરોગ્ય',
    categoryEn: 'Healthcare & Social Security',
    titleGu: 'નિરાધાર વૃદ્ધ સહાય યોજના',
    titleEn: 'Niradhar Vrudh Sahay Yojana (Old Age Pension)',
    department: 'સામાજિક ન્યાય અને અધિકારિતા વિભાગ',
    benefit: '₹1,000 per month pension for citizens aged 60 to 79; ₹1,250 for 80+',
    benefitGu: '૬૦ વર્ષથી વધુ ઉંમરના નિરાધાર વડીલોને દર મહિને ₹૧,૦૦૦ થી ₹૧,૨૫૦ પેન્શન',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ (ઉંમરનો પુરાવો ૬૦+)', nameEn: 'Aadhaar Card (Age Proof 60+)', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ઉંમર ૬૦+ વર્ષ અને આવક મર્યાદા ચેક'
  },

  // 🎓 3. EDUCATION & SCHOLARSHIPS (8 SCHEMES)
  {
    id: 'namo-lakshmi',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'નમો લક્ષ્મી યોજના (ધો. ૯ થી ૧૨)',
    titleEn: 'Namo Lakshmi Yojana',
    department: 'શિક્ષણ વિભાગ, ગુજરાત',
    benefit: '₹50,000 total scholarship across Std 9, 10, 11 and 12 for girl students',
    benefitGu: 'ધોરણ ૯ થી ૧૨ માં અભ્યાસ કરતી દીકરીઓને કુલ ₹૫૦,૦૦૦ ની શિષ્યવૃત્તિ સહાય',
    slaDays: 3,
    fee: 0,
    requiredDocs: [
      { nameGu: 'વિદ્યાર્થિનીનું આધાર કાર્ડ', nameEn: 'Student Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'શાળા બોનાફાઇડ / U-DISE ID', nameEn: 'School Bonafide / U-DISE ID', checkType: 'generic', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ધોરણ ૯ થી ૧૨ શાળા નામાંકન અને ઉંમર ૧૪-૧૮ વર્ષ'
  },
  {
    id: 'mysy-scholarship',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'MYSY (મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના)',
    titleEn: 'Mukhyamantri Yuva Swavalamban Yojana (MYSY)',
    department: 'ઉચ્ચ શિક્ષણ કમિશનરેટ',
    benefit: 'Up to 50% college tuition fee waiver (₹2L for Medical, ₹50K for Engg)',
    benefitGu: 'મેડિકલમાં ₹૨ લાખ અને એન્જિનિયરિંગમાં ₹૫૦,૦૦૦ સુધી કોલેજ ટ્યુશન ફી સહાય',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: 'ધો. ૧૦ અથવા ૧૨ ની માર્કશીટ (૮૦+ પર્સન્ટાઈલ)', nameEn: '10th/12th Marksheet (80+ Percentile)', checkType: 'marksheet', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય, < ₹૬ લાખ)', nameEn: 'Income Certificate (3-Year, < ₹6L)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'કોલેજ પ્રવેશ પત્ર અને ફી પહોંચ', nameEn: 'College Admission & Fee Receipt', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ અને બેંક પાસબુક', nameEn: 'Aadhaar & Bank Passbook', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: '૮૦+ પર્સન્ટાઈલ અને ૩-વર્ષ આવક દાખલો (< ₹૬,૦૦,૦૦૦) કડક ચેક'
  },
  {
    id: 'namo-saraswati',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'નમો સરસ્વતી વિજ્ઞાન સાધના યોજના',
    titleEn: 'Namo Saraswati Vigyan Sadhana Yojana',
    department: 'શિક્ષણ વિભાગ, ગુજરાત',
    benefit: '₹25,000 scholarship for students pursuing 11th & 12th Science Stream',
    benefitGu: 'ધોરણ ૧૧ અને ૧૨ વિજ્ઞાન પ્રવાહ (સાયન્સ) ના વિદ્યાર્થીઓને ₹૨૫,૦૦૦ સહાય',
    slaDays: 3,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'ધોરણ ૧૦ ની માર્કશીટ', nameEn: 'Std 10 Marksheet', checkType: 'marksheet', required: true },
      { nameGu: 'સાયન્સ પ્રવાહ પ્રવેશ રસીદ', nameEn: '11th/12th Science Stream Receipt', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'વિજ્ઞાન પ્રવાહ (ગ્રૂપ A/B/AB) નામાંકન ચકાસણી'
  },
  {
    id: 'digital-gujarat-pre',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'ડિજિટલ ગુજરાત શિષ્યવૃત્તિ (પ્રી-મેટ્રિક)',
    titleEn: 'Digital Gujarat Scholarship – Pre-Matric',
    department: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ',
    benefit: 'Annual scholarship for SC, ST, SEBC, EWS students in Std 1 to 10',
    benefitGu: 'ધોરણ ૧ થી ૧૦ ના SC/ST/OBC વિદ્યાર્થીઓને વાર્ષિક શિષ્યવૃત્તિ અને ગણવેશ સહાય',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: 'જાતિનો દાખલો', nameEn: 'Caste Certificate', checkType: 'caste_cert', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'આધાર કાર્ડ અને બેંક પાસબુક', nameEn: 'Aadhaar & Bank Passbook', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'જાતિ અને ૩-વર્ષ આવક દાખલો (< ₹૨.૫ લાખ) ચેક'
  },
  {
    id: 'digital-gujarat-post',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'ડિજિટલ ગુજરાત શિષ્યવૃત્તિ (પોસ્ટ-મેટ્રિક)',
    titleEn: 'Digital Gujarat Scholarship – Post-Matric',
    department: 'સામાજિક ન્યાય / આદિજાતિ વિકાસ',
    benefit: 'Full maintenance allowance and tuition fees for college/diploma students',
    benefitGu: 'કોલેજ અને ડિપ્લોમાના અનામત વર્ગના વિદ્યાર્થીઓને સંપૂર્ણ ફી અને નિર્વાહ ભથ્થું',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: 'જાતિનો દાખલો', nameEn: 'Caste Certificate', checkType: 'caste_cert', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'કોલેજ બોનાફાઇડ અને ફી રસીદ', nameEn: 'College Bonafide & Fee Receipt', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'કોલેજ માન્યતા અને ૩-વર્ષ આવક મર્યાદા ચકાસણી'
  },
  {
    id: 'cmss-scholarship',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'મુખ્યમંત્રી સ્કોલરશીપ સ્કીમ (CMSS)',
    titleEn: 'Chief Minister Scholarship Scheme (CMSS)',
    department: 'શિક્ષણ વિભાગ, ગુજરાત સરકાર',
    benefit: 'Special merit scholarship for underprivileged bright students in higher education',
    benefitGu: 'હોનહાર તેજસ્વી વિદ્યાર્થીઓ માટે ઉચ્ચ અભ્યાસ અર્થે વિશેષ મેરિટ શિષ્યવૃત્તિ',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: 'બોર્ડ મેરિટ માર્કશીટ', nameEn: 'Board Merit Marksheet', checkType: 'marksheet', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય, < ₹૪.૫ લાખ)', nameEn: 'Income Certificate (3-Year, < ₹4.5L)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'મેરિટ રેન્ક અને ૩-વર્ષ આવક પ્રમાણપત્ર'
  },
  {
    id: 'saraswati-sadhana-cycle',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'સરસ્વતી સાધના સાયકલ સહાય યોજના',
    titleEn: 'Saraswati Sadhana Bicycle Scheme',
    department: 'સામાજિક ન્યાય અને અધિકારિતા વિભાગ',
    benefit: 'Free brand-new bicycle for girls entering Std 9 in rural and urban schools',
    benefitGu: 'ધોરણ ૯ માં પ્રવેશ મેળવતી દીકરીઓને શાળાએ જવા માટે તદ્દન મફત સાયકલ સહાય',
    slaDays: 3,
    fee: 0,
    requiredDocs: [
      { nameGu: 'ધોરણ ૮ પાસ માર્કશીટ', nameEn: 'Std 8 Pass Marksheet', checkType: 'marksheet', required: true },
      { nameGu: 'ધોરણ ૯ માં શાળા પ્રવેશ દાખલો', nameEn: 'Std 9 School Admission Slip', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ અને જાતિનો દાખલો', nameEn: 'Aadhaar & Caste Certificate', checkType: 'caste_cert', required: true }
    ],
    validationRuleDesc: 'ધોરણ ૯ શાળા પ્રવેશ અને જાતિ કેટેગરી ચેક'
  },
  {
    id: 'foreign-study-loan',
    category: 'education',
    categoryGu: 'શિક્ષણ',
    categoryEn: 'Education & Scholarships',
    titleGu: 'વિદેશ અભ્યાસ લોન સહાય યોજના',
    titleEn: 'Foreign Study Education Loan Assistance',
    department: 'બિનઅનામત શૈક્ષણિક અને આર્થિક વિકાસ નિગમ (GUEEDC)',
    benefit: 'Education loan up to ₹15 Lakh at only 4% simple interest rate',
    benefitGu: 'વિદેશમાં ઉચ્ચ અભ્યાસ માટે માત્ર ૪% ના રાહત દરે ₹૧૫ લાખ સુધીની શૈક્ષણિક લોન',
    slaDays: 10,
    fee: 0,
    requiredDocs: [
      { nameGu: 'વિદેશી યુનિવર્સિટી I-20 / Offer Letter', nameEn: 'Foreign University Offer Letter / I-20', checkType: 'generic', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'પાસપોર્ટ અને વિઝા નકલ', nameEn: 'Passport & Visa Copy', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'યુનિવર્સિટી માન્યતા, પાસપોર્ટ અને ૩-વર્ષ આવક દાખલો'
  },

  // 🏠 4. HOUSING, EMPLOYMENT & WELFARE (11 SCHEMES)
  {
    id: 'pmay-gramin',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'પ્રધાનમંત્રી આવાસ યોજના – ગ્રામીણ (PMAY-G)',
    titleEn: 'Pradhan Mantri Awas Yojana – Gramin (PMAY-G)',
    department: 'ગ્રામ વિકાસ મંત્રાલય',
    benefit: '₹1,20,000 financial aid + MGNREGA 90 days wages + ₹12,000 toilet grant',
    benefitGu: 'ગ્રામીણ વિસ્તારમાં પાકું મકાન બનાવવા માટે ₹૧,૨૦,૦૦૦ + મનરેગા મજૂરી સહાય',
    slaDays: 15,
    fee: 0,
    requiredDocs: [
      { nameGu: 'કાચું મકાન / પ્લોટ જમીન દસ્તાવેજ', nameEn: 'Plot / Kutcha House Document', checkType: 'generic', required: true },
      { nameGu: 'SECC 2011 / BPL કાર્ડ અથવા જોબ કાર્ડ', nameEn: 'BPL Card / MGNREGA Job Card', checkType: 'generic', required: true },
      { nameGu: 'પરિવારના તમામ આધાર કાર્ડ', nameEn: 'Family Aadhaar Cards', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ભારતમાં અન્ય કોઈ પાકું મકાન ન હોવાની સ્વ-ઘોષણા અને પ્લોટ ચેક'
  },
  {
    id: 'pmay-urban',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'પ્રધાનમંત્રી આવાસ યોજના – શહેરી (PMAY-U)',
    titleEn: 'Pradhan Mantri Awas Yojana – Urban (PMAY-U)',
    department: 'શહેરી વિકાસ અને ગૃહ નિર્માણ',
    benefit: 'Up to ₹2.50 Lakh interest subsidy (CLSS) on home loan for EWS/LIG',
    benefitGu: 'શહેરમાં મકાન ખરીદવા કે બનાવવા માટે ₹૨.૫૦ લાખ સુધીની વ્યાજ સબસિડી',
    slaDays: 15,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આવકનો દાખલો (EWS < ₹૩ લાખ, LIG < ₹૬ લાખ)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'મકાન પ્લોટ / ફ્લેટ બુકિંગ એગ્રીમેન્ટ', nameEn: 'Allotment / Plot Agreement', checkType: 'generic', required: true }
    ],
    validationRuleDesc: '૩-વર્ષ આવક દાખલો અને શહેરી રહેઠાણ પુરાવો'
  },
  {
    id: 'dr-ambedkar-awas',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'ડૉ. બાબાસાહેબ આંબેડકર આવાસ યોજના',
    titleEn: 'Dr. Ambedkar Awas Yojana',
    department: 'સામાજિક ન્યાય અને અધિકારિતા વિભાગ',
    benefit: '₹1,20,000 assistance in 3 installments to build house on own plot',
    benefitGu: 'અનુસૂચિત જાતિ (SC) ના પરિવારોને પ્લોટ પર મકાન બાંધકામ માટે ₹૧,૨૦,૦૦૦ સહાય',
    slaDays: 10,
    fee: 0,
    requiredDocs: [
      { nameGu: 'SC જાતિનો દાખલો', nameEn: 'SC Caste Certificate', checkType: 'caste_cert', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય, ગ્રામીણ ₹૧.૨L / શહેરી ₹૧.૫L)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'પ્લોટની માલિકી હક સનદ / દસ્તાવેજ', nameEn: 'Plot Title / Sanad Document', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ અને બેંક પાસબુક', nameEn: 'Aadhaar & Bank Passbook', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'SC જાતિ પ્રમાણપત્ર અને ૩-વર્ષ આવક મર્યાદા'
  },
  {
    id: 'pandit-deendayal-awas',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'પંડિત દીનદયાળ ઉપાધ્યાય આવાસ યોજના',
    titleEn: 'Pandit Deendayal Awas Yojana',
    department: 'સામાજિક ન્યાય અને સામાજિક કલ્યાણ',
    benefit: '₹1,20,000 financial grant for SEBC/OBC/EWS families to build house',
    benefitGu: 'સામાજિક-શૈક્ષણિક પછાત વર્ગ (OBC) પરિવારોને મકાન બાંધકામ માટે ₹૧,૨૦,૦૦૦ સહાય',
    slaDays: 10,
    fee: 0,
    requiredDocs: [
      { nameGu: 'SEBC/OBC જાતિનો દાખલો', nameEn: 'SEBC/OBC Caste Certificate', checkType: 'caste_cert', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'પ્લોટ / જમીન માલિકી દસ્તાવેજ', nameEn: 'Plot Ownership Document', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: '૩-વર્ષ આવક દાખલો અને પ્લોટ માલિકી વેલિડેશન'
  },
  {
    id: 'manav-garima',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'માનવ ગરિમા યોજના (૨૮ વ્યવસાય કિટ)',
    titleEn: 'Manav Garima Yojana',
    department: 'કુટીર અને ગ્રામોદ્યોગ વિભાગ',
    benefit: 'Free complete toolkit/equipment across 28 self-employment vocations',
    benefitGu: 'કડીયાકામ, સિલાઈ, સુથારી, કડિયાકામ સહિત ૨૮ વ્યવસાયો માટે વિનામૂલ્યે ઓજારોની કીટ',
    slaDays: 7,
    fee: 0,
    requiredDocs: [
      { nameGu: 'આધાર કાર્ડ અને રેશન કાર્ડ', nameEn: 'Aadhaar & Ration Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'જાતિનો દાખલો', nameEn: 'Caste Certificate', checkType: 'caste_cert', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય, ગ્રામીણ ₹૧.૨L / શહેરી ₹૧.૫L)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'વ્યવસાય અનુભવ અથવા તાલીમ પ્રમાણપત્ર', nameEn: 'Trade Training / Experience Proof', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'ઉંમર ૧૮ થી ૬૦ વર્ષ અને ૩-વર્ષ આવક દાખલો (< ₹૧,૨૦,૦૦૦)'
  },
  {
    id: 'vahli-dikri',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'વ્હાલી દીકરી યોજના',
    titleEn: 'Vahli Dikri Yojana',
    department: 'મહિલા અને બાળ વિકાસ વિભાગ',
    benefit: '₹1,10,000 total aid (₹4K in Std 1, ₹6K in Std 9, ₹1 Lakh at age 18)',
    benefitGu: 'દીકરીના જન્મ પર કુલ ₹૧,૧૦,૦૦૦ સહાય (ધો. ૧ માં ₹૪,૦૦૦, ધો. ૯ માં ₹૬,૦૦૦ અને ૧૮ વર્ષે ₹૧ લાખ)',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: 'દીકરીનો જન્મનો દાખલો (૦૨/૦૮/૨૦૧૯ પછી)', nameEn: 'Daughter Birth Certificate (After 02/08/2019)', checkType: 'generic', required: true },
      { nameGu: 'માતા-પિતાનું આધાર કાર્ડ અને લગ્ન નોંધણી દાખલો', nameEn: "Parents' Aadhaar & Marriage Certificate", checkType: 'aadhaar_regex', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય, વાર્ષિક < ₹૨ લાખ)', nameEn: 'Income Certificate (3-Year, < ₹2L)', checkType: 'income_expiry_3yr', required: true }
    ],
    validationRuleDesc: 'જન્મ તારીખ ૦૨/૦૮/૨૦૧૯ પછી અને ૩-વર્ષ આવક દાખલો (< ₹૨,૦૦,૦૦૦)'
  },
  {
    id: 'kunwarbai-mameru',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'કુંવરબાઈનું મામેરું યોજના',
    titleEn: 'Kunwarbai Nu Mameru Yojana',
    department: 'સામાજિક ન્યાય અને અધિકારિતા વિભાગ',
    benefit: '₹12,000 financial assistance directly deposited in bride’s bank account',
    benefitGu: 'દીકરીના લગ્ન પ્રસંગે કન્યાના બેંક ખાતામાં સીધા ₹૧૨,૦૦૦ જમા સહાય',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: 'લગ્ન નોંધણી પ્રમાણપત્ર (૨ વર્ષની અંદર)', nameEn: 'Marriage Certificate (Within 2 years)', checkType: 'generic', required: true },
      { nameGu: 'કન્યા અને વરરાજાનું આધાર કાર્ડ', nameEn: "Bride & Groom's Aadhaar Cards", checkType: 'aadhaar_regex', required: true },
      { nameGu: 'આવકનો દાખલો (૩-વર્ષ માન્ય)', nameEn: 'Income Certificate (3-Year)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'કન્યાની બેંક પાસબુક', nameEn: "Bride's Bank Passbook", checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'લગ્ન તારીખથી ૨ વર્ષની મર્યાદા, કન્યા ઉંમર ૧૮+ અને ૩-વર્ષ આવક પ્રમાણપત્ર'
  },
  {
    id: 'sathshri-seva-divyang',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'સંત સૂરદાસ / સાથશ્રી સેવા દિવ્યાંગ પેન્શન',
    titleEn: 'Sathshri Seva / Sant Surdas Divyang Pension',
    department: 'સામાજિક ન્યાય અને સામાજિક સુરક્ષા',
    benefit: '₹1,000 per month financial pension for persons with 80%+ disability',
    benefitGu: '૮૦% કે તેથી વધુ દિવ્યાંગતા ધરાવતા વ્યક્તિઓને દર મહિને ₹૧,૦૦૦ પેન્શન',
    slaDays: 5,
    fee: 0,
    requiredDocs: [
      { nameGu: 'UDID / દિવ્યાંગતા પ્રમાણપત્ર (૮૦%+)', nameEn: 'Disability Certificate with UDID (80%+)', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ', nameEn: 'Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'BPL કાર્ડ અથવા આવકનો દાખલો', nameEn: 'BPL Card / Income Certificate', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'બેંક પાસબુક', nameEn: 'Bank Passbook', checkType: 'generic', required: true }
    ],
    validationRuleDesc: 'UDID દિવ્યાંગતા ૮૦%+ અને ઉંમર ૦ થી ૬૫ વર્ષ'
  },
  {
    id: 'income-certificate-service',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'આવકનો દાખલો (૩ વર્ષની માન્યતા)',
    titleEn: 'Income Certificate (3-Year Legal Validity)',
    department: 'મહેસૂલ વિભાગ (મામલતદાર કચેરી)',
    benefit: 'Official digital income certificate valid for 3 financial years for all schemes',
    benefitGu: 'તમામ સરકારી યોજનાઓ માટે સત્તાવાર ૩ નાણાકીય વર્ષ માન્ય આવક પ્રમાણપત્ર',
    slaDays: 3,
    fee: 20,
    validityYears: 3,
    requiredDocs: [
      { nameGu: 'રેશન કાર્ડ અને આધાર કાર્ડ', nameEn: 'Ration Card & Aadhaar Card', checkType: 'aadhaar_regex', required: true },
      { nameGu: 'તલાટીનો આવક પંચનામુ / દાખલો', nameEn: 'Talati Income Panchnama', checkType: 'generic', required: true },
      { nameGu: 'છેલ્લા વર્ષનું લાઈટ બિલ', nameEn: 'Electricity Bill', checkType: 'generic', required: true },
      { nameGu: 'નોકરીયાત માટે ફોર્મ ૧૬ અથવા IT રિટર્ન', nameEn: 'Form 16 / IT Return / Affidavit', checkType: 'generic', required: false }
    ],
    validationRuleDesc: 'તલાટી પંચનામું અને ૩ નાણાકીય વર્ષ કાનૂની સમયાવધિ GRTSA 2013'
  },
  {
    id: 'caste-certificate-service',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'જાતિનો દાખલો (SC/ST/SEBC/EWS)',
    titleEn: 'Caste Certificate (SC / ST / SEBC / EWS)',
    department: 'સામાજિક ન્યાય / મામલતદાર કચેરી',
    benefit: 'Official permanent community certificate for education and reservations',
    benefitGu: 'અનામત, શિષ્યવૃત્તિ અને સરકારી નોકરીઓ માટે આજીવન માન્ય જાતિ પ્રમાણપત્ર',
    slaDays: 3,
    fee: 20,
    requiredDocs: [
      { nameGu: 'શાળા છોડ્યાનું પ્રમાણપત્ર (L.C.)', nameEn: 'School Leaving Certificate (L.C.)', checkType: 'generic', required: true },
      { nameGu: 'પિતા / કાકાનું શાળા છોડ્યાનું પ્રમાણપત્ર', nameEn: "Father's / Uncle's Leaving Certificate", checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ અને રેશન કાર્ડ', nameEn: 'Aadhaar Card & Ration Card', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: '૧૯૭૮ પહેલાંનો ગુજરાત વસવાટ પુરાવો અને પેઢીનામા વેરિફિકેશન'
  },
  {
    id: 'widow-assistance-scheme',
    category: 'welfare',
    categoryGu: 'આવાસ અને કલ્યાણ',
    categoryEn: 'Housing & Family Welfare',
    titleGu: 'ગંગા સ્વરૂપા વિધવા સહાય યોજના (Widow Assistance)',
    titleEn: 'Widow Assistance Scheme (Ganga Swarupa Pension)',
    department: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ',
    benefit: 'Monthly pension of ₹1,250 directly via DBT bank transfer for destitute widows',
    benefitGu: 'વિધવા માતા-બહેનોને દર મહિને ₹૧,૨૫૦ આર્થિક સહાય પેન્શન સીધું બેંક ખાતામાં',
    slaDays: 15,
    fee: 20,
    validityYears: 3,
    requiredDocs: [
      { nameGu: 'પતિના મરણનો દાખલો (Death Certificate)', nameEn: 'Husband Death Certificate', checkType: 'generic', required: true },
      { nameGu: 'આવકનો દાખલો (૩ વર્ષ માન્યતા)', nameEn: 'Income Certificate (3-Yr Validity)', checkType: 'income_expiry_3yr', required: true },
      { nameGu: 'પુનઃલગ્ન ન કર્યાનું સોગંદનામું', nameEn: 'Affidavit of Non-Remarriage', checkType: 'generic', required: true },
      { nameGu: 'આધાર કાર્ડ અને બેંક પાસબુક', nameEn: 'Aadhaar & Bank Passbook', checkType: 'aadhaar_regex', required: true }
    ],
    validationRuleDesc: 'પતિના મૃત્યુ દાખલા અને ૩-વર્ષ આવક પ્રમાણપત્ર કાયદેસરતા ચકાસણી'
  }
];

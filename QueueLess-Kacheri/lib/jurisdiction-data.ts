export interface TalukaOffice {
  id: string;
  nameGu: string;
  nameEn: string;
  officeNameGu: string;
  officeNameEn: string;
  counters: Array<{
    number: number;
    nameGu: string;
    nameEn: string;
    officerName: string;
    services: string[];
  }>;
}

export interface DistrictItem {
  id: string;
  nameGu: string;
  nameEn: string;
  headquarters: string;
  talukas: TalukaOffice[];
}

export const GUJARAT_33_DISTRICTS: DistrictItem[] = [
  {
    id: 'rajkot',
    nameGu: 'રાજકોટ',
    nameEn: 'Rajkot',
    headquarters: 'રાજકોટ',
    talukas: [
      {
        id: 'gondal',
        nameGu: 'ગોંડલ',
        nameEn: 'Gondal',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી ગોંડલ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Gondal',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ & પેન્શન', nameEn: 'Social Welfare & Pension', officerName: 'કે. એમ. ત્રિવેદી', services: ['widow', 'pension', 'divyang', 'scholarship'] },
          { number: 2, nameGu: 'જન સેવા પ્રમાણપત્રો (આવક/જાતિ)', nameEn: 'Certificates (Income/Caste)', officerName: 'પી. આર. જાડેજા', services: ['income', 'caste', 'ews', 'cremilayer'] },
          { number: 3, nameGu: 'રેશનકાર્ડ & પુરવઠા સેવા', nameEn: 'Ration Card & Food Supply', officerName: 'એસ. ટી. પટેલ', services: ['ration', 'nfsa', 'bpl'] },
          { number: 4, nameGu: 'ઈ-ધરા કેન્દ્ર (૭/૧૨ & ખેતી)', nameEn: 'E-Dhara (7/12 & Land Records)', officerName: 'વી. કે. મહેતા', services: ['land', '712', '8a', 'ikhedut', 'agriculture'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર (બાયોમેટ્રિક)', nameEn: 'Aadhaar Biometric Center', officerName: 'એ. જે. સોલંકી', services: ['aadhaar', 'biometric', 'update'] },
          { number: 6, nameGu: 'આવાસ & સામાન્ય પૂછપરછ', nameEn: 'Housing Schemes & General Desk', officerName: 'એન. બી. ચાવડા', services: ['awas', 'housing', 'pmay', 'general'] }
        ]
      },
      {
        id: 'rajkot-rural',
        nameGu: 'રાજકોટ ગ્રામ્ય',
        nameEn: 'Rajkot Rural',
        officeNameGu: 'જન સેવા કેન્દ્ર • તાલુકા મામલતદાર કચેરી રાજકોટ ગ્રામ્ય',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Rajkot Rural',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ & પેન્શન', nameEn: 'Welfare & Pension', officerName: 'આર. એન. ગોહિલ', services: ['widow', 'pension', 'welfare'] },
          { number: 2, nameGu: 'આવક & જાતિ પ્રમાણપત્રો', nameEn: 'Certificates (Income/Caste)', officerName: 'ડી. એચ. વાઘેલા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ ડેસ્ક', nameEn: 'Ration Desk', officerName: 'એમ. પી. પંચાલ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા (૭/૧૨ રેકોર્ડ્સ)', nameEn: 'E-Dhara (7/12 Land)', officerName: 'જે. કે. વ્યાસ', services: ['land', '712', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર બાયોમેટ્રિક', nameEn: 'Aadhaar Biometric', officerName: 'એચ. એલ. રાઠોડ', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ & ગ્રામ વિકાસ', nameEn: 'Rural Housing Desk', officerName: 'બી. એમ. દવે', services: ['awas', 'pmay'] }
        ]
      },
      {
        id: 'jetpur',
        nameGu: 'જેતપુર',
        nameEn: 'Jetpur',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી જેતપુર',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Jetpur',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Social Welfare', officerName: 'ટી. એસ. શેખ', services: ['welfare', 'pension'] },
          { number: 2, nameGu: 'પ્રમાણપત્ર વિતરણ', nameEn: 'Certificates', officerName: 'કે. જી. રામાણી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા શાખા', nameEn: 'Food Supply', officerName: 'વી. એમ. બોરીચા', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ખેતીવાડી', nameEn: 'E-Dhara Agri', officerName: 'એન. કે. ચોવટિયા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કાઉન્ટર', nameEn: 'Aadhaar Desk', officerName: 'એમ. ડી. જાની', services: ['aadhaar'] },
          { number: 6, nameGu: 'સામાન્ય સેવા', nameEn: 'General Services', officerName: 'પી. સી. વાળા', services: ['general'] }
        ]
      },
      {
        id: 'dhoraji',
        nameGu: 'ધોરાજી',
        nameEn: 'Dhoraji',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી ધોરાજી',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Dhoraji',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ & પેન્શન', nameEn: 'Social Welfare', officerName: 'એચ. આર. પરમાર', services: ['welfare'] },
          { number: 2, nameGu: 'આવક/જાતિ દાખલા', nameEn: 'Certificates', officerName: 'જે. બી. મકવાણા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'કે. એમ. પટેલ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા જમીન', nameEn: 'E-Dhara', officerName: 'એસ. કે. જોષી', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'બી. ટી. સોલંકી', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સેવાઓ', nameEn: 'Housing Desk', officerName: 'એ. વી. મહેતા', services: ['awas'] }
        ]
      },
      {
        id: 'jasdan',
        nameGu: 'જસદણ',
        nameEn: 'Jasdan',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી જસદણ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Jasdan',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Social Welfare', officerName: 'ડી. પી. ખાચર', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'આર. એમ. ડાભી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા ડેસ્ક', nameEn: 'Supplies', officerName: 'એન. વી. બારૈયા', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'કે. એલ. મિયાત્રા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'એસ. જે. કંટારિયા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ યોજના', nameEn: 'Housing', officerName: 'એમ. કે. ઝાલા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'ahmedabad',
    nameGu: 'અમદાવાદ',
    nameEn: 'Ahmedabad',
    headquarters: 'અમદાવાદ',
    talukas: [
      {
        id: 'ahmedabad-city-west',
        nameGu: 'અમદાવાદ પશ્ચિમ',
        nameEn: 'Ahmedabad West',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી પશ્ચિમ અમદાવાદ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Ahmedabad West',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ & પેન્શન', nameEn: 'Social Welfare', officerName: 'એ. પી. શાહ', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી (આવક/જાતિ)', nameEn: 'Certificates Desk', officerName: 'આર. કે. દેસાઈ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ સેવાઓ', nameEn: 'Ration Desk', officerName: 'જે. એમ. પટેલ', services: ['ration'] },
          { number: 4, nameGu: 'જમીન મહેસૂલ શાખા', nameEn: 'Revenue Desk', officerName: 'પી. એલ. ત્રિવેદી', services: ['land', '712'] },
          { number: 5, nameGu: 'બાયોમેટ્રિક આધાર કેન્દ્ર', nameEn: 'UIDAI Center', officerName: 'કે. એન. સોની', services: ['aadhaar'] },
          { number: 6, nameGu: 'PMAY શહેરી આવાસ', nameEn: 'PMAY Urban', officerName: 'એસ. બી. મેવાડા', services: ['awas'] }
        ]
      },
      {
        id: 'daskroi',
        nameGu: 'દસ્ક્રોઈ',
        nameEn: 'Daskroi',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી દસ્ક્રોઈ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Daskroi',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા', nameEn: 'Social Security', officerName: 'એચ. કે. ઠાકોર', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'એમ. આર. રાવળ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા વિતરણ', nameEn: 'Supplies', officerName: 'બી. એસ. પ્રજાપતિ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'વી. ટી. પટેલ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'જે. એસ. ચૌહાણ', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સેવાઓ', nameEn: 'Housing', officerName: 'ડી. એન. પંડ્યા', services: ['awas'] }
        ]
      },
      {
        id: 'sanand',
        nameGu: 'સાણંદ',
        nameEn: 'Sanand',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી સાણંદ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Sanand',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'કે. બી. વાઘેલા', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી', nameEn: 'Certificates', officerName: 'એન. પી. જોશી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ', nameEn: 'Ration', officerName: 'એસ. એમ. પટેલ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ખેતી', nameEn: 'E-Dhara Land', officerName: 'પી. કે. બારોટ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'એ. આર. પરમાર', services: ['aadhaar'] },
          { number: 6, nameGu: 'સામાન્ય સેવાઓ', nameEn: 'General', officerName: 'ટી. જે. વણકર', services: ['general'] }
        ]
      }
    ]
  },
  {
    id: 'surat',
    nameGu: 'સુરત',
    nameEn: 'Surat',
    headquarters: 'સુરત',
    talukas: [
      {
        id: 'surat-city',
        nameGu: 'સુરત શહેર (મજૂરા)',
        nameEn: 'Surat City (Majura)',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી મજૂરા સુરત',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Majura Surat',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા & પેન્શન', nameEn: 'Social Security', officerName: 'જે. કે. મોદી', services: ['welfare'] },
          { number: 2, nameGu: 'આવક/જાતિ પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'વી. એમ. પટેલ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ ડેસ્ક', nameEn: 'Ration Desk', officerName: 'એચ. પી. કાપડિયા', services: ['ration'] },
          { number: 4, nameGu: 'જમીન મહેસૂલ શાખા', nameEn: 'Revenue Desk', officerName: 'ડી. એલ. ચૌધરી', services: ['land'] },
          { number: 5, nameGu: 'બાયોમેટ્રિક આધાર', nameEn: 'Aadhaar Desk', officerName: 'એસ. એન. ગામીત', services: ['aadhaar'] },
          { number: 6, nameGu: 'શહેરી આવાસ (PMAY)', nameEn: 'PMAY Urban', officerName: 'પી. આર. ગાંધી', services: ['awas'] }
        ]
      },
      {
        id: 'bardoli',
        nameGu: 'બારડોલી',
        nameEn: 'Bardoli',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી બારડોલી',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Bardoli',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એન. બી. પટેલ', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્ર વિતરણ', nameEn: 'Certificates', officerName: 'કે. આર. રાઠોડ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા સેવા', nameEn: 'Supplies', officerName: 'આર. ટી. વસાવા', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨ ખેતી', nameEn: 'E-Dhara Land', officerName: 'એમ. પી. દેસાઈ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'જે. એચ. મહેતા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ યોજના', nameEn: 'Housing', officerName: 'એસ. કે. હળપતિ', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'vadodara',
    nameGu: 'વડોદરા',
    nameEn: 'Vadodara',
    headquarters: 'વડોદરા',
    talukas: [
      {
        id: 'vadodara-west',
        nameGu: 'વડોદરા પશ્ચિમ (અકોટા)',
        nameEn: 'Vadodara West (Akota)',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી અકોટા વડોદરા',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Akota Vadodara',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ પેન્શન', nameEn: 'Welfare', officerName: 'એ. એમ. પઠાણ', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો (આવક/જાતિ)', nameEn: 'Certificates', officerName: 'કે. પી. પંડ્યા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ શાખા', nameEn: 'Ration', officerName: 'વી. એસ. શાહ', services: ['ration'] },
          { number: 4, nameGu: 'મહેસૂલ & ઈ-ધરા', nameEn: 'E-Dhara', officerName: 'પી. એન. જોષી', services: ['land'] },
          { number: 5, nameGu: 'આધાર બાયોમેટ્રિક', nameEn: 'Aadhaar', officerName: 'આર. કે. પરમાર', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ & જનરલ', nameEn: 'Housing Desk', officerName: 'એસ. એલ. દરબાર', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'gandhinagar',
    nameGu: 'ગાંધીનગર',
    nameEn: 'Gandhinagar',
    headquarters: 'ગાંધીનગર',
    talukas: [
      {
        id: 'gandhinagar-city',
        nameGu: 'ગાંધીનગર શહેર',
        nameEn: 'Gandhinagar City',
        officeNameGu: 'જન સેવા કેન્દ્ર • કલેક્ટર કચેરી સંકુલ ગાંધીનગર',
        officeNameEn: 'Jan Seva Kendra • Collectorate Complex Gandhinagar',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા શાખા', nameEn: 'Social Welfare', officerName: 'એચ. એન. બ્રહ્મભટ્ટ', services: ['welfare'] },
          { number: 2, nameGu: 'ડિજિટલ પ્રમાણપત્રો', nameEn: 'Digital Certificates', officerName: 'જે. આર. ચૌધરી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'અન્ન & નાગરિક પુરવઠા', nameEn: 'Food Supplies', officerName: 'કે. કે. પટેલ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા & જમીન સુધારણા', nameEn: 'E-Dhara Land', officerName: 'વી. બી. પ્રજાપતિ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'UIDAI આધાર કેન્દ્ર', nameEn: 'UIDAI Center', officerName: 'પી. એમ. રાવળ', services: ['aadhaar'] },
          { number: 6, nameGu: 'સ્ટેટ પ્રોટોકોલ & આવાસ', nameEn: 'State Housing Desk', officerName: 'એમ. ટી. વાઘેલા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'bhavnagar',
    nameGu: 'ભાવનગર',
    nameEn: 'Bhavnagar',
    headquarters: 'ભાવનગર',
    talukas: [
      {
        id: 'bhavnagar-city',
        nameGu: 'ભાવનગર શહેર',
        nameEn: 'Bhavnagar City',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી ભાવનગર',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Bhavnagar',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Social Welfare', officerName: 'ડી. પી. ગોહિલ', services: ['welfare'] },
          { number: 2, nameGu: 'આવક/જાતિ દાખલા', nameEn: 'Certificates', officerName: 'કે. એલ. જાડેજા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ શાખા', nameEn: 'Ration Supplies', officerName: 'એન. વી. ત્રિવેદી', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'આર. એમ. મોરી', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar Desk', officerName: 'પી. જે. સરવૈયા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સહાય', nameEn: 'Housing Desk', officerName: 'એસ. ટી. કાંબડ', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'jamnagar',
    nameGu: 'જામનગર',
    nameEn: 'Jamnagar',
    headquarters: 'જામનગર',
    talukas: [
      {
        id: 'jamnagar-city',
        nameGu: 'જામનગર શહેર',
        nameEn: 'Jamnagar City',
        officeNameGu: 'જન સેવા કેન્દ્ર • લાલ બંગલો મામલતદાર કચેરી જામનગર',
        officeNameEn: 'Jan Seva Kendra • Lal Bunglow Mamlatdar Jamnagar',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એમ. કે. જાડેજા', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી', nameEn: 'Certificates', officerName: 'પી. એન. ભટ્ટ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'આર. કે. પટેલ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા', nameEn: 'E-Dhara', officerName: 'જે. એસ. વાળા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'વી. એમ. સોઢા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ યોજના', nameEn: 'Housing', officerName: 'કે. એચ. ચુડાસમા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'junagadh',
    nameGu: 'જૂનાગઢ',
    nameEn: 'Junagadh',
    headquarters: 'જૂનાગઢ',
    talukas: [
      {
        id: 'junagadh-city',
        nameGu: 'જૂનાગઢ શહેર',
        nameEn: 'Junagadh City',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી જૂનાગઢ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Junagadh',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા', nameEn: 'Welfare', officerName: 'બી. એચ. વાળા', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. વી. સોલંકી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ', nameEn: 'Ration', officerName: 'એમ. એન. જોશી', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'આર. પી. ચાવડા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'એ. કે. બાંભણિયા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સહાય', nameEn: 'Housing', officerName: 'એસ. એમ. પરમાર', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'kutch',
    nameGu: 'કચ્છ',
    nameEn: 'Kutch',
    headquarters: 'ભુજ',
    talukas: [
      {
        id: 'bhuj',
        nameGu: 'ભુજ',
        nameEn: 'Bhuj',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી ભુજ-કચ્છ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Bhuj-Kutch',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ & સરહદી સહાય', nameEn: 'Welfare & Border Grants', officerName: 'એ. જે. જાડેજા', services: ['welfare'] },
          { number: 2, nameGu: 'આવક/જાતિ પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. એમ. મહેશ્વરી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા સેવા', nameEn: 'Supplies', officerName: 'વી. ટી. ગઢવી', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા જમીન મહેસૂલ', nameEn: 'E-Dhara Land', officerName: 'પી. એલ. આહીર', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'બાયોમેટ્રિક આધાર', nameEn: 'Aadhaar', officerName: 'એચ. કે. છાંગા', services: ['aadhaar'] },
          { number: 6, nameGu: 'કચ્છ આવાસ પુનર્વસન', nameEn: 'Housing Desk', officerName: 'એન. એસ. ભટ્ટી', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'anand',
    nameGu: 'આણંદ',
    nameEn: 'Anand',
    headquarters: 'આણંદ',
    talukas: [
      {
        id: 'anand-city',
        nameGu: 'આણંદ',
        nameEn: 'Anand',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી આણંદ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Anand',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'આર. એમ. પટેલ', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. કે. સોલંકી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ', nameEn: 'Ration', officerName: 'જે. પી. પરમાર', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'વી. એન. પંડ્યા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'એસ. બી. શાહ', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ ડેસ્ક', nameEn: 'Housing', officerName: 'એમ. એચ. રોહિત', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'mehsana',
    nameGu: 'મહેસાણા',
    nameEn: 'Mehsana',
    headquarters: 'મહેસાણા',
    talukas: [
      {
        id: 'mehsana-city',
        nameGu: 'મહેસાણા',
        nameEn: 'Mehsana',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી મહેસાણા',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Mehsana',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'પી. કે. ચૌધરી', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી', nameEn: 'Certificates', officerName: 'એન. જે. પટેલ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'કે. વી. પ્રજાપતિ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ખેતીવાડી', nameEn: 'E-Dhara', officerName: 'આર. બી. વ્યાસ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'એ. ટી. રાવળ', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સેવા', nameEn: 'Housing', officerName: 'બી. એમ. ઠાકોર', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'banaskantha',
    nameGu: 'બનાસકાંઠા',
    nameEn: 'Banaskantha',
    headquarters: 'પાલનપુર',
    talukas: [
      {
        id: 'palanpur',
        nameGu: 'પાલનપુર',
        nameEn: 'Palanpur',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી પાલનપુર',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Palanpur',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા & આદિજાતિ', nameEn: 'Social Welfare', officerName: 'વી. કે. જોશી', services: ['welfare'] },
          { number: 2, nameGu: 'આવક/જાતિ પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'એમ. પી. ચૌધરી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા શાખા', nameEn: 'Food Supplies', officerName: 'આર. એસ. રાજપૂત', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨ કિસાન', nameEn: 'E-Dhara Land', officerName: 'જે. એન. પટેલ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર બાયોમેટ્રિક', nameEn: 'Aadhaar', officerName: 'કે. એલ. બારોટ', services: ['aadhaar'] },
          { number: 6, nameGu: 'પીએમ આવાસ ગ્રામીણ', nameEn: 'PMAY Gramin', officerName: 'એસ. ડી. વાઘેલા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'morbi',
    nameGu: 'મોરબી',
    nameEn: 'Morbi',
    headquarters: 'મોરબી',
    talukas: [
      {
        id: 'morbi-city',
        nameGu: 'મોરબી',
        nameEn: 'Morbi',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી મોરબી',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Morbi',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'કે. એચ. પટેલ', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'આર. વી. ઝાલા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા ડેસ્ક', nameEn: 'Supplies', officerName: 'એમ. એસ. ડાભી', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'એન. પી. કાલરિયા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'પી. કે. જાડેજા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સેવાઓ', nameEn: 'Housing', officerName: 'વી. એલ. વડગામા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'surendranagar',
    nameGu: 'સુરેન્દ્રનગર',
    nameEn: 'Surendranagar',
    headquarters: 'સુરેન્દ્રનગર',
    talukas: [
      {
        id: 'wadhwan',
        nameGu: 'વઢવાણ',
        nameEn: 'Wadhwan',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી વઢવાણ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Wadhwan',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એચ. એમ. રાણા', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. બી. મકવાણા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'જે. આર. મોરી', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'એસ. એન. પરમાર', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'બી. ટી. પંડ્યા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ યોજના', nameEn: 'Housing', officerName: 'એ. પી. શાહ', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'amreli',
    nameGu: 'અમરેલી',
    nameEn: 'Amreli',
    headquarters: 'અમરેલી',
    talukas: [
      {
        id: 'amreli-city',
        nameGu: 'અમરેલી',
        nameEn: 'Amreli',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી અમરેલી',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Amreli',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એમ. આર. ભુવા', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી', nameEn: 'Certificates', officerName: 'વી. કે. ગોંડલિયા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'પી. એસ. કાછડિયા', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'કે. ટી. વઘાસિયા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'એન. એમ. સાવલિયા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સેવા', nameEn: 'Housing', officerName: 'આર. ડી. સુહાગિયા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'navsari',
    nameGu: 'નવસારી',
    nameEn: 'Navsari',
    headquarters: 'નવસારી',
    talukas: [
      {
        id: 'navsari-city',
        nameGu: 'નવસારી',
        nameEn: 'Navsari',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી નવસારી',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Navsari',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા', nameEn: 'Welfare', officerName: 'જે. એમ. હળપતિ', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. પી. પટેલ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા ડેસ્ક', nameEn: 'Supplies', officerName: 'આર. બી. નાયક', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'એચ. એન. દેસાઈ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર કેન્દ્ર', nameEn: 'Aadhaar', officerName: 'વી. એલ. રાઠોડ', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ સેવાઓ', nameEn: 'Housing', officerName: 'એમ. એસ. વસાવા', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'valsad',
    nameGu: 'વલસાડ',
    nameEn: 'Valsad',
    headquarters: 'વલસાડ',
    talukas: [
      {
        id: 'valsad-city',
        nameGu: 'વલસાડ',
        nameEn: 'Valsad',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી વલસાડ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Valsad',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એન. કે. પટેલ', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી', nameEn: 'Certificates', officerName: 'પી. એમ. ભંડારી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા શાખા', nameEn: 'Supplies', officerName: 'એસ. ટી. ચૌધરી', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'કે. જે. દેસાઈ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'આર. એચ. આહીર', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ ડેસ્ક', nameEn: 'Housing', officerName: 'બી. પી. ટંડેલ', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'kheda',
    nameGu: 'ખેડા',
    nameEn: 'Kheda',
    headquarters: 'નડિયાદ',
    talukas: [
      {
        id: 'nadiad',
        nameGu: 'નડિયાદ',
        nameEn: 'Nadiad',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી નડિયાદ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Nadiad',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એ. કે. વાઘેલા', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. આર. જોશી', services: ['income', 'caste'] },
          { number: 3, nameGu: 'રેશનકાર્ડ', nameEn: 'Ration', officerName: 'એમ. પી. પટેલ', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા', nameEn: 'E-Dhara', officerName: 'વી. જે. શાહ', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર', nameEn: 'Aadhaar', officerName: 'પી. ડી. ચૌહાણ', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ', nameEn: 'Housing', officerName: 'એસ. એન. રાવળ', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'patan',
    nameGu: 'પાટણ',
    nameEn: 'Patan',
    headquarters: 'પાટણ',
    talukas: [
      {
        id: 'patan-city',
        nameGu: 'પાટણ',
        nameEn: 'Patan',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી પાટણ',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Patan',
        counters: [
          { number: 1, nameGu: 'સમાજ સુરક્ષા', nameEn: 'Welfare', officerName: 'આર. કે. પ્રજાપતિ', services: ['welfare'] },
          { number: 2, nameGu: 'પ્રમાણપત્રો', nameEn: 'Certificates', officerName: 'કે. એમ. પટેલ', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'એન. એસ. ઠાકોર', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા', nameEn: 'E-Dhara', officerName: 'જે. વી. મોદી', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર', nameEn: 'Aadhaar', officerName: 'વી. ટી. જોશી', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ', nameEn: 'Housing', officerName: 'પી. એચ. દવે', services: ['awas'] }
        ]
      }
    ]
  },
  {
    id: 'porbandar',
    nameGu: 'પોરબંદર',
    nameEn: 'Porbandar',
    headquarters: 'પોરબંદર',
    talukas: [
      {
        id: 'porbandar-city',
        nameGu: 'પોરબંદર',
        nameEn: 'Porbandar',
        officeNameGu: 'જન સેવા કેન્દ્ર • મામલતદાર કચેરી પોરબંદર',
        officeNameEn: 'Jan Seva Kendra • Mamlatdar Office Porbandar',
        counters: [
          { number: 1, nameGu: 'સમાજ કલ્યાણ', nameEn: 'Welfare', officerName: 'એચ. પી. ઓડેદરા', services: ['welfare'] },
          { number: 2, nameGu: 'દાખલા બારી', nameEn: 'Certificates', officerName: 'કે. એન. મોઢવાડિયા', services: ['income', 'caste'] },
          { number: 3, nameGu: 'પુરવઠા', nameEn: 'Supplies', officerName: 'વી. આર. જાડેજા', services: ['ration'] },
          { number: 4, nameGu: 'ઈ-ધરા ૭/૧૨', nameEn: 'E-Dhara', officerName: 'એમ. કે. બોખીરિયા', services: ['land', 'ikhedut'] },
          { number: 5, nameGu: 'આધાર ડેસ્ક', nameEn: 'Aadhaar', officerName: 'જે. એસ. કુછડિયા', services: ['aadhaar'] },
          { number: 6, nameGu: 'આવાસ ડેસ્ક', nameEn: 'Housing', officerName: 'પી. ટી. કારાવદરા', services: ['awas'] }
        ]
      }
    ]
  }
];

// Helper to determine the best counter for a scheme category or keyword
export function getAutoRoutedCounter(schemeId: string, category: string = ''): { counterNumber: number; reasonGu: string; reasonEn: string } {
  const idLower = schemeId.toLowerCase();
  
  if (idLower.includes('712') || idLower.includes('khedut') || idLower.includes('crop') || idLower.includes('farmer') || idLower.includes('gay') || category === 'agriculture') {
    return {
      counterNumber: 4,
      reasonGu: 'ખેતીવાડી અને જમીન રેકોર્ડ્સ માટે ઈ-ધરા કાઉન્ટર ૪ ફાળવેલ છે.',
      reasonEn: 'Auto-routed to E-Dhara Counter 4 for Agriculture & 7/12 Land Records.'
    };
  }

  if (idLower.includes('aadhaar') || idLower.includes('aadhar')) {
    return {
      counterNumber: 5,
      reasonGu: 'આધાર નોંધણી અને બાયોમેટ્રિક માટે કાઉન્ટર ૫ ફાળવેલ છે.',
      reasonEn: 'Auto-routed to Counter 5 for Aadhaar Biometric updates.'
    };
  }

  if (idLower.includes('income') || idLower.includes('caste') || idLower.includes('cert')) {
    return {
      counterNumber: 2,
      reasonGu: 'આવક અને જાતિના સત્તાવાર દાખલા માટે જન સેવા કાઉન્ટર ૨ ફાળવેલ છે.',
      reasonEn: 'Auto-routed to Counter 2 for Revenue Certificates & RTS delivery.'
    };
  }

  if (idLower.includes('ration') || idLower.includes('nfsa') || idLower.includes('poshan')) {
    return {
      counterNumber: 3,
      reasonGu: 'રેશનકાર્ડ અને અન્ન પુરવઠા સેવાઓ માટે કાઉન્ટર ૩ ફાળવેલ છે.',
      reasonEn: 'Auto-routed to Counter 3 for Food & Civil Supplies.'
    };
  }

  if (idLower.includes('awas') || idLower.includes('pmay') || idLower.includes('deendayal') || idLower.includes('ambedkar')) {
    return {
      counterNumber: 6,
      reasonGu: 'પ્રધાનમંત્રી આવાસ અને ગ્રામ વિકાસ માટે કાઉન્ટર ૬ ફાળવેલ છે.',
      reasonEn: 'Auto-routed to Counter 6 for Housing Assistance.'
    };
  }

  // Default to Counter 1 (Welfare, Pension, Scholarships)
  return {
    counterNumber: 1,
    reasonGu: 'સમાજ કલ્યાણ, પેન્શન અને શિષ્યવૃત્તિ માટે કાઉન્ટર ૧ ફાળવેલ છે.',
    reasonEn: 'Auto-routed to Counter 1 for Social Welfare & DBT Pensions.'
  };
}

export function getRecommendedCounter(schemeId: string, category: string = ''): { counterNumber: number; reasonGu: string; reasonEn: string } {
  return getAutoRoutedCounter(schemeId, category);
}


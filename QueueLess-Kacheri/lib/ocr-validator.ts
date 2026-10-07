/**
 * Client-Side AI Document & Expiry Validator (lib/ocr-validator.ts)
 * Rule Check #1: 3-Year Income Certificate Expiry Check
 */

export interface ValidationResult {
  isValid: boolean;
  status: 'valid' | 'expired' | 'invalid_format' | 'unrecognized';
  extractedYear?: number;
  extractedAadhaar?: string;
  extractedTextSnippet?: string;
  messageGu: string;
  messageEn: string;
  actionBlocked: boolean;
}

const CURRENT_YEAR = 2026;
const EXPIRY_THRESHOLD_YEAR = CURRENT_YEAR - 3; // 2023. If year < 2023 -> Expired!

export const validateIncomeCertificateText = (text: string): ValidationResult => {
  // Regex to look for years 2015 - 2030 or 1990 - 2030
  const yearMatches = text.match(/(?:20|19)\d{2}/g);
  
  if (!yearMatches || yearMatches.length === 0) {
    return {
      isValid: false,
      status: 'invalid_format',
      messageGu: 'પ્રમાણપત્રમાંથી માન્ય તારીખ કે વર્ષ શોધી શકાયું નથી. કૃપા કરીને સ્પષ્ટ ફોટો પાડો.',
      messageEn: 'Could not extract issue date/year. Please take a clear, well-lit photo.',
      actionBlocked: true,
    };
  }

  // Parse extracted years and find the earliest issue year mentioned
  const parsedYears = yearMatches.map(y => parseInt(y, 10)).filter(y => y >= 2018 && y <= CURRENT_YEAR);
  const detectedYear = parsedYears.length > 0 ? Math.min(...parsedYears) : parseInt(yearMatches[0], 10);

  if (detectedYear < EXPIRY_THRESHOLD_YEAR) {
    return {
      isValid: false,
      status: 'expired',
      extractedYear: detectedYear,
      messageGu: `⚠️ આ આવકનો દાખલો વર્ષ ${detectedYear} નો છે, જે ૩ વર્ષથી વધુ જૂનો છે અને રદબાતલ થયેલ છે. સરકારી નિયમ મુજબ નવો દાખલો કઢાવવો જરૂરી છે.`,
      messageEn: `⚠️ This Income Certificate was issued in ${detectedYear} (> 3 years old) and has expired. As per Gujarat RTS rules, a fresh certificate is required.`,
      actionBlocked: true,
    };
  }

  return {
    isValid: true,
    status: 'valid',
    extractedYear: detectedYear,
    messageGu: `✅ આવક પ્રમાણપત્ર માન્ય છે (વર્ષ ${detectedYear} - ૩ વર્ષની કાનૂની મર્યાદામાં). ટોકન બુકિંગ ખુલ્લું છે.`,
    messageEn: `✅ Income Certificate is legally valid (Issued ${detectedYear} - within 3-year window). Token booking unlocked.`,
    actionBlocked: false,
  };
};

export const validateAadhaarNumber = (text: string): { isValid: boolean; masked?: string } => {
  const match = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
  if (match) {
    const raw = match[0].replace(/\s/g, '');
    return {
      isValid: true,
      masked: `XXXX-XXXX-${raw.slice(-4)}`
    };
  }
  return { isValid: false };
};

// Preset sample OCR text generators for instantaneous demo testing
export const SAMPLE_OCR_TEST_CASES = {
  expired2021: `
    ગુજરાત સરકાર - મહેસૂલ વિભાગ
    મામલતદાર કચેરી, ગોંડલ (રાજકોટ)
    આવકનું પ્રમાણપત્ર (Income Certificate)
    દાખલા નંબર: INC/GND/2021/84729
    જાહેર કરવામાં આવે છે કે શ્રી મોહનભાઈ પટેલ ની વાર્ષિક આવક ₹૬૫,૦૦૦ છે.
    ઈશ્યુ તારીખ (Date of Issue): 14/08/2021
    નાણાકીય વર્ષ: 2021-2022
  `,
  valid2025: `
    ગુજરાત સરકાર - મહેસૂલ વિભાગ
    મામલતદાર કચેરી, ગોંડલ (રાજકોટ)
    આવકનું પ્રમાણપત્ર (Income Certificate)
    દાખલા નંબર: INC/GND/2025/11904
    જાહેર કરવામાં આવે છે કે શ્રી મોહનભાઈ પટેલ ની વાર્ષિક આવક ₹૮૦,૦૦૦ છે.
    ઈશ્યુ તારીખ (Date of Issue): 22/04/2025
    નાણાકીય વર્ષ: 2025-2026
  `
};

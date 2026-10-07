export interface TimeSlot {
  id: string;
  timeRange: string;
  startTime: string; // '10:30'
  endTime: string;   // '11:30'
  isLunchBreak: boolean;
  maxCapacity: number; // 5 tokens per hour
  bookedCount: number;
  status: 'available' | 'moderate' | 'full' | 'lunch_blackout';
  statusColor: 'green' | 'yellow' | 'red' | 'gray';
  statusGu: string;
}

export interface GazetteHoliday {
  date: string; // 'YYYY-MM-DD'
  nameGu: string;
  nameEn: string;
}

export const GUJARAT_GAZETTE_HOLIDAYS_2026: GazetteHoliday[] = [
  { date: '2026-01-14', nameGu: 'ઉત્તરાયણ (મકરસંક્રાંતિ)', nameEn: 'Makar Sankranti / Uttarayan' },
  { date: '2026-01-15', nameGu: 'વાસી ઉત્તરાયણ', nameEn: 'Vasi Uttarayan' },
  { date: '2026-01-26', nameGu: 'પ્રજાસત્તાક દિન (Republic Day)', nameEn: 'Republic Day' },
  { date: '2026-02-15', nameGu: 'મહાશિવરાત્રી', nameEn: 'Maha Shivratri' },
  { date: '2026-03-04', nameGu: 'હોળી (પ્રદોષ)', nameEn: 'Holi 2nd Day / Dhuleti' },
  { date: '2026-04-14', nameGu: 'ડૉ. બાબાસાહેબ આંબેડકર જયંતિ', nameEn: 'Dr. B. R. Ambedkar Jayanti' },
  { date: '2026-05-01', nameGu: 'ગુજરાત સ્થાપના દિન / શ્રમયોગી દિન', nameEn: 'Gujarat Statehood Day' },
  { date: '2026-08-15', nameGu: 'સ્વતંત્રતા દિવસ (Independence Day)', nameEn: 'Independence Day' },
  { date: '2026-08-28', nameGu: 'રક્ષાબંધન', nameEn: 'Raksha Bandhan' },
  { date: '2026-09-04', nameGu: 'જન્માષ્ટમી', nameEn: 'Krishna Janmashtami' },
  { date: '2026-10-02', nameGu: 'મહાત્મા ગાંધી જયંતિ', nameEn: 'Mahatma Gandhi Jayanti' },
  { date: '2026-10-20', nameGu: 'દશેરા / વિજયાદશમી', nameEn: 'Dussehra' },
  { date: '2026-11-09', nameGu: 'દિવાળી (લક્ષ્મીપૂજન)', nameEn: 'Diwali' },
  { date: '2026-11-10', nameGu: 'બેસતું વર્ષ (નૂતન વર્ષાભિનંદન)', nameEn: 'Gujarati New Year' },
  { date: '2026-11-11', nameGu: 'ભાઈબીજ', nameEn: 'Bhai Dooj' },
  { date: '2026-12-25', nameGu: 'નાતાલ (Christmas)', nameEn: 'Christmas' },
];

/**
 * Checks if a given date is a Gujarat Government Gazetted Holiday or Weekend (Sunday, 2nd/4th Saturday)
 */
export function isGujaratGovernmentClosed(dateStr: string): { isClosed: boolean; reasonGu?: string; reasonEn?: string } {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return { isClosed: false };
  }

  const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday

  // 1. All Sundays are strictly closed
  if (dayOfWeek === 0) {
    return {
      isClosed: true,
      reasonGu: 'રવિવાર: સરકારી કચેરીમાં સાપ્તાહિક રજા હોવાથી સ્લોટ બુકિંગ બંધ છે.',
      reasonEn: 'Sunday: Office closed for weekly holiday.'
    };
  }

  // 2. 2nd and 4th Saturdays of the month are strictly closed
  if (dayOfWeek === 6) {
    const dayOfMonth = d.getDate();
    // 2nd Saturday falls between 8 and 14
    // 4th Saturday falls between 22 and 28
    const isSecondSaturday = dayOfMonth >= 8 && dayOfMonth <= 14;
    const isFourthSaturday = dayOfMonth >= 22 && dayOfMonth <= 28;

    if (isSecondSaturday) {
      return {
        isClosed: true,
        reasonGu: 'બીજો શનિવાર: ગુજરાત સરકાર નિયમ મુજબ સરકારી કચેરી બંધ છે.',
        reasonEn: '2nd Saturday: Office closed under Gujarat Government Gazetted rules.'
      };
    }

    if (isFourthSaturday) {
      return {
        isClosed: true,
        reasonGu: 'ચોથો શનિવાર: ગુજરાત સરકાર નિયમ મુજબ સરકારી કચેરી બંધ છે.',
        reasonEn: '4th Saturday: Office closed under Gujarat Government Gazetted rules.'
      };
    }
  }

  // 3. Gazette Public Holidays
  const yyyyMmDd = dateStr.slice(0, 10);
  const foundHoliday = GUJARAT_GAZETTE_HOLIDAYS_2026.find(h => h.date === yyyyMmDd);
  if (foundHoliday) {
    return {
      isClosed: true,
      reasonGu: `જાહેર રજા: ${foundHoliday.nameGu} નિમિત્તે કચેરીમાં સત્તાવાર રજા છે.`,
      reasonEn: `Gazetted Holiday: Office closed for ${foundHoliday.nameEn}.`
    };
  }

  return { isClosed: false };
}

/**
 * Returns the standardized 10:30 AM to 06:10 PM capped time slots
 * with mandatory 01:30 PM - 02:00 PM Lunch Break blackout and max 5 tokens/hour capacity
 */
export function generateOfficeSlots(seedNumber: number = 0): TimeSlot[] {
  const baseSlots: Array<{ id: string; timeRange: string; start: string; end: string; isLunch: boolean; initialBooked: number }> = [
    { id: 'slot-1', timeRange: '10:30 AM - 11:30 AM', start: '10:30', end: '11:30', isLunch: false, initialBooked: 2 },
    { id: 'slot-2', timeRange: '11:30 AM - 12:30 PM', start: '11:30', end: '12:30', isLunch: false, initialBooked: 4 },
    { id: 'slot-3', timeRange: '12:30 PM - 01:30 PM', start: '12:30', end: '13:30', isLunch: false, initialBooked: 5 }, // Full
    { id: 'slot-lunch', timeRange: '01:30 PM - 02:00 PM (રિસેસ)', start: '13:30', end: '14:00', isLunch: true, initialBooked: 0 },
    { id: 'slot-4', timeRange: '02:00 PM - 03:00 PM', start: '14:00', end: '15:00', isLunch: false, initialBooked: 1 },
    { id: 'slot-5', timeRange: '03:00 PM - 04:00 PM', start: '15:00', end: '16:00', isLunch: false, initialBooked: 3 },
    { id: 'slot-6', timeRange: '04:00 PM - 05:00 PM', start: '16:00', end: '17:00', isLunch: false, initialBooked: 2 },
    { id: 'slot-7', timeRange: '05:00 PM - 06:10 PM', start: '17:00', end: '18:10', isLunch: false, initialBooked: 1 },
  ];

  return baseSlots.map((s) => {
    if (s.isLunch) {
      return {
        id: s.id,
        timeRange: s.timeRange,
        startTime: s.start,
        endTime: s.end,
        isLunchBreak: true,
        maxCapacity: 0,
        bookedCount: 0,
        status: 'lunch_blackout',
        statusColor: 'gray',
        statusGu: 'ભોજન રિસેસ (બુકિંગ બંધ)'
      };
    }

    const booked = Math.min(5, Math.max(0, s.initialBooked + (seedNumber % 2)));
    let status: TimeSlot['status'] = 'available';
    let statusColor: TimeSlot['statusColor'] = 'green';
    let statusGu = `ઉપલબ્ધ (${5 - booked} જગ્યા બાકી)`;

    if (booked >= 5) {
      status = 'full';
      statusColor = 'red';
      statusGu = 'હાઉસફુલ (૫/૫ પૂર્ણ)';
    } else if (booked >= 3) {
      status = 'moderate';
      statusColor = 'yellow';
      statusGu = `મધ્યમ ભીડ (${5 - booked} જગ્યા બાકી)`;
    }

    return {
      id: s.id,
      timeRange: s.timeRange,
      startTime: s.start,
      endTime: s.end,
      isLunchBreak: false,
      maxCapacity: 5,
      bookedCount: booked,
      status,
      statusColor,
      statusGu
    };
  });
}

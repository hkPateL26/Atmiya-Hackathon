/**
 * Gujarati / Hindi Web Speech API Voice Utility (lib/voice.ts)
 */
export const speakGuidance = (text: string, lang: 'gu-IN' | 'hi-IN' | 'en-IN' = 'gu-IN') => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      console.warn("Speech synthesis unavailable");
    }
  }
};

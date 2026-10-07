/**
 * Global Haptic Vibration Utility (lib/haptics.ts)
 * Directly controls mobile vibration motors via Web Vibration API
 */
export type HapticType = 'tap' | 'success' | 'warning' | 'error';

export const triggerHaptic = (type: HapticType = 'tap') => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      switch (type) {
        case 'tap':
          navigator.vibrate(15);
          break;
        case 'success':
          navigator.vibrate([20, 40, 20]);
          break;
        case 'warning':
          navigator.vibrate([40, 60, 40]);
          break;
        case 'error':
          navigator.vibrate([100, 50, 100]);
          break;
      }
    } catch {
      // Haptics suppressed by device policy
    }
  }
};

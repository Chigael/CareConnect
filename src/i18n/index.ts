import { en, TranslationType } from './translations/en';
export type { TranslationType };
import { hi } from './translations/hi';
import { mr } from './translations/mr';
import { te } from './translations/te';
import { ig } from './translations/ig';
import { de } from './translations/de';
import { ja } from './translations/ja';

export const translations: Record<string, TranslationType> = {
  English: en,
  Hindi: hi,
  Marathi: mr,
  Telugu: te,
  Igbo: ig,
  German: de,
  Japanese: ja,
  // Shortcode fallbacks
  en,
  hi,
  mr,
  te,
  ig,
  de,
  ja
};

export type LanguageKey = 'English' | 'Hindi' | 'Marathi' | 'Telugu' | 'Igbo' | 'German' | 'Japanese';

export const SUPPORTED_LANGUAGES_LIST: { id: string; name: LanguageKey; nativeName: string; flag: string }[] = [
  { id: 'en', name: 'English', nativeName: 'English', flag: '🌐' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { id: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', flag: '🇳🇬' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
];

export function getTranslation(lang: string): TranslationType {
  return translations[lang] || translations['English'];
}

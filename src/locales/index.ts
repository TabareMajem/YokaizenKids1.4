import type { Language } from '../types/language';

// Currently supported languages
export const languages = {
  en: { name: 'English', nativeName: 'English' },
  es: { name: 'Spanish', nativeName: 'Español' },
  ko: { name: 'Korean', nativeName: '한국어' },
  ja: { name: 'Japanese', nativeName: '日本語' }
} as const;

import en from './en';
import es from './es';
import ko from './ko';
import ja from './ja';

const translations = {
  en,
  es,
  ko,
  ja
};

export default translations;
export type Languages = 'en-US' | 'fa-IR';

export type LanguagesContextType = {
    language: Languages;
    setLanguage: (language: Languages) => void;
}

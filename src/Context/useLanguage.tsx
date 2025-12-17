import { createContext, useContext, useEffect, useState } from "react";

export type Languages = 'en-US' | 'fa-IR';

type LanguagesContextType = {
    language: Languages;
    setLanguage: (language: Languages) => void;
}

const LanguageContext = createContext<LanguagesContextType | undefined>(undefined);

export const LanguagesProvider: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        const [language, setLanguage] = useState<Languages>(() => {
            if (typeof window === 'undefined') return 'en-US';

            const saved = localStorage.getItem('Calculatorify_Language');
            if (saved === 'en-US' || saved === 'fa-IR') return saved;

            const browserLanguage = navigator.language;
            return browserLanguage.startsWith('fa') ? 'fa-IR' : 'en-US';
        });

        useEffect(() => {
                localStorage.setItem('Calculatorify_Language', language as (Languages));
        }, [language])

        return (
            <LanguageContext.Provider value={{
                language,
                setLanguage,
            }}>
                {children}
            </LanguageContext.Provider>
        )
    }

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
}
import { createContext, useContext, useEffect, useState } from "react";

type Languages = 'en-US' | 'fa-IR';

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
        const [language, setLanguage] = useState<Languages>('en-US');

        useEffect(() => {
            let savedLanguage: Languages = localStorage.getItem('language') as (Languages | null) ?? navigator.language as Languages;
            console.log('savedLanguage Detected: ', savedLanguage);
            if (savedLanguage) {
                if (savedLanguage !== "en-US" && savedLanguage !== "fa-IR") savedLanguage = "en-US"
                setLanguage(savedLanguage);
            }

        }, [])

        return (
            <LanguageContext value={{
                language,
                setLanguage,
            }}>
                {children}
            </LanguageContext>
        )
    }

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
}
import { useEffect, useState } from "react";
import type { Languages} from "./Language.types";
import { LanguageContext } from "./languageContext";

const LanguagesProvider: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
        const [language, setLanguage] = useState<Languages>(() => {
            if (typeof window === 'undefined') return 'en-US';

            const saved = localStorage.getItem('Calculatorify_Language');
            if (saved === 'en-US' || saved === 'fa-IR') return saved;

            const browserLanguage = navigator.language ?? navigator.languages[0];
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
export default LanguagesProvider;
import { createContext, useContext, useEffect, useState } from "react";

type Themes = 'light' | 'dark' | 'system' | 'amoled' | 'blueSky';
type ThemeContextType = {
    theme: Themes;
    setTheme: (theme: Themes) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
    const [theme, setTheme] = useState<Themes>('system');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as (Themes | null)
        if(savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        }

    }, [])

    return (
        <ThemeContext value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext>
    )
}


export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}
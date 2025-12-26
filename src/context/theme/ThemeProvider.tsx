import { useEffect, useState } from "react";
import type { Themes } from "./Theme.types";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider: React.FC<{
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
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
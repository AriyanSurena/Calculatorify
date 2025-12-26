export type Themes = 'light' | 'dark' | 'system' | 'amoled' | 'blueSky';
export type ThemeContextType = {
    theme: Themes;
    setTheme: (theme: Themes) => void;
}
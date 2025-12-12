import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import './index.css'
import './../public/fonts.css'
import App from './App.tsx'
import { ThemeProvider } from './Context/useTheme.tsx'
import { ToastProvider } from './Context/useToast.tsx'
import { LanguagesProvider } from './Context/useLanguage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguagesProvider>
      <ThemeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </LanguagesProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './styles/index.css'
import './styles/tailwind.css'
import './../public/assets/fonts/fonts.css'
import { ThemeProvider } from './context/useTheme.tsx'
import { ToastProvider } from './context/useToast.tsx'
import { LanguagesProvider } from './context/useLanguage.tsx'
import App from './App.tsx'

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

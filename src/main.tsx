import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './styles/index.css'
import './styles/tailwind.css'
import './../public/assets/fonts/fonts.css'
import ThemeProvider from './context/theme/ThemeProvider.tsx'
import ToastProvider from './context/toast/ToastProvider.tsx'
import App from './App.tsx'
import LanguagesProvider from './context/language/LanguagesProvider.tsx'

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

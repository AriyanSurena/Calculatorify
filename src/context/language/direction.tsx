// components/FontDirectionManager.tsx
import { useEffect } from 'react';
import useLanguage from './../../hooks/useLanguage';

const FontDirectionManager = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;
    
    // تنظیم جهت
    if (language.startsWith('fa')) {
      // تنظیم فونت
      document.body.classList.add("persian")
      document.body.classList.remove("english")
      // تنظیم جهت
      html.style.direction = 'rtl';
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'fa');
    } else {
      // تنظیم فونت
      document.body.classList.remove("persian")
      document.body.classList.add("english")
      // تنظیم جهت
      html.style.direction = 'ltr';
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
    
  }, [language]);

  return null;
};

export default FontDirectionManager;
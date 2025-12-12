// components/FontDirectionManager.tsx
import { useEffect } from 'react';
import { useLanguage } from '../Context/useLanguage';

const FontDirectionManager = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;
    
    // تنظیم جهت
    if (language.startsWith('fa')) {
      html.style.direction = 'rtl';
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'fa');
    } else {
      html.style.direction = 'ltr';
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
    
    // تنظیم فونت
    html.style.fontFamily = language.startsWith('fa') 
      ? "'Vazir', Tahoma, sans-serif" 
      : "'Jost', Arial, sans-serif";
      
  }, [language]);

  return null;
};

export default FontDirectionManager;
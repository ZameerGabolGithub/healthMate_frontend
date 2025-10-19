import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import ur from '../i18n/ur.json';

const locales = { en, ur };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => {
    // simple dot-path lookup
    const parts = key.split('.');
    let cur = locales[lang];
    for (const p of parts) {
      if (!cur) return key;
      cur = cur[p];
    }
    return cur ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;

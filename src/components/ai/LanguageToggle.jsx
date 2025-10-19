import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
        {t('common.english')}
      </button>
      <button
        onClick={() => setLang('ur')}
        className={`px-3 py-1 rounded ${lang === 'ur' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
        {t('common.urdu')}
      </button>
    </div>
  );
};

export default LanguageToggle;
 

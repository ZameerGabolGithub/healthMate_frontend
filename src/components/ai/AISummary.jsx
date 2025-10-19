 
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const AISummary = ({ insights }) => {
  const { t, lang } = useLanguage();
  // map global lang codes to keys used by insights.summary
  const summaryKey = lang === 'ur' ? 'romanUrdu' : 'english';

  if (!insights) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{t('ai.analysis')}</h2>
        <LanguageToggle />
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">{t('ai.summary')}</h3>
          <p className="text-gray-700">{insights.summary[summaryKey]}</p>
        </div>

        {insights.abnormalValues?.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-red-900 mb-2">Abnormal Values</h3>
            <div className="space-y-2">
              {insights.abnormalValues.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded border-l-4 border-red-500">
                  <p className="font-semibold">{item.parameter}</p>
                  <p className="text-sm text-gray-600">
                    Value: {item.value} | Normal: {item.normalRange}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.severity === 'critical' ? 'bg-red-200 text-red-800' :
                    item.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {insights.doctorQuestions?.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-2">Questions for Doctor</h3>
            <ul className="list-disc list-inside space-y-1">
              {insights.doctorQuestions.map((q, idx) => (
                <li key={idx} className="text-gray-700">{q}</li>
              ))}
            </ul>
          </div>
        )}

        {insights.dietaryRecommendations && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-900 mb-2">Dietary Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-red-700 mb-1">Avoid:</p>
                <ul className="list-disc list-inside">
                  {insights.dietaryRecommendations.foodsToAvoid?.map((food, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{food}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-green-700 mb-1">Recommended:</p>
                <ul className="list-disc list-inside">
                  {insights.dietaryRecommendations.recommendedFoods?.map((food, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{food}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only. 
            Please consult with a qualified healthcare professional for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AISummary;

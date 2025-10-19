 
import { useState } from 'react';
import { addVitals } from '../../api/vitalsApi';
import Button from '../common/Button';
import Input from '../common/Input';
import { useLanguage } from '../../context/LanguageContext';

const VitalsForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bloodPressure: { systolic: '', diastolic: '' },
    bloodSugar: { value: '', type: 'fasting' },
    weight: { value: '' },
    temperature: { value: '' },
    heartRate: { value: '' },
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addVitals(formData);
      alert('Vitals added successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vitals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
  <h2 className="text-2xl font-bold mb-4">{t('vitals.title')}</h2>

      {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <Input
        label={t('vitals.date')}
        type="date"
        value={formData.date}
        onChange={(e) => handleChange(null, 'date', e.target.value)}
        required
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label={t('vitals.bloodPressureSystolic')}
          type="number"
          placeholder="120"
          value={formData.bloodPressure.systolic}
          onChange={(e) => handleChange('bloodPressure', 'systolic', e.target.value)}
        />
        <Input
          label={t('vitals.bloodPressureDiastolic')}
          type="number"
          placeholder="80"
          value={formData.bloodPressure.diastolic}
          onChange={(e) => handleChange('bloodPressure', 'diastolic', e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label={t('vitals.bloodSugar')}
          type="number"
          placeholder="100"
          value={formData.bloodSugar.value}
          onChange={(e) => handleChange('bloodSugar', 'value', e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium mb-1">{t('vitals.sugarType')}</label>
          <select
            value={formData.bloodSugar.type}
            onChange={(e) => handleChange('bloodSugar', 'type', e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="fasting">Fasting</option>
            <option value="random">Random</option>
            <option value="postprandial">Post-meal</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label={t('vitals.weight')}
          type="number"
          placeholder="70"
          value={formData.weight.value}
          onChange={(e) => handleChange('weight', 'value', e.target.value)}
        />
        <Input
          label={t('vitals.temperature')}
          type="number"
          placeholder="98.6"
          value={formData.temperature.value}
          onChange={(e) => handleChange('temperature', 'value', e.target.value)}
        />
        <Input
          label={t('vitals.heartRate')}
          type="number"
          placeholder="72"
          value={formData.heartRate.value}
          onChange={(e) => handleChange('heartRate', 'value', e.target.value)}
        />
      </div>

      <div>
  <label className="block text-sm font-medium mb-1">{t('vitals.notes')}</label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange(null, 'notes', e.target.value)}
          className="w-full border p-2 rounded"
          rows="3"
          placeholder="Any additional notes..."
        />
      </div>

      <Button type="submit" fullWidth loading={loading}>
        {t('vitals.save')}
      </Button>
    </form>
  );
};

export default VitalsForm;

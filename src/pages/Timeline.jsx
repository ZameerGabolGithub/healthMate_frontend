 
import { useEffect, useState } from 'react';
import { getTimeline } from '../api/vitalsApi';
import Navbar from '../components/common/Navbar';
import Loader from '../components/common/Loader';
import { formatDate } from '../utils/helpers';
import { FaFileAlt, FaHeartbeat } from 'react-icons/fa';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await getTimeline();
      setTimeline(response.data.timeline);
    } catch (error) {
      console.error('Error fetching timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Health Timeline</h1>

        <div className="space-y-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
              <div className={`p-3 rounded-full ${
                item.type === 'file' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
              }`}>
                {item.type === 'file' ? <FaFileAlt size={24} /> : <FaHeartbeat size={24} />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                <h3 className="font-semibold text-gray-800">
                  {item.type === 'file' ? item.data.fileName : 'Vitals Entry'}
                </h3>
                {item.type === 'vitals' && (
                  <div className="text-sm text-gray-600 mt-1">
                    {item.data.bloodPressure && (
                      <span>BP: {item.data.bloodPressure.systolic}/{item.data.bloodPressure.diastolic} • </span>
                    )}
                    {item.data.bloodSugar && <span>Sugar: {item.data.bloodSugar.value}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

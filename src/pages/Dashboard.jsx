import { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import { useLanguage } from '../context/LanguageContext';
import StatsCard from '../components/dashboard/StatsCard';
import QuickActions from '../components/dashboard/QuickActions';
import FileList from '../components/files/FileList';
import { FaFileAlt, FaHeartbeat, FaCheckCircle } from 'react-icons/fa';
import { getFiles } from '../api/fileApi';
import { getVitals } from '../api/vitalsApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    analyzedFiles: 0,
    vitalsEntries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const filesRes = await getFiles();
      const vitalsRes = await getVitals();
      
      setStats({
        totalFiles: filesRes.data.pagination.total,
        analyzedFiles: filesRes.data.files.filter(f => f.isAnalyzed).length,
        vitalsEntries: vitalsRes.data.pagination.total,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{useLanguage().t('common.dashboard') || 'Dashboard'}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Reports" value={stats.totalFiles} icon={FaFileAlt} />
          <StatsCard title="Analyzed" value={stats.analyzedFiles} icon={FaCheckCircle} color="bg-green-100 text-green-800" />
          <StatsCard title="Vitals Entries" value={stats.vitalsEntries} icon={FaHeartbeat} color="bg-red-100 text-red-800" />
        </div>

        <QuickActions />

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Reports</h2>
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

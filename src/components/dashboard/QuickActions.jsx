import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaHeartbeat, FaClock } from 'react-icons/fa';

const QuickActions = () => {
  const actions = [
    { to: '/upload', label: 'Upload Report', icon: FaCloudUploadAlt, color: 'from-blue-500 to-blue-600' },
    { to: '/add-vitals', label: 'Add Vitals', icon: FaHeartbeat, color: 'from-red-400 to-red-500' },
    { to: '/timeline', label: 'View Timeline', icon: FaClock, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Link
          key={action.to}
          to={action.to}
          className={`text-white p-6 rounded-2xl hover:scale-105 transform transition-shadow duration-200 shadow-md bg-gradient-to-br ${action.color}`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <action.icon className="text-3xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{action.label}</h3>
              <p className="text-sm opacity-80">Quick action</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHeartbeat, FaUser, FaSignOutAlt } from 'react-icons/fa';
import LanguageToggle from '../ai/LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { t } = useLanguage();

  return (
    <nav className="glass card-strong sticky top-4 mx-6 rounded-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-md">
              <FaHeartbeat className="text-white text-2xl" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-gray-900">HealthMate</span>
              <div className="text-xs text-gray-500">Your personal health dashboard</div>
            </div>
          </Link>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6 text-gray-700">
              <Link to="/dashboard" className="hover:text-emerald-600 transition-colors">{t('common.dashboard') || 'Dashboard'}</Link>
              <Link to="/upload" className="hover:text-emerald-600 transition-colors">{t('common.upload') || 'Upload'}</Link>
              <Link to="/add-vitals" className="hover:text-emerald-600 transition-colors">{t('common.vitals') || 'Vitals'}</Link>
              <Link to="/timeline" className="hover:text-emerald-600 transition-colors">{t('common.timeline') || 'Timeline'}</Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <FaUser className="text-gray-600" />
                <span className="text-sm text-gray-700">{user?.fullName}</span>
              </div>
              <LanguageToggle />
              <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                <FaSignOutAlt />
                <span className="text-sm">{t('common.logout') || 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

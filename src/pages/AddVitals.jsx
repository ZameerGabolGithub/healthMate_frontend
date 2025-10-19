 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import VitalsForm from '../components/vitals/VitalsForm';

const AddVitals = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <VitalsForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default AddVitals;

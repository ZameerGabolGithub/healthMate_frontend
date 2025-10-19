 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import FileUpload from '../components/files/FileUpload';

const UploadFile = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    alert('File uploaded successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Upload Medical Report</h1>
          <FileUpload onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

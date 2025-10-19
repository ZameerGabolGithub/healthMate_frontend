 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFileById } from '../api/fileApi';
import { analyzeFile, getInsights } from '../api/aiApi';
import Navbar from '../components/common/Navbar';
import Loader from '../components/common/Loader';
import AISummary from '../components/ai/AISummary';
import Button from '../components/common/Button';

const ViewReport = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchFileData();
  }, [id]);

  const fetchFileData = async () => {
    try {
      const response = await getFileById(id);
      setFile(response.data.file);
      if (response.data.insights) {
        setInsights(response.data.insights);
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await analyzeFile(id);
      setInsights(response.data.insights);
    } catch (error) {
      alert('Analysis failed: ' + error.response?.data?.message);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">{file?.fileName}</h1>
            <iframe
              src={file?.fileUrl}
              className="w-full h-96 border rounded"
              title="Report Preview"
            />
            {!insights && (
              <Button onClick={handleAnalyze} loading={analyzing} className="mt-4">
                Analyze with AI
              </Button>
            )}
          </div>

          {insights && <AISummary insights={insights} />}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;

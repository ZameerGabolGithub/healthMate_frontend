 
import { useEffect, useState } from 'react';
import { getFiles, deleteFile } from '../../api/fileApi';
import FileCard from './FileCard';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (file) => {
    navigate(`/view-report/${file._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(id);
        setFiles(files.filter((f) => f._id !== id));
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {files.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No files uploaded yet</p>
      ) : (
        files.map((file) => (
          <FileCard key={file._id} file={file} onView={handleView} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default FileList;

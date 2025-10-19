 
import { useState } from 'react';
import { uploadFile } from '../../api/fileApi';
import Button from '../common/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';

const FileUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('lab_report');
  const [reportDate, setReportDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !reportDate) {
      setError('Please select a file and report date');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('reportDate', reportDate);

    setLoading(true);
    try {
      await uploadFile(formData);
      setFile(null);
      setReportDate('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <div className="text-center mb-6">
        <FaCloudUploadAlt className="text-emerald-600 text-5xl mx-auto mb-2" />
        <h3 className="text-xl font-bold">Upload Medical Report</h3>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select File *</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">File Type *</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="lab_report">Lab Report</option>
            <option value="prescription">Prescription</option>
            <option value="xray">X-Ray</option>
            <option value="ultrasound">Ultrasound</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Report Date *</label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Upload File
        </Button>
      </div>
    </form>
  );
};

export default FileUpload;

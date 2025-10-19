 
import { FaFilePdf, FaImage, FaTrash, FaEye } from 'react-icons/fa';
import { formatDate, formatFileSize } from '../../utils/helpers';

const FileCard = ({ file, onView, onDelete }) => {
  const getIcon = (mimeType) => {
    if (mimeType === 'application/pdf') return <FaFilePdf className="text-red-600 text-3xl" />;
    return <FaImage className="text-blue-600 text-3xl" />;
  };

  return (
    <div className="p-4 rounded-xl glass card-strong hover:scale-[1.01] transition-transform">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="p-3 rounded-lg bg-white/40">{getIcon(file.mimeType)}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 truncate text-lg">{file.fileName}</h3>
            <p className="text-sm text-gray-600 mt-1">{formatDate(file.reportDate)} • {formatFileSize(file.fileSize)}</p>
            <p className="text-sm text-gray-600 mt-1">{file.fileType.replace('_', ' ')}</p>
            {file.isAnalyzed && (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                AI Analyzed
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => onView(file)} className="p-2 bg-white/30 rounded-lg hover:scale-105 transition-transform">
            <FaEye className="text-emerald-600" />
          </button>
          <button onClick={() => onDelete(file._id)} className="p-2 bg-white/30 rounded-lg hover:scale-105 transition-transform">
            <FaTrash className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;

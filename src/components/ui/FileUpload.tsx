import React, { useState, useRef } from 'react';
import { fileUploadService } from '@/services/fileUploadService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Upload, File, Image } from 'lucide-react';

interface UploadedFile {
  fileUrl: string;
  fileName: string;
  size: number;
  mimeType: string;
}

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  onError: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  folder?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  onError,
  multiple = true,
  accept = 'image/*,video/*,.pdf,.doc,.docx',
  maxFiles = 10,
  folder = 'uploads',
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Validate files
    for (const file of fileArray) {
      const validation = fileUploadService.validateFile(file);
      if (!validation.isValid) {
        onError(validation.error || 'Invalid file');
        return;
      }
    }

    // Check max files limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      onError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      let result;
      if (fileArray.length === 1) {
        result = await fileUploadService.uploadFile(fileArray[0], folder);
        result = { files: [result] }; // Normalize response
      } else {
        result = await fileUploadService.uploadMultipleFiles(fileArray, folder);
      }

      const newFiles = result.files || [result];
      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);
      onFilesUploaded(updatedFiles);
      setUploadProgress(100);
    } catch (error: any) {
      onError(error.message || 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const removeFile = async (fileToRemove: UploadedFile) => {
    try {
      await fileUploadService.deleteFile(fileToRemove.fileUrl);
      const updatedFiles = uploadedFiles.filter(file => file.fileUrl !== fileToRemove.fileUrl);
      setUploadedFiles(updatedFiles);
      onFilesUploaded(updatedFiles);
    } catch (error: any) {
      onError(error.message || 'Failed to remove file');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card className={`border-2 border-dashed transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}>
        <CardContent className="p-6">
          <div
            className="text-center cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {dragActive ? 'Drop files here' : 'Upload files'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-xs text-gray-400">
              Supports images, videos, PDFs, and documents (max 10MB each)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Uploading...</span>
              <Progress value={uploadProgress} className="flex-1" />
              <span className="text-sm text-gray-600">{uploadProgress}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Uploaded Files ({uploadedFiles.length})
            </h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file.mimeType)}
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {file.fileName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {fileUploadService.formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

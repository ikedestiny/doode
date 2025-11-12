// components/common/ImageUpload.jsx
import React, { useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';

const CLOUD_NAME = 'dngsk3fvt';
const UPLOAD_PRESET = 'african-food-preset';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setUploaded(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      onImageUpload(data.secure_url);
      setUploaded(true);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {currentImage && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Current Image:</p>
          <img
            src={currentImage}
            alt="Current dish"
            className="w-32 h-32 object-cover rounded-lg border border-gray-200 mx-auto"
          />
        </div>
      )}

      {/* Upload Area */}
      <label className={`
        relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
        ${uploading ? 'border-orange-300 bg-orange-50' : 
          uploaded ? 'border-green-300 bg-green-50' : 
          'border-gray-300 hover:border-orange-400 hover:bg-orange-50'}
      `}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="hidden"
          disabled={uploading}
        />
        
        <div className="space-y-3">
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-sm text-orange-700">Uploading...</p>
            </>
          ) : uploaded ? (
            <>
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
              <p className="text-sm text-green-700">Image uploaded successfully!</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-gray-400 mx-auto" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Click to upload image
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPEG, PNG, WebP up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      </label>

      {/* Status Messages */}
      {!uploading && !uploaded && (
        <p className="text-xs text-gray-500 text-center">
          Image will be optimized and stored securely in the cloud
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
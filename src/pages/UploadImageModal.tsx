import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai'; // Используем иконку из react-icons
import { useDropzone } from 'react-dropzone';

const ImageUploadDialog = ( onUploadPhotos: (imageUrls: string[]) => void ) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [dialogImageUrl, setDialogImageUrl] = useState('');

  const onDrop = (acceptedFiles: any) => {
    setFileList(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true, // Disable the default click-to-upload behavior
  });

  const handleRemove = (file: File) => {
    setFileList(fileList.filter(f => f !== file));
  };

  const clearFiles = () => {
    setFileList([]);
  };

  const handlePreview = (file: File) => {
    setDialogImageUrl(URL.createObjectURL(file));
    setPreviewVisible(true);
  };

  const emitSelectedImages = () => {
    const imageUrls = fileList.map((file) => URL.createObjectURL(file));
    onUploadPhotos(imageUrls);
    clearFiles();
    setDialogVisible(false);
  };

  return (
    <div>
      <Button onClick={() => setDialogVisible(true)}>Загрузить изображение</Button>

      <Dialog open={dialogVisible} onClose={() => setDialogVisible(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <div {...getRootProps()} className="upload-demo" style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <AiOutlinePlus size={50} color="#ccc" />
            <p>Перетащите файлы сюда или выберите их для загрузки</p>
          </div>

          <div>
            {fileList.length > 0 && (
              <div>
                <h4>Выбранные изображения:</h4>
                <ul>
                  {fileList.map((file, index) => (
                    <li key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        width="100"
                        onClick={() => handlePreview(file)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                      />
                      <button onClick={() => handleRemove(file)}>Удалить</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Dialog open={previewVisible} onClose={() => setPreviewVisible(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Preview Image</DialogTitle>
            <DialogContent>
              <img src={dialogImageUrl} alt="Preview" width="100%" />
            </DialogContent>
          </Dialog>
        </DialogContent>

        <DialogActions>
          <Button onClick={clearFiles}>Очистить</Button>
          <Button onClick={emitSelectedImages} color="primary">Вставить изображения</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageUploadDialog;

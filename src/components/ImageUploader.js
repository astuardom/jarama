import React, { useState, useRef } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Solo se permiten archivos de imagen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar los 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onImageUpload(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-white">Sube tu diseño</h3>
      <div className="border-2 border-dashed border-[#45f882]/50 rounded-lg p-6 text-center transition hover:border-[#45f882]">
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Previsualización" 
              className="max-h-40 mx-auto mb-4 object-contain"
            />
            <button
              onClick={() => {
                setPreview(null);
                onImageUpload(null);
                if(fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute -top-2 -right-2 bg-[#45f882] text-[#1b2330] rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <div className="text-[#45f882] text-4xl mb-2">↑</div>
            <p className="text-white mb-2">Arrastra tu imagen aquí o haz clic</p>
            <p className="text-gray-400 text-sm mb-4">Formatos PNG sin fondo (hasta 5MB)</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/png"
          className="hidden"
          id="design-upload"
        />
        <label
          htmlFor="design-upload"
          className="bg-[#45f882]/10 hover:bg-[#45f882]/20 text-[#45f882] px-4 py-2 rounded-md cursor-pointer transition inline-block"
        >
          Seleccionar archivo
        </label>
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      </div>
      <p className="text-gray-400 text-xs mt-2">
        Importante: Usa imágenes PNG con fondo transparente para mejores resultados
      </p>
    </div>
  );
};

export default ImageUploader;
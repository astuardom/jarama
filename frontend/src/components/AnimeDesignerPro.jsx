import React, { useRef, useState, useEffect } from 'react';

const TSHIRT_MOCKUPS = {
  negro: '/images/tshirt-black.jpg',
  blanco: '/images/tshirt-white.jpg',
  rojo: '/images/tshirt-red.jpg',
  azul: '/images/tshirt-blue.jpg',
};

const COLOR_MAP = {
  negro: '#1f2937',
  blanco: '#f9fafb',
  rojo: '#dc2626',
  azul: '#3b82f6',
};

const TALLAS = ['S', 'M', 'L', 'XL'];

const AnimeDesignerPro = () => {
  const [color, setColor] = useState('negro');
  const [talla, setTalla] = useState('M');
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [imgPos, setImgPos] = useState({ x: 140, y: 160 });
  const [textPos, setTextPos] = useState({ x: 200, y: 340 });
  const [dragTarget, setDragTarget] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const shirt = new Image();
    shirt.crossOrigin = 'anonymous';
    shirt.onload = () => {
      ctx.drawImage(shirt, 0, 0, canvas.width, canvas.height);
      if (imageUrl) {
        const design = new Image();
        design.crossOrigin = 'anonymous';
        design.onload = () => {
          ctx.drawImage(design, imgPos.x, imgPos.y, 120, 120);
          drawText(ctx);
        };
        design.src = imageUrl;
      } else {
        drawText(ctx);
      }
    };
    shirt.src = TSHIRT_MOCKUPS[color];

    function drawText(ctx) {
      if (text) {
        ctx.font = '20px Arial';
        ctx.fillStyle = '#111';
        ctx.textAlign = 'center';
        ctx.fillText(text, textPos.x, textPos.y);
      }
    }
  }, [color, imageUrl, text, imgPos, textPos]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'mi-diseno-polera.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Aquí está mi diseño personalizado para estampar:

📐 Talla: ${talla}
🎨 Color: ${color}
✍️ Texto: ${text || 'Sin texto'}
🖼️ Imagen: Adjunto archivo

Gracias!`
    );
    const url = `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Diseño personalizado de polera - ANIMERCH');
    const body = encodeURIComponent(
      `¡Hola!

Aquí está el detalle de mi diseño:

👕 Talla: ${talla}
🎨 Color: ${color}
✍️ Texto: ${text || 'Sin texto'}
🖼️ Imagen adjunta (descargar desde la herramienta)

Gracias!`
    );
    window.location.href = `mailto:ventas@animerch.com?subject=${subject}&body=${body}`;
  };

  const startDrag = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= imgPos.x && x <= imgPos.x + 120 && y >= imgPos.y && y <= imgPos.y + 120) {
      setDragTarget('image');
    } else if (x >= textPos.x - 100 && x <= textPos.x + 100 && y >= textPos.y - 20 && y <= textPos.y + 20) {
      setDragTarget('text');
    }
  };

  const onDrag = (e) => {
    if (!dragTarget) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragTarget === 'image') {
      setImgPos({ x: x - 60, y: y - 60 });
    } else if (dragTarget === 'text') {
      setTextPos({ x, y });
    }
  };

  const stopDrag = () => setDragTarget(null);

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg max-w-6xl mx-auto mt-10 space-y-8">
      <h2 className="text-3xl font-bold text-center text-red-600">🎨 Diseña tu Polera Épica</h2>

      {/* INSTRUCCIONES */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 text-sm text-gray-800 rounded">
        <p className="font-semibold mb-1">📌 Recomendaciones para tu diseño:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Usa imágenes <strong>PNG sin fondo</strong> (ideal para impresión).</li>
          <li>Máximo de impresión: <strong>30 x 30 cm</strong>.</li>
          <li>El diseño se posiciona al centro del pecho.</li>
          <li>Puedes arrastrar la imagen o el texto directamente en la vista previa.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PREVIEW */}
        <div className="bg-gray-100 rounded-lg shadow-inner flex items-center justify-center relative aspect-square">
          <canvas
            ref={canvasRef}
            width={400}
            height={500}
            className="rounded"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          />
        </div>

        {/* OPCIONES */}
        <div className="space-y-6">
          {/* COLOR DE POLERA */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Color de Polera:</label>
            <div className="flex gap-4">
              {Object.entries(COLOR_MAP).map(([key, colorCode]) => (
                <button
                  key={key}
                  onClick={() => setColor(key)}
                  className={`w-8 h-8 rounded-full border-2 ${color === key ? 'ring-2 ring-red-500' : ''}`}
                  style={{ backgroundColor: colorCode }}
                  title={key}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Color seleccionado: <strong className="capitalize">{color}</strong>
            </p>
          </div>

          {/* TALLA */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Talla:</label>
            <div className="flex gap-4">
              {TALLAS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTalla(t)}
                  className={`px-3 py-1 rounded border ${talla === t ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-red-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SUBIR IMAGEN */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Imagen (PNG sin fondo)</label>
            <input type="file" accept="image/png" onChange={handleImageUpload} />
          </div>

          {/* TEXTO */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Texto Personalizado</label>
            <input
              type="text"
              placeholder="Frase anime..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* DESCARGAR */}
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-lg transform hover:scale-105"
          >
            📥 Descargar Diseño
          </button>

          {/* ENVIAR */}
          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
            >
              💬 Enviar por WhatsApp
            </button>
            <button
              onClick={handleEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              📧 Enviar por Correo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDesignerPro;

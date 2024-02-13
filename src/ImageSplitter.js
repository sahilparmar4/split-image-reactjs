import React, { useState, useRef } from 'react';

const ImageSplitter = () => {
  const [file, setFile] = useState(null);
  const [number, setNumber] = useState();
  const [splitImages, setSplitImages] = useState([]);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleUpload = () => {
    if (!file || !number) {
      alert('Please select a file and enter a number');
      return;
    }

    const image = new Image();
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      const partWidth = Math.floor(width / number);

      const parts = [];

      for (let i = 0; i < number; i++) {
        const startX = i * partWidth;
        const endX = (i + 1) * partWidth;

        canvas.width = partWidth;
        canvas.height = height;

        context.clearRect(0, 0, partWidth, height);
        context.drawImage(image, startX, 0, partWidth, height, 0, 0, partWidth, height);

        const partDataURL = canvas.toDataURL();

        parts.push(partDataURL);
      }

      setSplitImages(parts);
    };

    image.src = URL.createObjectURL(file);
  };

  return (
    <div>
      <label>
        Select Image:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <label>
        Enter Number of Parts:
        <input type="number" value={number} onChange={handleNumberChange} />
      </label>
      <br />
      <button onClick={handleUpload}>Upload</button>

      {splitImages.length > 0 && (
        <div>
          <h2>Split Images:</h2>
          {splitImages.map((part, index) => (
            <>
                <div style={{display:"flex"}}>
                    <img key={index} src={part} alt={`Part ${index + 1}`} style={{ marginLeft: "2px"}} />
                </div>
            </>
          ))}
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'flex' }} />
    </div>
  );
};

export default ImageSplitter;

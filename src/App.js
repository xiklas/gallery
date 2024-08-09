import React, { useState, useEffect } from 'react';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Ersetze die URL durch die URL deiner Cloud Function
    fetch('https://[REGION]-[PROJECT_ID].cloudfunctions.net/getImageList')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
      ))}
    </div>
  );
}

export default App;

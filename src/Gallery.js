import React, { useEffect, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/imageList.json')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Fehler beim Laden der Bilder:', error));
  }, []);

  return (
    <div className="gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Gallery ${index}`} className="gallery-image" />
      ))}
    </div>
  );
};

export default Gallery;

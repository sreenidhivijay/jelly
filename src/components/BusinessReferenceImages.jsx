import React from 'react';

function BusinessReferenceImages({ images, brandName }) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="reference-images-section">
      <h3>Inspiration from {brandName}</h3>
      <div className="image-gallery">
        {images.map((image) => (
          <a href={image.url} target="_blank" rel="noopener noreferrer" key={image.id}>
            <img src={image.url} alt={`Reference from ${brandName}`} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default BusinessReferenceImages;
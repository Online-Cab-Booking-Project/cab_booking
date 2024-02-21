import React, { Component, useState } from 'react';

function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToPrevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <div className="carousel">
        <button onClick={goToPrevSlide}>Prev</button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        <button onClick={goToNextSlide}>Next</button>
      </div>
    );
}

function Car() {
        const images = [
          'src/assets/01.jpg',
          'src/assets/02.jpg',
          'src/assets/03.jpg',
        ];
      
        return (
          <div>
            <h1>Image Carousel</h1>
            <Carousel images={images} />
          </div>
        );
      

}

export default Car;
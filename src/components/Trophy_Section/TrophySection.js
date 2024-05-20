import React, { useState } from 'react';

import './trophySection.css';
import woodImg from '../../utils/images/trophies/bronze trophy.svg'
import bronzeImg from '../../utils/images/trophies/bronze trophy.svg'
import silverImg from '../../utils/images/trophies/silverTrophy.png'

const trophyImages = [
  { src: woodImg, title: 'Wood', range: 2 },
  { src: bronzeImg, title: 'Bronze', range: 500 },
  { src: silverImg, title: 'Silver', range: 5000 },
];


const TrophySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % trophyImages.length);
  // };

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + trophyImages.length) % trophyImages.length);
  // };

  const handleNext = () => {
    if (currentIndex < trophyImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  
  return (
    <section className='trophy_section container text-center my-3'>
        <h4 className='text-white'>{trophyImages[currentIndex].title}</h4>
        <span className='muted-color'>Your number of shares determines the league you enter.</span>

        <section className="trophy-slider mt-5">
          <div className="carousel">
            {currentIndex > 0 && (
              <button onClick={handlePrev} className="carousel-button prev">❮</button>
            )}
              <img src={trophyImages[currentIndex].src} alt={trophyImages[currentIndex].title} className="carousel-image img-fluid" width="175px" />
            {currentIndex < trophyImages.length - 1 && (
              <button onClick={handleNext} className="carousel-button next">❯</button>
            )}   
          </div>
          <div className="trophy-range text-white mt-4">
            <h6>From {trophyImages[currentIndex].range}</h6>
          </div>
        </section>
    </section>
  )
}

export default TrophySection;
import React, { useEffect, useState } from 'react';

import './trophySection.css';
import woodImg from '../../utils/images/trophies/bronze trophy.svg';
import bronzeImg from '../../utils/images/trophies/bronze trophy.svg';
import silverImg from '../../utils/images/trophies/silverTrophy.png';

const trophyImages = [
  { src: woodImg, title: 'Wood', rangeStart: 0, rangeEnd: 500 },
  { src: bronzeImg, title: 'Bronze', rangeStart: 500, rangeEnd: 5000 },
  { src: silverImg, title: 'Silver', rangeStart: 5000, rangeEnd: 50000 },
  { src: silverImg, title: 'Gold', rangeStart: 50000, rangeEnd: Infinity },
];


const TrophySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [points, setPoints] = useState(450);

  const getCurrentTrophyIndex = () => {
    for (let i = 0; i < trophyImages.length; i++) {
      if (points >= trophyImages[i].rangeStart && points < trophyImages[i].rangeEnd) {
        return i;
      }
    }
    return trophyImages.length - 1;
  };

  useEffect(() => {
    setCurrentIndex(getCurrentTrophyIndex());
  }, [points]);

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

  const currentTrophy = trophyImages[currentIndex];
  const rangeSize = currentTrophy.rangeEnd - currentTrophy.rangeStart;
  const progressBarWidth = Math.min(((points - currentTrophy.rangeStart) / rangeSize) * 100, 100) + '%';
  const pointsInRange = points >= currentTrophy.rangeStart && points < currentTrophy.rangeEnd;

  
  
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
          <section className="trophy-range container text-white mt-4">
          {pointsInRange && (
            <section className="trophy-range container text-white mt-4">
              <h6>{points} / {currentTrophy.rangeEnd}</h6>
              <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={points - currentTrophy.rangeStart} aria-valuemin="0" aria-valuemax={rangeSize}>
                <div className="progress-bar rounded-pill" style={{ width: progressBarWidth }}></div>
              </div>
            </section>
          )}
          {!pointsInRange && (
            <section className="trophy-range container text-white mt-4">
              <h6>From {currentTrophy.rangeStart}</h6>
            </section>
          )}
          </section>
        </section>
    </section>
  )
}

export default TrophySection;
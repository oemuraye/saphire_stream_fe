import React, { useEffect, useState } from 'react';

import woodImg from '../../utils/images/trophies/wood.png';
import bronzeImg from '../../utils/images/trophies/Bronze.png';
import silverImg from '../../utils/images/trophies/Silver.png';
import goldImg from '../../utils/images/trophies/Gold.png';
import platinumImg from '../../utils/images/trophies/Platinum.png';
import diamondImg from '../../utils/images/trophies/Diamond.png';
import masterImg from '../../utils/images/trophies/Master.png';
import grandMasterImg from '../../utils/images/trophies/Grandmaster.png';
import eliteImg from '../../utils/images/trophies/Elite league.png';
import legendaryImg from '../../utils/images/trophies/Legendary.png';
import mythicImg from '../../utils/images/trophies/Mystic league.png';
import './trophySection.css';

const trophyImages = [
  { src: woodImg, title: 'Wood', rangeStart: 0, rangeEnd: 1 },
  { src: bronzeImg, title: 'Bronze', rangeStart: 1, rangeEnd: 5000 },
  { src: silverImg, title: 'Silver', rangeStart: 5000, rangeEnd: 50000 },
  { src: goldImg, title: 'Gold', rangeStart: 50000, rangeEnd: 200000 },
  { src: platinumImg, title: 'Platinum', rangeStart: 200000, rangeEnd: 500000 },
  { src: diamondImg, title: 'Diamond', rangeStart: 500000, rangeEnd: 1000000 },
  { src: masterImg, title: 'Master', rangeStart: 1000000, rangeEnd: 2500000 },
  { src: grandMasterImg, title: 'Grand Master', rangeStart: 2500000, rangeEnd: 5000000 },
  { src: eliteImg, title: 'Elite League', rangeStart: 5000000, rangeEnd: 10000000 },
  { src: legendaryImg, title: 'Legendary', rangeStart: 10000000, rangeEnd: 50000000 },
  { src: mythicImg, title: 'Mythic', rangeStart: 50000000, rangeEnd: Infinity },
];


const TrophySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));  
  const [points, setPoints] = useState(Number(user?.data?.coins));

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
        <h4 className='text-white'>{trophyImages[currentIndex].title} League</h4>
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
import React from 'react';

import woodImg from '../../utils/images/trophies/bronze trophy.svg'
import bronzeImg from '../../utils/images/trophies/bronze trophy.svg'
import silverImg from '../../utils/images/trophies/silverTrophy.png'
import { useNavigate } from 'react-router-dom';

const TrophyInfo = ({coinPoints, league}) => {
   // Define trophy images and their corresponding point ranges
   const trophies = [
    { src: woodImg, title: 'Wood', rangeEnd: 500 },
    { src: bronzeImg, title: 'Bronze', rangeEnd: 5000 },
    { src: silverImg, title: 'Silver', rangeEnd: 50000 },
    { src: silverImg, title: 'Gold', rangeEnd: Infinity },
  ];

  const navigate = useNavigate();

  const goToTrophyPage = () => {
    navigate(`/trophy`);
  };

  // Find the trophy image corresponding to the user's coinPoints
  const trophy = trophies.find(trophy => coinPoints >= trophy.rangeStart && coinPoints < trophy.rangeEnd) || trophies[trophies.length - 1];

  return (
    <div className='trophy d-flex justify-content-center align-items-center gap-1' onClick={goToTrophyPage} role='button'>
      <img src={trophy.src} alt="trophy-logo" width="13px" />
      <span className='muted-color'>{trophy.title}</span>
      <i className="muted-color fa fa-angle-right" aria-hidden="true"></i>
    </div>
  );
};

export default TrophyInfo
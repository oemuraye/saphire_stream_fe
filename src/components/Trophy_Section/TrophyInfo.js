import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const TrophyInfo = ({coinPoints, league}) => {
   // Define trophy images and their corresponding point ranges
   const trophies = [
    { src: woodImg, title: 'Wood', rangeStart: 0, rangeEnd: 1 },
    { src: bronzeImg, title: 'Bronze', rangeStart: 1, rangeEnd: 500 },
    { src: silverImg, title: 'Silver', rangeStart: 500, rangeEnd: 5000 },
    { src: goldImg, title: 'Gold', rangeStart: 5000, rangeEnd: 50000 },
    { src: platinumImg, title: 'Platinum', rangeStart: 50000, rangeEnd: 500000 },
    { src: diamondImg, title: 'Diamond', rangeStart: 500000, rangeEnd: 1000000 },
    { src: masterImg, title: 'Master', rangeStart: 1000000, rangeEnd: 2500000 },
    { src: grandMasterImg, title: 'Grand Master', rangeStart: 2500000, rangeEnd: 5000000 },
    { src: eliteImg, title: 'Elite League', rangeStart: 5000000, rangeEnd: 10000000 },
    { src: legendaryImg, title: 'Legendary', rangeStart: 10000000, rangeEnd: 50000000 },
    { src: mythicImg, title: 'Mythic', rangeStart: 50000000, rangeEnd: Infinity },
  ];

  const navigate = useNavigate();

  const goToTrophyPage = () => {
    navigate(`/trophy`);
  };

  // Find the trophy image corresponding to the user's coinPoints
  const trophy = trophies.find(trophy => coinPoints >= trophy.rangeStart && coinPoints < trophy.rangeEnd) || trophies[trophies.length - 1];

  return (
    <div className='trophy d-flex justify-content-center align-items-center'>
      <div className='d-flex gap-1 align-items-center' onClick={goToTrophyPage} role='button'>
        <img src={trophy.src} alt="trophy-logo" width="13px" />
        <span className='muted-color'>{trophy.title}</span>
        <i className="muted-color fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>
  );
};

export default TrophyInfo
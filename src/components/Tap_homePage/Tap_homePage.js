import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProgressBar from './ProgressBar/ProgressBar';
import trophyIcon from "../../utils/svgs/bronze trophy.svg";
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import coinImg from "../../utils/images/tap coin.png";

import './tap.css';

const Tap_homePage = () => {
  const [points, setPoints] = useState(18);
  const [remainingPoints, setRemainingPoints] = useState(500);
  const [clickAnimations, setClickAnimations] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(500);
  const intervalRef = useRef(null);

  const navigate = useNavigate();

  const goToTrophyPage = () => {
    navigate(`/trophy`);
  };


  useEffect(() => {
    if (remainingPoints < 500) {
      intervalRef.current = setInterval(() => {
        setRemainingPoints((prev) => Math.min(prev + 1, 500));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [remainingPoints]);


  const handleTap = (e) => {
    if (remainingPoints > 0) {
      setPoints(prevPoints => prevPoints + 1);
      setRemainingPoints(prevRemainingPoints => prevRemainingPoints - 1);

      // Calculate click position relative to the image
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left + 140;
      const y = e.clientY - rect.top;

      // Create a unique animation entry
      const newAnimation = {
        id: Date.now(),
        x,
        y
      };

      setClickAnimations(prevAnimations => [...prevAnimations, newAnimation]);

      // Temporarily remove the 'clicked' class to restart the animation
      const coinImgElement = e.target;
      coinImgElement.classList.remove('clicked');

      void coinImgElement.offsetWidth;
      coinImgElement.classList.add('clicked');

      setTimeout(() => {
        setClickAnimations(prevAnimations => prevAnimations.filter(anim => anim.id !== newAnimation.id));
      }, 1000);
    }

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRemainingPoints(prev => Math.min(prev + 1, 500));
    }, 1000);
  };

  const progressPercentage = (remainingPoints / 500) * 100;

  return (
    <>
      <section className='tap_section'> 
        <section>
          <section className='points_section d-flex flex-column justify-content-center gap-1 pt-2'>
            <div className='points d-flex justify-content-center align-items-center gap-1'>
              <img src={coinIcon} alt="coin-logo" width="30px" />
              <span className=''>{points}</span>
            </div>
            <div onClick={goToTrophyPage} role='button' className='trophy d-flex justify-content-center align-items-center gap-1'>
              <img src={trophyIcon} alt="trophy-logo" width="13px" />
              <span className='muted-color'>Bronze</span>
              <i className="muted-color fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </section>

          <section className='coinTap_section container d-flex justify-content-center' onClick={handleTap}>
            <img src={coinImg} alt="coin-img" className="img-fluid" width="100%" height="250px" />
            {clickAnimations.map(animation => (
              <span key={animation.id} className="plus-one" style={{ left: `${animation.x}px`, top: `${animation.y}px` }}
              >+1</span>
            ))}
          </section>
        </section>
      </section>
      <section className="tap-progress_section container">
        <ProgressBar remainingPoints={remainingPoints} progressPercentage={progressPercentage} energyLevel={energyLevel} /> 
      </section>
    </>
  );
};

export default Tap_homePage;
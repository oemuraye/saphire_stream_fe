import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import ProgressBar from './ProgressBar/ProgressBar';
import TapCoin from './TapCoin/TapCoin';
import Menu from '../Menu/Menu';

import trophyIcon from "../../utils/svgs/bronze trophy.svg";
import coinIcon from "../../utils/images/goldCoin.png";
import coinImg from "../../utils/images/coin.png";

import './tap.css'

const Tap_homePage = () => {
  const [points, setPoints] = useState(18);
  const [remainingPoints, setRemainingPoints] = useState(500);
  const [clickAnimations, setClickAnimations] = useState([]);
  const [clickedPosition, setClickedPosition] = useState(null);
  
  const navigate = useNavigate();

  const goToTrophyPage = () => {
    navigate(`/trophy`);
  }

  const handleTap = (e) => {
    if (remainingPoints > 0) {
      setPoints(prevPoints => prevPoints + 1);
      setRemainingPoints(prevRemainingPoints => prevRemainingPoints - 1);

      // Calculate click position relative to the image
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create a unique animation entry
      const newAnimation = {
        id: Date.now(),
        x,
        y
      };

      setClickAnimations(prevAnimations => [...prevAnimations, newAnimation]);

      // Set the clicked position for the image dip effect
      setClickedPosition({ x, y });

      // Temporarily remove the 'clicked' class to restart the animation
      const coinImgElement = e.target;
      coinImgElement.classList.remove('clicked');
      void coinImgElement.offsetWidth; // Trigger reflow
      coinImgElement.classList.add('clicked');

      // Remove the animation after 1 second
      setTimeout(() => {
        setClickAnimations(prevAnimations => prevAnimations.filter(anim => anim.id !== newAnimation.id));
      }, 1000);
    }
  };

  const progressPercentage = (remainingPoints / 500) * 100;

  return (
    <>
      <section className='tap_section'> 
        <section>
          <section className='points_section d-flex flex-column justify-content-center gap-1 pt-3'>
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

          <section className='coinTap_section container d-flex justify-content-center '>
          <img src={coinImg} alt="coin-img" 
              className={clickedPosition ? 'clicked' : ''}
              style={{
                transformOrigin: clickedPosition ? `${clickedPosition.x}px ${clickedPosition.y}px` : 'center'
              }}
              width="100%"
              onClick={handleTap}
            />
            {clickAnimations.map(animation => (
              <span key={animation.id}
                className="plus-one"
                style={{ left: `${animation.x}px`, top: `${animation.y}px` }}
              >+1</span>
            ))}
          </section>
        </section>

      </section>
      <section className="tap-progress_section container">
        <ProgressBar remainingPoints={remainingPoints} progressPercentage={progressPercentage} /> 
      </section>
    </>
  )
}

export default Tap_homePage
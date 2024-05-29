import React, { useEffect, useRef, useState, useContext } from 'react';


import ProgressBar from './ProgressBar/ProgressBar';
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import coinImg from "../../utils/images/tap coin.png";

import './tap.css';
import Loading from '../LoadingSection/Loading';
import UserContext from '../../contexts/UserContext';
import TrophyInfo from '../Trophy_Section/TrophyInfo';
import API from '../../api/api';

const Tap_homePage = () => {
  const { user, isLoading, updateUser } = useContext(UserContext);

  const [energyLevel, setEnergyLevel] = useState(user?.data?.energy || 500);
  const [tapSequence, setTapSequence] = useState(user?.data?.booster_data.tap || 1);
  const [remainingPoints, setRemainingPoints] = useState(500);
  const [clickAnimations, setClickAnimations] = useState([]);
  const [points, setPoints] = useState(0);
  const intervalRef = useRef(null);


  useEffect(() => {
    if (user && user.data) {
      setEnergyLevel(user.data.energy || 500);
      setPoints(user.data.coins || 0);
    }
  }, [user]);

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
    e.preventDefault();

    const isTouchEvent = e.type === 'touchstart';
    const touchPoints = isTouchEvent ? e.touches : [e]; // Handle both touch and mouse events
    const newClickAnimations = [];

    for (let i = 0; i < touchPoints.length; i++) {
      const touch = touchPoints[i];
      if (remainingPoints > 0) {
        setPoints(prevPoints => prevPoints + 1);
        setRemainingPoints(prevRemainingPoints => prevRemainingPoints - 1);

        // Calculate touch position relative to the image
        const rect = e.target.getBoundingClientRect();
        const x = isTouchEvent ? touch.clientX - rect.left + 70 : e.clientX - rect.left + 70;
        const y = isTouchEvent ? touch.clientY - rect.top : e.clientY - rect.top;

        // Create a unique animation entry
        const newAnimation = {
          id: Date.now() + i,
          x,
          y
        };

        newClickAnimations.push(newAnimation);
      }
    }

    setClickAnimations(prevAnimations => [...prevAnimations, ...newClickAnimations]);
    // saveTappings();

    // Temporarily remove the 'clicked' class to restart the animation
    const coinImgElement = e.target;
    coinImgElement.classList.remove('clicked');

    void coinImgElement.offsetWidth;
    coinImgElement.classList.add('clicked');

    setTimeout(() => {
      setClickAnimations(prevAnimations => prevAnimations.filter(anim => !newClickAnimations.some(newAnim => newAnim.id === anim.id)));
    }, 1000);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRemainingPoints(prev => Math.min(prev + 1, 500));
    }, 1000);
  };

  const saveTappings = async () => {
    try {
      const response = await API.post('/tap', { taps: tapSequence });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const progressPercentage = (remainingPoints / 500) * 100;

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <>
      <section className='tap_section'> 
        <section>
          <section className='points_section d-flex flex-column justify-content-center gap-1 pt-4'>
            <div className='points d-flex justify-content-center align-items-center gap-1'>
              <img src={coinIcon} alt="coin-logo" width="30px" />
              <span className=''>{points}</span>
            </div>
            <TrophyInfo points={points} league={user?.data.league} />
          </section>

          <section className='coinTap_section container d-flex justify-content-center' 
            onTouchStart={handleTap} 
            onMouseDown={handleTap}
            onTouchMove={(e) => e.preventDefault()} 
          >
            <img src={coinImg} alt="coin-img" className="img-fluid" width="100%" height="250px" />
            {clickAnimations.map(animation => (
              <span key={animation.id} className="plus-one" style={{ left: `${animation.x}px`, top: `${animation.y}px` }}
              >+{tapSequence}</span>
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
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { useRemainingPoints } from '../../contexts/RemainingPointsContext';
import API from '../../api/api';
import Loading from '../LoadingSection/Loading';
import TrophyInfo from '../Trophy_Section/TrophyInfo';

import ProgressBar from './ProgressBar/ProgressBar';
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import coinImg from "../../utils/images/tap coin.png";
import speedCoinImg from "../../utils/images/speedtapping.png";

import './tap.css';

const Tap_homePage = ({points, setPoints, speedTapping, remainingPoints, setRemainingPoints, setSpeedTapping, fullEnergyLevel, setFullEnergyLevel, tapSequence, setTapSequence, energyLimit, setEnergyLevel, energyLevel, accumulatedTaps, setAccumulatedTaps }) => {
  const { isLoading, updateBoosters, updateUser } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [clickAnimations, setClickAnimations] = useState([]);
  // const [accumulatedTaps, setAccumulatedTaps] = useState(0);
  const [initialPoints, setInitialPoints] = useState(user?.data?.coins || 0);
  const saveTappingsIntervalRef = useRef(null);
  const intervalRef = useRef(null);
  const location = useLocation();


  useEffect(() => {
    if (user && user?.data) {
      setEnergyLevel(user.data.energy);
      const savedPoints = localStorage.getItem('points');
      const initialPoints = savedPoints ? parseInt(savedPoints, 10) : user.data.coins || 0;
      setPoints(initialPoints);    
    }
  }, [user, setPoints]);



  useEffect(() => {
    if (remainingPoints < energyLimit) {
      intervalRef.current = setInterval(() => {
        setRemainingPoints((prev) => {
          const newRemainingPoints = Math.min(prev + 1, energyLimit);
          localStorage.setItem('remainingPoints', newRemainingPoints);
          return newRemainingPoints;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, []);



  // useEffect(() => {
  //   const savedRemainingPoints = localStorage.getItem('remainingPoints');
  //   if (savedRemainingPoints) {
  //     setRemainingPoints(parseInt(savedRemainingPoints, 10));
  //   }
  // }, []);



  useEffect(() => {
    if (speedTapping) {
      const originalTapSequence = tapSequence;
      setTapSequence(prev => prev * 5);

      const speedTappingTimer = setTimeout(() => {
        setSpeedTapping(false);
        setTapSequence(originalTapSequence);
      }, 20000);

      return () => clearTimeout(speedTappingTimer);
    }
  }, [speedTapping]);



  useEffect(() => {
    if (fullEnergyLevel) {
      setRemainingPoints(energyLimit);

      const fullEnergyTimer = setTimeout(() => {
        setFullEnergyLevel(false);
      }, 20000);

      return () => clearTimeout(fullEnergyTimer);
    }
  }, [fullEnergyLevel, energyLimit, setRemainingPoints]);



  // useEffect(() => {
  //   if (remainingPoints < 500 && !fullEnergyLevel) {
  //     intervalRef.current = setInterval(() => {
  //       setRemainingPoints((prev) => {
  //         const newRemainingPoints = Math.min(prev + 1, 500);
  //         localStorage.setItem('remainingPoints', newRemainingPoints);
  //         return newRemainingPoints;
  //       });
  //     }, 1000);
  //   } else {
  //     clearInterval(intervalRef.current);
  //   }

  //   return () => clearInterval(intervalRef.current);
  // }, [remainingPoints, fullEnergyLevel]);


  const handleTap = (e) => {
    e.preventDefault();

    const isTouchEvent = e.type === 'touchstart';
    const touchPoints = isTouchEvent ? e.touches : [e]; // Handle both touch and mouse events
    const newClickAnimations = [];

    for (let i = 0; i < touchPoints.length; i++) {
      const touch = touchPoints[i];
      if (remainingPoints > 0 || speedTapping) {
        setPoints((prevPoints) => {
          const newPoints = prevPoints + tapSequence;
          localStorage.setItem('points', newPoints);
          updateUser({ coins: newPoints });
          return newPoints;
        });

        if (!speedTapping) {
          setRemainingPoints(prevRemainingPoints => {
            const newRemainingPoints = prevRemainingPoints - 1;
            localStorage.setItem('remainingPoints', newRemainingPoints);
            return newRemainingPoints;
          });
        }

        setAccumulatedTaps(prev => prev + tapSequence);

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
      setRemainingPoints(prev => {
        const newRemainingPoints = Math.min(prev + 1, energyLevel);
        localStorage.setItem('remainingPoints', newRemainingPoints);
        return newRemainingPoints;
      });
    }, 1000);

  };

  const saveTappings = async () => {
    console.log(accumulatedTaps);
    try {
      await API.post('/tap', { "taps": accumulatedTaps });
      console.log("points sent");
      setAccumulatedTaps(0);
      const userResponse = await API.get('/user');
      updateUser(userResponse.data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (accumulatedTaps > 0) {
      const handleBeforeUnload = (event) => {
        saveTappings();
        event.preventDefault();
        event.returnValue = ''; // Standard way to trigger a confirmation dialog
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [accumulatedTaps]);

  // useEffect(() => {
  //   if (accumulatedTaps >= 100) {
  //     saveTappings();
  //   }
  // }, [accumulatedTaps]);

  useEffect(() => {
    if (accumulatedTaps > 0) {
      const saveTappingsInterval = setInterval(() => {
        saveTappings();
        setAccumulatedTaps(0);
      }, 3000);
  
      return () => {
        clearInterval(saveTappingsInterval);
      };
    }
  }, [accumulatedTaps]);
  

  const progressPercentage = (remainingPoints / energyLimit) * 100;

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
            <TrophyInfo coinPoints={points} league={user?.data.league} />
          </section>

          <section className={`coinTap_section container d-flex justify-content-center pb-5 ${speedTapping && 'speed-tapping'}`} >
            <img src={coinImg} alt="coin-img" className="img-fluid" width="100%" height="250px"
              onTouchStart={handleTap} 
              onMouseDown={handleTap}
              onTouchMove={(e) => e.preventDefault()}
            />
            {clickAnimations.map(animation => (
              <span key={animation.id} className="plus-one" style={{ left: `${animation.x}px`, top: `${animation.y}px` }}
              >+{tapSequence}</span>
            ))}
          </section>
        </section>
      </section>
      <section className="tap-progress_section container">
        <ProgressBar remainingPoints={remainingPoints} progressPercentage={progressPercentage} energyLimit={energyLimit} /> 
      </section>
    </>
  );
};

export default Tap_homePage;
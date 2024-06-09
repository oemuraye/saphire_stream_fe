import React, { useEffect, useRef, useState, useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import API from '../../api/api';
import Loading from '../LoadingSection/Loading';
import TrophyInfo from '../Trophy_Section/TrophyInfo';

import ProgressBar from './ProgressBar/ProgressBar';
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import coinImg from "../../utils/images/tap coin.png";

import './tap.css';
import TapBotModal from './TapBotModal';

const Tap_homePage = ({
  points, setPoints, speedTapping, remainingPoints, setRemainingPoints, 
  setSpeedTapping, fullEnergyLevel, setFullEnergyLevel, tapSequence,
  setTapSequence, energyLimit, setEnergyLevel, energyLevel, 
  accumulatedTaps, setAccumulatedTaps, energyRecharge,
  tapBot, setTapBotCoinsCount, setTapBotCoins, tapBotCoins, isTapBotModalOpen, setIsTapBotModalOpen
}) => {

  const { isLoading, updateUser } = useContext(UserContext);
  const [clickAnimations, setClickAnimations] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const accumulatedTapsRef = useRef(accumulatedTaps);
  const saveTappingsIntervalRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const coinSectionRef = useRef(null);


  useEffect(() => {
    if (user && user?.data) {
      setEnergyLevel(user.data.energy);
      const savedPoints = localStorage.getItem('points');
      const initialPoints = savedPoints ? parseInt(savedPoints, 10) : user.data.coins || 0;
      setPoints(initialPoints);    
    }
  }, [user, setPoints]);


  

  const openModal = () => {
    if (!isTapBotModalOpen) {
      setIsTapBotModalOpen(true);
    }
  };

  const closeTaskModal = () => {
    setIsTapBotModalOpen(false);
  };


  useEffect(() => {
    if (remainingPoints < energyLimit) {
      intervalRef.current = setInterval(() => {
        setRemainingPoints((prev) => {
          const newRemainingPoints = Math.min(prev + energyRecharge, energyLimit);
          localStorage.setItem('remainingPoints', newRemainingPoints);
          return newRemainingPoints;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, []);



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
      }, 3000);

      return () => clearTimeout(fullEnergyTimer);
    }
  }, [fullEnergyLevel]);


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
            const newRemainingPoints = prevRemainingPoints - tapSequence;
            localStorage.setItem('remainingPoints', newRemainingPoints);
            return newRemainingPoints;
          });
        }

        setAccumulatedTaps(prev => {
          const newTaps = prev + tapSequence;
          accumulatedTapsRef.current = newTaps;
          console.log("Updated accumulatedTaps: ", newTaps);
          return newTaps;
        });

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
        const newRemainingPoints = Math.min(prev + energyRecharge, energyLevel);
        localStorage.setItem('remainingPoints', newRemainingPoints);
        return newRemainingPoints;
      });
    }, 1000);


    // Clear the inactivity timeout and set it again
    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(() => {
      clearInterval(saveTappingsIntervalRef.current);
      saveTappingsIntervalRef.current = null;
    }, 3000);

    // If the interval is not already set, start it
    if (!saveTappingsIntervalRef.current) {
      saveTappingsIntervalRef.current = setInterval(() => saveTappings(accumulatedTapsRef.current), 3000);
    }

  };

  const saveTappings = async (tapsAccumulated) => {
    console.log("Sending taps: ", tapsAccumulated);
    const tapsToSend = tapsAccumulated;
    setAccumulatedTaps(0);
    accumulatedTapsRef.current = 0;
    
    try {
      await API.post('/tap', { "taps": tapsToSend });
      console.log("points sent");
      const userResponse = await API.get('/user');
      updateUser(userResponse.data);
    } catch (error) {
      setAccumulatedTaps(prev => {
        const newTaps = prev + tapsToSend;
        accumulatedTapsRef.current = newTaps;
        return newTaps;
      });
      console.error(error);
    }
  }


  useEffect(() => {
    if (accumulatedTaps > 0) {
      const handleBeforeUnload = (event) => {
        saveTappings(accumulatedTaps);
        event.preventDefault();
        event.returnValue = ''; // Standard way to trigger a confirmation dialog
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [accumulatedTaps]);


  useEffect(() => {
    if (accumulatedTaps > 0) {
      const saveTappingsInterval = setInterval(() => {
        saveTappings(accumulatedTaps);
      }, 3000);
  
      return () => {
        clearInterval(saveTappingsInterval);
      };
    }
  }, [accumulatedTaps]);


  useEffect(() => {
    const coinSection = coinSectionRef.current;
    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };
    
    if (coinSection) {
      coinSection.addEventListener('wheel', handleWheel);
    }
    
    return () => {
      if (coinSection) {
        coinSection.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  function formatPoints(points) {
    if (points >= 10000000) {
      return (points / 1000000).toFixed(3) + ' M';
    }
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

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
              <span className=''>{formatPoints(points)}</span>
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

      {isTapBotModalOpen && (<TapBotModal 
                          closeTaskModal={closeTaskModal} 
                          setTapBotCoinsCount={setTapBotCoinsCount}
                          setTapBotCoins={setTapBotCoins}
                          setPoints={setPoints}
                          tapBotCoins={tapBotCoins}
                        />)}
    </>
  );
};

export default Tap_homePage;
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';


import BoostersModal from './BoostersModal';
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";
import taskIcon from '../../utils/images/Small Icons/Task.png';
import flameIcon from '../../utils/images/Small Icons/Fire.png';
import boltIcon from '../../utils/images/Small Icons/Bolt.png';
import energyIcon from '../../utils/images/Small Icons/Battery.png';
import handsIcon from '../../utils/images/Small Icons/Hand.png';

import './boost.css';
import API from '../../api/api';

const Boost = ({points, setPoints, setSpeedTapping, setFullEnergyLevel}) => {
  const { user, boosters, updateUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [selectedIconSrc, setSelectedIconSrc] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [guruCount, setGuruCount] = useState(3);
  const [fullTankCount, setFullTankCount] = useState(3);
  const [boostersData, setBoostersData] = useState(boosters);
  const [selectedBooster, setSelectedBooster] = useState(null);
  


  useEffect(() => {
    if (user?.data?.booster_data?.daily_boosters) {
      setGuruCount(user.data.booster_data.daily_boosters.tapping_guru);
      setFullTankCount(user.data.booster_data.daily_boosters.full_tank);
    }
  }, [user]);

  const openModal = (iconSrc, title, booster, level) => {
    if (!isModalOpen) {
      setSelectedBooster(booster);
      setSelectedTitle(title);
      setSelectedIconSrc(iconSrc);
      // setSelectedLevel(level);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooster(null);
    setSelectedTitle('');
    setSelectedIconSrc('');
    // setSelectedLevel(0);
  };

  useEffect(() => {
    if (successAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successAlert]);

  const boosterIcons = {
    'Multitap': handsIcon,
    'Energy Limit': energyIcon,
    'Recharging Speed': boltIcon,
    'Tap Bot': taskIcon,
  };

  const boosterFieldMap = {
    'Multitap': 'tap_level',
    'Energy Limit': 'energy_limit_level',
    'Recharging Speed': 'energy_recharge_level',
    'Tap Bot': 'tap_bot',
  };

  const getUserBoosterLevel = (boosterName) => {
    const fieldName = boosterFieldMap[boosterName];
    return user?.data?.booster_data?.[fieldName] || 0;
  };

  const getUserBoosterValue = (booster, level) => {
    return booster.data.levels[level]?.value || 0;
  };

  const getUserBoosterPrice = (booster, level) => {
    return booster.data.levels[level]?.price || 0;
  };


  return (
    <>
      <section className='boost_section container'>
        <section className='points_section d-flex flex-column justify-content-center pt-3'>
          <h6 className='text-center muted-color mb-0'>Your Share balance</h6>
          <div className='points d-flex justify-content-center align-items-center gap-1'>
            <img src={coinIcon} alt="coin-logo" width="30px" />
            <span className=''>{points}</span>
          </div>
        </section>

        <hr className='muted-color' />

        <section className='daily-boosters container text-white my-3'>
          <h5>Your daily boosters:</h5>
          <section className="d-flex justify-content-between align-items-center gap-1">
            <div role="button" onClick={() => openModal(flameIcon, 'Tapping Guru', null)} className='taskPad col-6 d-flex gap-2 align-items-center rounded-3 py-2 px-2 gap-2'>
              <img src={flameIcon} alt="taskIcon" width="30px" height="" />
              <div className="d-flex flex-column">
                <h6 className='mb-0'>Tapping Guru</h6>
                <div className=''>
                  <span>{guruCount}/3</span>
                </div>
              </div>
            </div>
            <div role="button" onClick={() => openModal(boltIcon, 'Full Tank', null)} className='taskPad col-6 d-flex gap-2 align-items-center rounded-3 py-2 px-2 gap-2 ms-1'>
              <img src={boltIcon} alt="boltIcon" width="30px" height="" />
              <div className="d-flex flex-column">
                <h6 className='mb-0'>Full Tank</h6>
                <div className=''>
                  <span>{fullTankCount}/3</span>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className='boosters text-white my-3'>
          <h5>Boosters:</h5>
          <section className="d-flex flex-column gap-2">
          {boosters?.data.map((booster, index) => {
              const boosterName = booster.name;
              const boosterIcon = boosterIcons[boosterName];
              const userBoosterLevel = getUserBoosterLevel(boosterName);
              const boosterValue = getUserBoosterValue(booster, userBoosterLevel);
              const boosterPrice = getUserBoosterPrice(booster, userBoosterLevel);

              return (
                <section key={index} role="button" onClick={() => openModal(boosterIcon, boosterName, booster)}
                  className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3"
                >
                  <div className='d-flex gap-3 align-items-center'>
                    <img src={boosterIcon} alt={`${boosterName}Icon`} width="40px" height="" />
                    <div className="d-flex flex-column">
                      <h6>{boosterName}</h6>
                      <div className='boosters-numbers d-flex align-items-center gap-1'>
                        <img src={coinIcon} alt="coin-icon" width="20px" />
                        <span>{boosterPrice}</span>
                        {boosterName === "Tap Bot" ? null : <span className='muted-color'>| {boosterValue} level</span>}
                      </div>
                    </div>
                  </div>
                  <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                </section>
              );
            })}
          </section>
        
        </section>
      </section>
      {successAlert && (
        <section className="alert-toast d-flex align-items-center rounded-3 py-3 px-3 gap-2">
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <h6 className="mb-0">Good!</h6>
        </section>
      )}
      {isModalOpen && (
          <BoostersModal 
            onClose={closeModal} 
            iconSrc={selectedIconSrc} 
            title={selectedTitle} 
            selectedBooster={selectedBooster}
            setSuccessAlert={setSuccessAlert}
            setSpeedTapping={setSpeedTapping}
            setFullEnergyLevel={setFullEnergyLevel}
            levels={user?.data?.booster_data}
          />
        )}    
    </>
  )
}

export default Boost
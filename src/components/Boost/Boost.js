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
import { useNavigate } from 'react-router-dom';

const Boost = ({ points, setPoints, setSpeedTapping, setFullEnergyLevel, 
  guruCount, setGuruCount, fullTankCount, setFullTankCount, 
  setTapSequence, tapLevel, energyLimitLevel, 
  energyRechargeLevel, tapBotLevel, setTapLevel, 
  setEnergyLimitLevel, setEnergyRechargeLevel, 
  seTapBotLevel, accumulatedTaps, setAccumulatedTaps, 
  setEnergyLevel, setEnergyRecharge, tapBot 
}) => {
  const { boosters, updateBoosters } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selectedIconSrc, setSelectedIconSrc] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedBooster, setSelectedBooster] = useState(null);
  const [boosterLevel, setBoosterLevel] = useState(0);
  const [boosterValue, setBoosterValue] = useState(0);
  const [boosterPrice, setBoosterPrice] = useState(0);

  useEffect(() => {
    if (user?.booster_data?.daily_boosters) {
      setGuruCount(user?.booster_data?.daily_boosters.tapping_guru);
      setFullTankCount(user?.booster_data?.daily_boosters.full_tank);
      setTapLevel(user?.booster_data?.tap_level);
      setEnergyLimitLevel(user?.booster_data?.energy_limit_level);
      setEnergyRechargeLevel(user?.booster_data?.energy_recharge_level);
    }
  }, []);

  useEffect(() => {
    if (user?.booster_data?.daily_boosters) {
      setGuruCount(user.booster_data.daily_boosters.tapping_guru);
      setFullTankCount(user.booster_data.daily_boosters.full_tank);
      setTapLevel(user?.booster_data?.tap_level);
      setEnergyLimitLevel(user?.booster_data?.energy_limit_level);
      setEnergyRechargeLevel(user?.booster_data?.energy_recharge_level);
    }
  }, [user]);

  

  const openModal = (iconSrc, title, booster, value, level, price) => {
    if (!isModalOpen) {
      setSelectedBooster(booster);
      setSelectedTitle(title);
      setSelectedIconSrc(iconSrc);
      setBoosterLevel(level);
      setBoosterValue(value);
      setBoosterPrice(price);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooster(null);
    setSelectedTitle('');
    setSelectedIconSrc('');
    setBoosterLevel(0);
    setBoosterValue(0);
    setBoosterPrice(0);
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
    'Multitap': tapLevel,
    'Energy Limit': energyLimitLevel,
    'Recharging Speed': energyRechargeLevel,
    'Tap Bot': tapBotLevel,
  };

  const getUserBoosterLevel = (boosterName) => {
    const fieldName = boosterFieldMap[boosterName];
    const level = boosterFieldMap[boosterName];
    // const level = Number(user?.data?.booster_data?.[fieldName])
    return Number(level);
  };

  const getBoosterLevelData = (booster, level) => {
    return booster.data.levels.find(l => l.level === level) || {};
  };

  console.log(user);
  console.log(boosters);

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
              {/* <span className='section_overlay'></span> */}
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
              const isTapBot = boosterName === 'Tap Bot';
              const isEnergyLimit = boosterName === 'Energy Limit';
              const boosterData = isTapBot ? booster.data.levels[0] : getBoosterLevelData(booster, Number(userBoosterLevel) + 1);
              console.log(boosterName + ":" + userBoosterLevel);
              const boosterValue = Number(boosterData.value);
              const boosterLevel = Number(boosterData.level);
              const boosterPrice = Number(boosterData.price);

              return (
                <section key={index} role="button" onClick={() => openModal(boosterIcon, boosterName, booster, boosterValue, boosterLevel, boosterPrice)}
                  className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3"
                >
                  <div className='d-flex gap-3 align-items-center'>
                    <img src={boosterIcon} alt={`${boosterName}Icon`} width="40px" height="" />
                    <div className="d-flex flex-column">
                      <h6>{boosterName}</h6>
                      <div className='boosters-numbers d-flex align-items-center gap-1'>
                        <img src={coinIcon} alt="coin-icon" width="20px" />
                        <span>{boosterPrice}</span>
                        {isTapBot ? null : <span className='muted-color'>| {isEnergyLimit ? `${boosterValue}` : `${boosterLevel}`} level</span>}
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
          userBoosterLevel={boosterLevel}
          boosterValue={boosterValue}
          boosterPrice={boosterPrice}
          updateBoosters={updateBoosters}
          setGuruCount={setGuruCount}
          setFullTankCount={setFullTankCount}
          setTapSequence={setTapSequence}
          setTapLevel={setTapLevel} 
          setEnergyLevel={setEnergyLevel}
          setEnergyLimitLevel={setEnergyLimitLevel} 
          setEnergyRechargeLevel={setEnergyRechargeLevel}
          seTapBotLevel={seTapBotLevel}
          accumulatedTaps={accumulatedTaps} setAccumulatedTaps={setAccumulatedTaps}
          setPoints={setPoints}
          setEnergyRecharge={setEnergyRecharge}
        />
      )}    
    </>
  );
}

export default Boost;

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

const Boost = () => {
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

  // const getBoosters = async () => {
  //   try {
  //     const response = await API.get('/boosters');
  //     setBoostersData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  console.log(boostersData);

  // useEffect(() => {
  //   getBoosters();
  //   setBoostersData(boosters);
  // }, [])
  

  const openModal = (iconSrc, title, booster) => {
    if (!isModalOpen) {
      setSelectedBooster(booster);
      setSelectedTitle(title);
      setSelectedIconSrc(iconSrc);
      setIsModalOpen(true);
    }
  };

  const closeModal = (booster) => {
    setIsModalOpen(false);
    setSelectedBooster(null);
    setSelectedTitle('');
    setSelectedIconSrc('');
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

  return (
    <>
      <section className='boost_section container'>
        <section className='points_section d-flex flex-column justify-content-center pt-3'>
          <h6 className='text-center muted-color mb-0'>Your Share balance</h6>
          <div className='points d-flex justify-content-center align-items-center gap-1'>
            <img src={coinIcon} alt="coin-logo" width="30px" />
            <span className=''>{user?.data.coins}</span>
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
            {boosters?.data.map((booster, index) => (
              <section
                key={index}
                role="button"
                onClick={() => openModal(boosterIcons[booster.name], booster.name, booster)}
                className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3"
              >
                <div className='d-flex gap-3 align-items-center'>
                  <img src={boosterIcons[booster.name]} alt={`${booster.name}Icon`} width="40px" height="" />
                  <div className="d-flex flex-column">
                    <h6>{booster.name}</h6>
                    <div className='boosters-numbers d-flex align-items-center gap-1'>
                      <img src={coinIcon} alt="coin-icon" width="20px" />
                      <span>{booster.data.levels[0].price}</span>
                      {booster.name === "Tap Bot" ? null : <span className='muted-color'>| {booster.data.levels[0].value} level</span> }
                    </div>
                  </div>
                </div>
                <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
              </section>
            ))}
          </section>
          
          {/* <section className="d-flex flex-column gap-2">
            <section role="button" onClick={() => openModal(handsIcon, 'Multitap')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-3 align-items-center'>
                <img src={handsIcon} alt="handsIcon" width="40px" height="" />
                <div className="d-flex flex-column">
                  <h6>Multitap</h6>
                  <div className='boosters-numbers d-flex align-items-center gap-1'>
                    <img src={coinIcon} alt="coin-icon" width="20px" />
                    <span>200</span>
                    <span className='muted-color'>| 1 level</span>
                  </div>
                </div>
              </div>
              <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
            </section>

            <section role="button" onClick={() => openModal(energyIcon, 'Energy Limit')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-3 align-items-center'>
                <img src={energyIcon} alt="energyIcon" width="40px" height="" />
                <div className="d-flex flex-column">
                  <h6>Energy Limit</h6>
                  <div className='boosters-numbers d-flex align-items-center gap-1'>
                    <img src={coinIcon} alt="coin-icon" width="20px" />
                    <span>200</span>
                    <span className='muted-color'>| 1 level</span>
                  </div>
                </div>
              </div>
              <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
            </section>

            <section role="button" onClick={() => openModal(boltIcon, 'Recharging Speed')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-3 align-items-center'>
                <img src={boltIcon} alt="boltIcon" width="40px" height="" />
                <div className="d-flex flex-column">
                  <h6>Recharging Speed</h6>
                  <div className='boosters-numbers d-flex align-items-center gap-1'>
                    <img src={coinIcon} alt="coin-icon" width="20px" />
                    <span>2000</span>
                    <span className='muted-color'>| 1 level</span>
                  </div>
                </div>
              </div>
              <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
            </section>
            
            <section role="button" onClick={() => openModal(taskIcon, 'Tap Bot')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-3 align-items-center'>
                <img src={taskIcon} alt="taskIcon" width="40px" height="" />
                <div className="d-flex flex-column">
                  <h6>Tap Bot</h6>
                  <div className='boosters-numbers d-flex align-items-center gap-1'>
                    <img src={coinIcon} alt="coin-icon" width="20px" />
                    <span>200000</span>
                  </div>
                </div>
              </div>
              <div><i className="fa fa-angle-right" aria-hidden="true"></i></div>
            </section>
          </section> */}

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
          />
        )}    
    </>
  )
}

export default Boost
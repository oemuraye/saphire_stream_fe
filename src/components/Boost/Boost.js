import React, { useState } from 'react';

import coinIcon from "../../utils/images/goldCoin.png";
import taskIcon from '../../utils/images/task.png';
import flameIcon from '../../utils/images/fire.png';

import './boost.css';
import BoostersModal from './BoostersModal';

const Boost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIconSrc, setSelectedIconSrc] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const openModal = (IconSrc, title) => {
    setSelectedIconSrc(IconSrc);
    setSelectedTitle(title)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIconSrc('');
    setSelectedTitle('');
  };


  return (
    <>
      <section className='boost_section container'>
        <section className='points_section d-flex flex-column justify-content-center pt-2'>
          <h6 className='text-center muted-color mb-0'>Your Share balance</h6>
          <div className='points d-flex justify-content-center align-items-center gap-1'>
            <img src={coinIcon} alt="coin-logo" width="30px" />
            <span className=''>15</span>
          </div>
        </section>

        <hr className='muted-color' />

        <section className='daily-boosters container text-white my-3'>
          <h5>Your daily boosters:</h5>
          <section className="d-flex justify-content-between align-items-center gap-2">
            <div onClick={() => openModal(flameIcon, 'Taping Guru')} className='taskPad col-6 d-flex gap-2 align-items-center rounded-3 py-2 px-2 gap-2'>
              <img src={flameIcon} alt="taskIcon" width="30px" height="" />
              <div className="d-flex flex-column">
                <h6 className='mb-0'>Taping Guru</h6>
                <div className=''>
                  <span>3/3</span>
                </div>
              </div>
            </div>
            <div onClick={() => openModal(flameIcon, 'Full Task')} className='taskPad col-6 d-flex gap-2 align-items-center rounded-3 py-2 px-2 gap-2 ms-1'>
              <img src={flameIcon} alt="taskIcon" width="30px" height="" />
              <div className="d-flex flex-column">
                <h6 className='mb-0'>Full Task</h6>
                <div className=''>
                  <span>3/3</span>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className='boosters text-white my-3'>
          <h5>Boosters:</h5>
          
          <section className="d-flex flex-column gap-2">
            <section onClick={() => openModal(taskIcon, 'Multitap')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-2 align-items-center'>
                <img src={taskIcon} alt="taskIcon" width="50px" height="" />
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

            <section onClick={() => openModal(taskIcon, 'Energy Limit')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-2 align-items-center'>
                <img src={taskIcon} alt="taskIcon" width="50px" height="" />
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

            <section onClick={() => openModal(taskIcon, 'Recharging Speed')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-2 align-items-center'>
                <img src={taskIcon} alt="taskIcon" width="50px" height="" />
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
            
            <section onClick={() => openModal(taskIcon, 'Tap Bot')} className="taskPad d-flex justify-content-between align-items-center rounded-3 py-2 px-3">
              <div className='d-flex gap-2 align-items-center'>
                <img src={taskIcon} alt="taskIcon" width="50px" height="" />
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
          </section>

        </section>
      </section>
      {isModalOpen && <BoostersModal onClose={closeModal} iconSrc={selectedIconSrc} title={selectedTitle}/>}
    </>
  )
}

export default Boost
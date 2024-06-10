import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import coinIcon from "../../../utils/images/Small Icons/Tap coin.png";
import TaskModal from '../TaskModal';


const Join_socials = ({setPoints}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isRewardClaimed, setIsRewardClaimed] = useState(() => {
    const savedIsRewardClaimed = localStorage.getItem('isRewardClaimed');
    return savedIsRewardClaimed ? JSON.parse(savedIsRewardClaimed) : false;
  });
  const [missionStarted, setMissionStarted] = useState(() => {
    const savedMissionStarted = localStorage.getItem('missionStarted');
    return savedMissionStarted ? JSON.parse(savedMissionStarted) : false;
  });
  const [taskStatus, setTaskStatus] = useState(() => {
    const savedTaskStatus = localStorage.getItem('taskStatus');
    return savedTaskStatus ? JSON.parse(savedTaskStatus) : {
      telegram: '',
      twitter: '',
      website: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('missionStarted', JSON.stringify(missionStarted));
  }, [missionStarted]);

  useEffect(() => {
    localStorage.setItem('taskStatus', JSON.stringify(taskStatus));
  }, [taskStatus]);

  useEffect(() => {
    localStorage.setItem('isRewardClaimed', JSON.stringify(isRewardClaimed));
  }, [isRewardClaimed]);

  const start_mission = () => {
    setMissionStarted(true);
  }

  const handleLinkClick = (task) => {
    setTaskStatus((prevStatus) => ({ ...prevStatus, [task]: 'Checking...' }));
    setTimeout(() => {
      setTaskStatus((prevStatus) => ({ ...prevStatus, [task]: 'Done!' }));
    }, 20000);
  };

  const allTasksCompleted = Object.values(taskStatus).every(status => status === 'Done!');

  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (successAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successAlert]);

  return (
    <>
      <section className='join_socials container text-white py-2'>
        <article>
          <h4>Join our socials</h4>
          <p className="muted-color">
            We regularly share valuable content on our socials. Join us there and get the rewards
          </p>
        </article>

        <section className='taskPad w-100 col-6 d-flex gap-2 align-items-center rounded-3 py-3 px-2 gap-2'>
          <img src={coinIcon} alt="taskIcon" width="40px" height="" />
          <div className="d-flex flex-column">
            <h6 className='mb-0'>Reward</h6>
            <span className='text-light'>200 000</span>
          </div>
        </section>

        <section>
          {missionStarted === false && (<div role='button' onClick={start_mission} className='start-mission basic-gradient my-3'>
            <h5 className='mb-0'>Start mission</h5>
          </div>)}
          {allTasksCompleted && (<div className='text-center done my-3'>
            <h6 className='mb-0'>Mission Completed</h6>
          </div>)}
        </section>

        <section className='mission-tasks my-3'>
          <h5 className='py-2'>Your tasks</h5>
          <div className="mission_tasks d-flex flex-column gap-2 mt-2">
            <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
              <h6 className={missionStarted === true ? "mb-0 text-white" : "mb-0 py-1"}>Join the Telegram chat</h6>
              {missionStarted === true && (
                <>
                  {taskStatus.telegram === '' && <Link onClick={() => handleLinkClick('telegram')} to="https://t.me/SapphireStream" className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>}
                  {taskStatus.telegram && <span className={taskStatus.telegram === 'Checking...' ? 'blinking' : 'done'}>{taskStatus.telegram}</span>}
                </>
              )}
            </div>
            <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
              <h6 className={missionStarted === true ? "mb-0 text-white" : "mb-0 py-1"}>Follow X handle</h6>
              {missionStarted === true && (
                <>
                  {taskStatus.twitter === '' && <Link onClick={() => handleLinkClick('twitter')} to="https://twitter.com/sapphirestream_" className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>}
                  {taskStatus.twitter && <span className={taskStatus.twitter === 'Checking...' ? 'blinking' : 'done'}>{taskStatus.twitter}</span>}
                </>
              )}
            </div>
            <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
              <h6 className={missionStarted === true ? "mb-0 text-white" : "mb-0 py-1"}>Visit website</h6>
              {missionStarted === true && (
                <>
                  {taskStatus.website === '' && <Link onClick={() => handleLinkClick('website')} to="https://t.me/SapphireStream" className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>}
                  {taskStatus.website && <span className={taskStatus.website === 'Checking...' ? 'blinking' : 'done'}>{taskStatus.website}</span>}
                </>
              )}
            </div>
          </div>
        </section>

        <section>
          {missionStarted === true && (
              allTasksCompleted ? (
                <>
                  {isRewardClaimed === false && (<div role='button' onClick={() => openModal()} className='start-mission basic-gradient my-3'><h5 className="mb-0">Finish Mission</h5></div>)}
                </>
              ) : (
                <div className='end-mission my-3'><h5 className="mb-0">Finish mission</h5></div>
              )
            )}
        </section>
      </section>
      {successAlert && (
        <section className="alert-toast d-flex align-items-center rounded-3 py-3 px-3 gap-2">
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <h6 className="mb-0">Done!</h6>
        </section>
      )}
      {isModalOpen && (<TaskModal closeTaskModal={closeTaskModal} setSuccessAlert={setSuccessAlert} setIsRewardClaimed={setIsRewardClaimed} setPoints={setPoints} />)}
    </>
  )
}

export default Join_socials
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import coinIcon from "../../../utils/images/Small Icons/Tap coin.png";
import TaskModal from '../TaskModal';

const GeneralTask = ({ setPoints }) => {
  const location = useLocation();
  const { userTask } = location.state;

  // Helper function to create unique keys based on task ID
  const getKey = (key) => `${key}_${userTask.id}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [missionStarted, setMissionStarted] = useState(() => {
    const savedMissionStarted = localStorage.getItem(getKey('taskStarted'));
    return savedMissionStarted ? JSON.parse(savedMissionStarted) : false;
  });
  const [missionCompleted, setMissionCompleted] = useState(() => {
    const isTaskCompleted = localStorage.getItem(getKey('isTaskCompleted'));
    return isTaskCompleted ? JSON.parse(isTaskCompleted) : userTask.completed;
  });
  const [taskStatus, setTaskStatus] = useState(() => {
    const savedTaskStatus = localStorage.getItem(getKey('taskStatus'));
    return savedTaskStatus ? JSON.parse(savedTaskStatus) : '';
  });
  const [isGoBtnClicked, setIsGoBtnClicked] = useState(() => {
    const savedMissionState = localStorage.getItem(getKey('isGoBtnClicked'));
    return savedMissionState ? JSON.parse(savedMissionState) : false;
  });

  const initialRewardClaimedState = userTask.reward_claimed;
  const [isRewardClaimed, setIsRewardClaimed] = useState(initialRewardClaimedState);

  useEffect(() => {
    if (initialRewardClaimedState) {
      setIsRewardClaimed(true);
    }
  }, [initialRewardClaimedState]);

  useEffect(() => {
    localStorage.setItem(getKey('taskStarted'), JSON.stringify(missionStarted));
  }, [missionStarted]);

  useEffect(() => {
    localStorage.setItem(getKey('taskStatus'), JSON.stringify(taskStatus));
  }, [taskStatus]);

  useEffect(() => {
    localStorage.setItem(getKey('isGoBtnClicked'), JSON.stringify(isGoBtnClicked));
  }, [isGoBtnClicked]);

  useEffect(() => {
    localStorage.setItem(getKey('isTaskCompleted'), JSON.stringify(missionCompleted));
  }, [missionCompleted]);

  const start_mission = () => {
    setMissionStarted(true);
  }

  const handleGoClick = () => {
    setIsGoBtnClicked(true);
  };

  const handleLinkClick = () => {
    setTaskStatus('Checking...');
    setTimeout(() => {
      setTaskStatus('Done!');
      setMissionCompleted(true);
    }, 5000);
  };

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

  useEffect(() => {
    if (userTask?.completed) {
      localStorage.removeItem(`${getKey('taskStarted')}`);
      localStorage.removeItem(`${getKey('isTaskCompleted')}`);
      localStorage.removeItem(`${getKey('taskStatus')}`);
      localStorage.removeItem(`${getKey('isGoBtnClicked')}`);
    }
  }, [userTask?.completed]);
  

  return (
    <>
      <section className='join_socials container text-white py-2'>
        <article>
          <h4>{userTask.name}</h4>
          <p className="muted-color">
            {userTask.data.description}
          </p>
        </article>

        <section className='taskPad w-100 col-6 d-flex gap-2 align-items-center rounded-3 py-3 px-2 gap-2'>
          <img src={coinIcon} alt="taskIcon" width="40px" height="" />
          <div className="d-flex flex-column">
            <h6 className='mb-0'>Reward</h6>
            <span className='text-light'>{userTask.reward_in_coins}</span>
          </div>
        </section>

        <section>
          {missionCompleted ? (
            <div className='text-center done my-3'>
              <h6 className='mb-0'>Mission Completed</h6>
            </div>
          ) : (
            <>
              {!missionStarted && (
                <div role='button' onClick={start_mission} className='start-mission basic-gradient my-3'>
                  <h5 className='mb-0'>Start mission</h5>
                </div>
              )}
            </>           
          )}
        </section>

        <section className='mission-tasks my-3'>
          <h5 className='py-2'>Your tasks</h5>
          <div className="mission_tasks d-flex flex-column gap-2 mt-2">
            <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-2 px-2 gap-2'>
              <h6 className={missionStarted ? "mb-0 text-white" : "mb-0 py-1"}>Join the Telegram chat</h6>
              {missionStarted && (
                <>
                  {taskStatus === '' ? (
                    <>
                      {isGoBtnClicked ? (
                        <span role='button' onClick={handleLinkClick} className='go-mission basic-gradient fw-bold py-1 px-4'>Check</span>
                      ) : (
                        <Link target='_blank' onClick={handleGoClick} to={userTask.data.link} className='go-mission basic-gradient fw-bold py-1 px-4'>Go</Link>
                      )}
                    </>
                  ) : (
                    <span className={taskStatus === 'Checking...' ? 'blinking' : 'done'}>{taskStatus}</span>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <section>
          {missionStarted && (
            missionCompleted ? (
              <>
                {!isRewardClaimed && (
                  <div role='button' onClick={() => openModal()} className='start-mission basic-gradient my-3'>
                    <h5 className="mb-0">Finish Mission</h5>
                  </div>
                )}
              </>
            ) : (
              <div className='end-mission my-3'>
                <h5 className="mb-0">Finish mission</h5>
              </div>
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
      {isModalOpen && (
        <TaskModal
          closeTaskModal={closeTaskModal}
          setSuccessAlert={setSuccessAlert}
          setIsRewardClaimed={setIsRewardClaimed}
          setPoints={setPoints}
          rewardInCoins={userTask.reward_in_coins}
          taskId={userTask.id}
        />
      )}
    </>
  )
}

export default GeneralTask;
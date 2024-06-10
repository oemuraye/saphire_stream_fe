import React, { useContext, useEffect, useState } from 'react';

import SpecialTab from './Special_tab/SpecialTab';
import LeagueTab from './Leagues_tab/LeaguesTab';
import RefTaskTab from './RefTask_tab/RefTaskTab';

import trophyIcon from "../../utils/svgs/bronze trophy.svg";
import coinIcon from "../../utils/images/Small Icons/Tap coin.png";

import './task.css';
import { useNavigate } from 'react-router-dom';
import TrophyInfo from '../Trophy_Section/TrophyInfo';
import UserContext from '../../contexts/UserContext';


const Task = ({points, setPoints}) => {
  const { tasks } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [successAlert, setSuccessAlert] = useState(false);

  const hasCompletedTask = (type) => tasks?.data?.some(task => task.type === type && task.completed);
  const getTasksByType = (type) => tasks?.data?.filter(task => task.type === type) || [];
  
  const specialTasks = getTasksByType('special');
  const leagueTasks = getTasksByType('leagues');
  const refTasks = getTasksByType('ref_tasks');
  console.log(tasks);
  
  // useEffect(() => {
  //   setPoints(points);
  // }, []);

  useEffect(() => {
    if (successAlert) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successAlert]);
  
  return (
    <section className='task_section container'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 pt-3'>
      <div className='points d-flex justify-content-center align-items-center gap-1'>
        <img src={coinIcon} alt="coin-logo" width="30px" />
        <span className=''>{points}</span>
      </div>
      <TrophyInfo coinPoints={user?.data.coins} league={user?.data.league} />
    </section>

    <hr />

    <section className="task-tab_section my-3 pt-4 " id="myTab" role="tablist">
      <section className="d-flex justify-content-around align-items-center border rounded-3 p-1">
          <div className='task_tab px-4 py-2 active' id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
            <h6 className='mb-0'>Special</h6>
            {hasCompletedTask('special') && <span className='badge'>.</span>}
          </div>
          <div className='task_tab px-4 py-2' id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
            <h6 className='mb-0'>Leagues</h6>
            {hasCompletedTask('leagues') && <span className='badge'>.</span>}
          </div>
          <div className='task_tab px-4 py-2' id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
            <h6 className='mb-0'>Ref Task</h6>
            {hasCompletedTask('ref_tasks') && <span className='badge'>.</span>}
          </div>
      </section>




        <section className="tab-content mt-3" id="myTabContent">
          <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
            <SpecialTab specialTasks={specialTasks} />
          </div>
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
            <LeagueTab leagueTasks={leagueTasks} setSuccessAlert={setSuccessAlert} setPoints={setPoints} />  
          </div>
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
            <RefTaskTab refTasks={refTasks} user={user} setSuccessAlert={setSuccessAlert} setPoints={setPoints} />  
          </div>
        </section>
    </section>
    {successAlert && (
        <section className="alert-toast d-flex align-items-center rounded-3 py-3 px-3 gap-2">
          <i className="fa fa-check-circle" aria-hidden="true"></i>
          <h6 className="mb-0">Copied!</h6>
        </section>
      )}
    </section>
  )
}

export default Task;
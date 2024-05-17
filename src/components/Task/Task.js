import React from 'react';

import Special_tab from './Special_tab/Special_tab';
import League_tab from './Leagues_tab/Leagues_tab';
import RefTask_tab from './RefTask_tab/RefTask_tab';

import trophyIcon from "../../utils/svgs/bronze trophy.svg";
import coinIcon from "../../utils/images/goldCoin.png";

import './task.css';


const Task = () => {
  return (
    <section className='task_section container'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 pt-3'>
      <div className='points d-flex justify-content-center align-items-center gap-1'>
        <img src={coinIcon} alt="coin-logo" width="30px" />
        <span className=''>15</span>
      </div>
      <div className='trophy d-flex justify-content-center align-items-center gap-1'>
        <img src={trophyIcon} alt="trophy-logo" width="13px" />
        <span className='trophy-text'>Bronze</span>
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </div>
    </section>

    <hr />

    <section className="task-tab_section my-3 pt-4 " id="myTab" role="tablist">
      <section className="d-flex justify-content-around border rounded-3 p-1">
          <div className='task_tab px-4 py-2 active' id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
            <h5>Special</h5>
            <span className='badge'> </span>
          </div>
          <div className='task_tab px-4 py-2' id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
            <h5>Leagues</h5>
            <span className='badge'> </span>
          </div>
          <div className='task_tab px-4 py-2' id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
            <h5>Ref Task</h5>
          </div>
      </section>




        <section className="tab-content mt-3" id="myTabContent">
          <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <Special_tab />
          </div>
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <League_tab />  
          </div>
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <RefTask_tab />  
          </div>
        </section>
    </section>
    </section>
  )
}

export default Task
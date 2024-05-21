import React from 'react';

import './progressBar.css'

const ProgressBar = ({ remainingPoints, progressPercentage }) => {
  const progressValue = !isNaN(progressPercentage) ? progressPercentage : 0;

  return (
    <section className='progressCount'>
      <div className="d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-bolt text-warning pe-1"></i>
        <span className='fw-bold'>{remainingPoints}</span>
        <span className='tap_count'>/ 500</span>
      </div>
      <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar bg-warning" style={{width: `${progressValue}%`}}></div>
      </div>
    </section>
  );
};

export default ProgressBar
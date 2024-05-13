import React from 'react';

import './progressBar.css'

const ProgressBar = () => {
  return (
    <section>
        <div className="progressCount d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-bolt text-warning pe-1"></i>
            <span className='fw-bold'>500</span>
            <span className='tap_count'>/ 500</span>
        </div>
        <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-warning" style={{width: "95%"}}></div>
        </div>
    </section>
  )
}

export default ProgressBar
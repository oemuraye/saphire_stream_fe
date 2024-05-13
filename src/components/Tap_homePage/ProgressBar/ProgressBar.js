import React from 'react'

const ProgressBar = () => {
  return (
    <section>
        <div className="progressCount d-flex justify-content-center align-items-center">
                        
        </div>
        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning" style={{width: "75%"}}></div>
        </div>
    </section>
  )
}

export default ProgressBar
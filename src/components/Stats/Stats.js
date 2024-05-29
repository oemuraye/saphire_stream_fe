import React, { useContext, useEffect, useState } from 'react';

import coinIcon from "../../utils/images/goldCoin.png";

import './stats.css';
import API from '../../api/api';
import UserContext from '../../contexts/UserContext';
import Loading from '../LoadingSection/Loading';

const Stats = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState();

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const response = await API.get('/stats');
      setStats(response.data);
      console.log(response.data);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div><Loading /></div>;
  }
  
  return (
    <section className='container stats_section text-white'>
      <section className='points_section d-flex flex-column justify-content-center gap-1 py-1'>
        <h6 className='text-center muted-color mt-2'>Your Share balance:</h6>
        <div className='points d-flex justify-content-center align-items-center gap-1'>
          <img src={coinIcon} alt="coin-logo" width="30px" />
          <span className=''>{stats?.total_share_balance} S</span>
        </div>
      </section>

      <hr />

      <section className='d-flex flex-column gap-4 text-center my-2'>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Total Touches:</h6>
          <h5>{stats?.total_touches}</h5>
        </div>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Total Players:</h6>
          <h5>{stats?.total_players}</h5>
        </div>
        <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Daily Users:</h6>
          <h5>{stats?.daily_users}</h5>
        </div>
        {/* <div className="touches-count d-flex flex-column">
          <h6 className="muted-color mb-0">Online Players:</h6>
          <h5>{stats?.daily_users}</h5>
        </div> */}
      </section>

    </section>
  )
}

export default Stats
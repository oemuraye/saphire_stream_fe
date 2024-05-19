import React from 'react';

import coinIcon from "../../../utils/images/goldCoin.png";
import { Link } from 'react-router-dom';

const Connect_wallet = () => {
  return (
    <section className='connect_wallet container text-white py-2'>
      <article className=''>
        <h3>Join our socials</h3>
        <p className="muted-color">
          Log in to Saphire with your Solana Wallet. All project and partner drops will be sent to the wallet you provide here.
        </p>
        <p className="muted-color">
          If you don't have a Solana wallet, 
          you can download the Phantom wallet from <Link className='wallet_link' to="https://phantom.app/ ">https://phantom.app/ </Link>
          or feel free to download any other legitimate Solona wallets
        </p>
      </article>

      <section className=''> 
        <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center rounded-3 py-3 px-2 gap-2 my-3'>
          <img src={coinIcon} alt="taskIcon" width="60px" height="" />
          <div className="d-flex flex-column">
            <h6>Reward</h6>
            <span className='text-light'>100000</span>
          </div>
        </div>
      </section>

      <section className='mission-tasks my-3'>
        <h3 className='py-2'>Your tasks</h3>
        <div className="mission_tasks d-flex flex-column gap-2 mt-2">
          <div className='taskPad w-100 col-6 d-flex gap-2 align-items-center justify-content-between rounded-3 py-3 px-2 gap-2'>
            <h6 className="text-whiter">Saphire Wallet</h6>
            <div className="d-flex align-items-center gap-2">
              <Link className='go-mission basic-gradient fw-bold py-2 px-4'>Go</Link>
              <Link className='go-mission basic-gradient fw-bold py-2 px-4'>Check</Link>
            </div>
          </div>
        </div>
      </section>

      <section className=''>
        <div className='end-mission my-3'>Finish mission</div>
      </section>
    </section>
  )
}

export default Connect_wallet
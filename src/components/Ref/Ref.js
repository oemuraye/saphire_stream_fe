import React from 'react';
import { Link } from "react-router-dom";

import './ref.css';

const Ref = () => {
  return (
    <section className='referral_section container mt-4'>
      <div className="d-flex flex-column text-center text-white">
        <h1>0 Referrals</h1>
        <span className='increase_ref'>+0</span>
      </div>

      <hr />

      <section className="d-flex align-items-center justify-content-between text-white my-3 pt-2">
        <h5>My Referrals:</h5>
        <Link className='ref_link'>Invite a friend</Link>
      </section>

      <section className="text-center text-white mt-5">
        <h6>You don't have referrals &#128557;</h6>
      </section>

    </section>
  )
}

export default Ref
import React from 'react';

import './header.css';

const Header = () => {
  return (
    <header className='container shadow-sm'>
        <section className='header_section text-white container py-2'>
            <div className='d-flex align-items-center gap-3'>
                <i class="fa fa-times" role='button' aria-hidden="true"></i>
                <h4>SaphireStream</h4>
            </div>
            <div>
                <i class="fa fa-ellipsis-v" role='button' aria-hidden="true"></i>
            </div>
        </section>
    </header>
  )
}

export default Header
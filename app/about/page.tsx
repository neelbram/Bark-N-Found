'use client';

import TopBar from '../components/top-bar'; 
import React from 'react';
import Link from 'next/link';


const About: React.FC = () => {
    return (
        <div className='screen'>
            <div className='top'>
                {/* Assuming TopBar is another component */}
                <TopBar />
            </div>
            <div className="background_color" style={{paddingRight: '24px', paddingLeft:'24px'}}>
                <h1 className='center'>About Us</h1>
                    <div style={{fontSize: '22px', textAlign: 'center'}}>
                        <p> Lost your beloved pet? Found a pet wondering alone?</p>
                        <p> You're in the right place!</p>
                    </div>
                    <div style={{marginTop:'35px'}}>
                        <p> Bark and Found is the best way to return a pet to its rightfull owners, we allow friends and neighbors to post about lost pets for its owners to see it!</p>
                        <p> Click continue in order to pass to our lost/ found pets map</p>
                    </div>
                <Link href='/map-page'>
                    <button className="main_button center h3 padding-all" style={{marginTop:'55px'}}>
                        Continue
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default About;

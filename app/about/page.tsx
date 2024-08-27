'use client';

import TopBar from '../components/top-bar'; 
import React from 'react';
import Link from 'next/link';


const About: React.FC = () => {
    return (
        <div className='screen'>
            <div className='top'>
                <TopBar  title=""/>
            </div>
            <div className="background_color" style={{paddingRight: '24px', paddingLeft:'24px'}}>
                <h1 className='center'>About Us</h1>
                    {/* <div style={{fontSize: '22px', textAlign: 'center'}}id='about-content'>
                        <p> Lost your beloved pet?</p>
                        <p> Found a pet wondering alone?</p>
                        <p> You are in the right place!</p>
                    </div> */}
                    <div style={{marginTop:'35px'}} id='about-content'>
                        <p>Bark and Found is probably the best way to return a pet to its rightful owner.</p>
                        <p>We allow friends and neighbors to post about lost pets they found for the owners to see it!</p>
                        <p id='click-continue'>Click continue in order to go to our lost and found pets map</p>
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

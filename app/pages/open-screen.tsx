'use client';

import React from 'react';
import TopBar from '../components/top-bar';
// import { useRouter } from 'next/navigation'; // Use next/navigation for router
import Link from 'next/link';
const LoginScreen: React.FC = () => {
    // const router = useRouter();

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
            <div className="container background_color">
                <h1 className='center'>Explore the app</h1>
                <h3 className='center text_center padding-bottom'>Heroes for fur heroes - Join the journey to reunite lost pets with their loving families</h3>
                <Link href="/signin">
                    <button className="main_button center h3 padding-all">
                    Sign In
                    </button>
                </Link>
                <Link href="./create-account">
                    <button className="second_button center">
                    Create account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginScreen;

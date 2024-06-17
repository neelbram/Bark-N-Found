'use client'
import React from 'react';
import TopBar from '../components/top-bar'; 
import history from '../../lib/supabase/history';
import { BrowserRouter, Route } from 'react-router-dom';



const LoginScreen: React.FC = () => {
    const handleSignIn = () => {
        history.push('/signin');
    };
    // function handleCreateAccount(){
    //     location.replace("create-account.tsx");
    // }
    const handleCreateAccount = () => {
        history.push('/create-account'); 
    };

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar></TopBar>
            </div>
            <div className="container background_color">
                <h1 className='center'>Explore the app</h1>
                <h3 className='center text_center padding-bottom'>Heroes for fur heroes - Join the journey to reunite lost pets with their loving families</h3>
                <button className="main_button center h3 padding-all" onClick={handleSignIn}>Sign In</button>
                <button className="second_button center" onClick={handleCreateAccount}>Create account</button>
            </div>
        </div>

    );
};

export default LoginScreen;

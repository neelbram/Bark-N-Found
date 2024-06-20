
'use client'; 

import React from 'react';
import TopBar from '../components/top-bar'; 
import GingerDog from '../images/ginger_dog.jsx';

const CreateAccount: React.FC = () => {
    // const email: string =
    const handleEmailAddress = () => {

    };
    const handleCreateAccount = () => {

    };
    const handlePassword = () => {

    };
    const handlePasswordConfirm = () => {

    };
    
    return (
        <div className='screen'>
            <div className='top'>
                <TopBar></TopBar>
            </div>
            {/* <img src='../images/ginger_dog.png/'/> */}
            <div className="container background_color">
                <h1 className='center'>Create an account</h1>
                <div>
                    <label htmlFor="emailAddressInput">Email address</label>
                    <input type="text" className="second_button center" id="emailAddressInput" name="emailAddress" onChange={handleEmailAddress}/> 
                     {/* value={email}*/}
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="text" className="second_button center" id="passwordInput" name="password" onChange={handlePassword}/>
                    {/*value={password}*/}
                </div>
                <div>
                    <label htmlFor="passwordInput">Confirm password</label>
                    <input type="text" className="second_button center" id="passwordInput" name="password" onChange={handlePasswordConfirm}/>
                    {/*value={password}*/}
                </div>
                <button className="main_button center h3 padding-all" onClick={handleCreateAccount}>Create account</button>
            </div>
        </div>

    );
};

export default CreateAccount;

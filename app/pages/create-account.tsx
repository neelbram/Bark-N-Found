'use client'; 
import React, { useState } from 'react';
import TopBar from '../components/top-bar'; 
import { useNavigate } from 'react-router-dom';
import GingerDogImage from '../images/ginger_dog.png'; 

const CreateAccount: React.FC = () => {
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const navigate = useNavigate();

    const handleEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
    };

    const handleCreateAccount = () => {
        if (password !== passwordConfirm) {
            alert("Passwords do not match.");
            return;
        }
        navigate('/map-page')
        // Example of API call or further processing
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", passwordConfirm);

        // Reset form state after account creation
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    };
    // const hashPassword = async (password) => {
    //     try {
    //         const hashedPassword = await bcrypt.hash(password, saltRounds);
    //         return hashedPassword;
    //     } catch (error) {
    //         console.error('Error hashing password:', error);
    //         throw error;
    //     }
    // };

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
            <div className="container background_color">
                <h1 className='center'>Create an account</h1>
                <img src="/images/ginger_dog.png" alt="Ginger Dog" id="dogImage" className="center" />
            <div>
                <label htmlFor="emailAddressInput">Email address</label>
                <input
                    type="text"
                    className="second_button center"
                    id="emailAddressInput"
                    name="emailAddress"
                    value={email}
                    onChange={handleEmailAddress}
                />
            </div>
            <div>
                <label htmlFor="passwordInput">Password</label>
                <input
                    type="password"  
                    className="second_button center"
                    id="passwordInput"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />
            </div>
            <div>
                <label htmlFor="passwordConfirmInput">Confirm password</label>
                <input
                    type="password" 
                    className="second_button center"
                    id="passwordConfirmInput"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirm}
                />
            </div>
                <button className="main_button center h3 padding-all" onClick={handleCreateAccount}>
                    Create account
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;

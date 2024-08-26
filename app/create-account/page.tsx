'use client'; 
import React, { useState } from 'react';
import TopBar from '../components/top-bar'; 
import Image from 'next/image';  // Use Next.js Image component for optimized images
import Link from 'next/link';  // Import Link from Next.js

const CreateAccount: React.FC = () => {
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

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

        // Example of API call or further processing
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", passwordConfirm);

        // Reset form state after account creation
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    };

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar title="Create an account" />
            </div>
            <div className="container background_color">
                <Image
                    src="/images/ginger_dog.png"  // Ensure the path is correct
                    alt="Ginger Dog"
                    width={300}  // Adjust width as needed
                    height={200}  // Adjust height as needed
                    className="center"
                />
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
                <Link href="/map-page">
                    <button className="main_button center h3 padding-all" onClick={handleCreateAccount}>
                        Create account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CreateAccount;

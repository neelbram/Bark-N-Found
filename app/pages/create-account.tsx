// pages/create-account.tsx
import React, { useState } from 'react';
import TopBar from '../components/top-bar';
import { useNavigate } from 'react-router-dom';

const CreateAccount: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

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
        // Validation logic can be added here
        // For simplicity, let's assume validation is passed
        // Navigate to '/signin' after successful account creation
        navigate('/lost-profile');
    };

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
            <div className="container background_color">
                <h1 className='center'>Create an account</h1>
                <div>
                    <label htmlFor="emailAddressInput">Email address</label>
                    <input type="text" className="second_button center" id="emailAddressInput" name="emailAddress" onChange={handleEmailAddress} value={email} />
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="second_button center" id="passwordInput" name="password" onChange={handlePassword} value={password} />
                </div>
                <div>
                    <label htmlFor="passwordConfirmInput">Confirm password</label>
                    <input type="password" className="second_button center" id="passwordConfirmInput" name="passwordConfirm" onChange={handlePasswordConfirm} value={passwordConfirm} />
                </div>
                <button className="main_button center h3 padding-all" onClick={handleCreateAccount}>Create account</button>
            </div>
        </div>
    );
};

export default CreateAccount;

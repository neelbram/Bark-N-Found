import TopBar from '../components/top-bar'; 
import React, { useState } from 'react';
import bcrypt from 'bcryptjs'; // Import bcryptjs in your React component

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Retrieve stored email and hashedPassword from localStorage
        const storedEmail = localStorage.getItem('storedEmail');
        const storedHashedPassword = localStorage.getItem('storedHashedPassword');

        // Check if storedEmail and storedHashedPassword exist
        if (storedEmail && storedHashedPassword) {
            // Example: Hash entered password and compare with stored hashed password
            bcrypt.compare(password, storedHashedPassword)
                .then((result) => {
                    if (result) {
                        // Passwords match, proceed with login
                        console.log('Login successful!');
                    } else {
                        // Passwords do not match
                        console.log('Incorrect password!');
                    }
                })
                .catch((error) => {
                    console.error('Error comparing passwords:', error);
                });
        } else {
            console.log('No stored credentials found.');
        }
    };

    return (
        <div className='screen'>
            <div className='top'>
                {/* Assuming TopBar is another component */}
                <TopBar />
            </div>
            <div className="container background_color">
                <h1 className='center'>Login</h1>
                <img src="/images/curly_dog.png" alt="Curly Dog" id="dogImage" className="center" />
                <div>
                    <label htmlFor="emailInput">Email address</label>
                    <input
                        type="text"
                        className="second_button center"
                        id="emailInput"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
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
                        onChange={handlePasswordChange}
                    />
                </div>
                <button className="main_button center h3 padding-all" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;

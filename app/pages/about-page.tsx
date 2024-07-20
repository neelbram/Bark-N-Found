import TopBar from '../components/top-bar'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';


const About: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/map-page')
    };

    return (
        <div className='screen'>
            <div className='top'>
                {/* Assuming TopBar is another component */}
                <TopBar />
            </div>
            <div className="container background_color">
                <h1 className='center'>About Us</h1>
                <button className="main_button center h3 padding-all" onClick={handleNext}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default About;

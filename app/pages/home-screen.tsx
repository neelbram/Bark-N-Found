import BottomPanel from '../components/bottom-panel';
import React from 'react';
import TopBar from '../components/top-bar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    // Use useEffect for any DOM interactions or side effects
    useEffect(() => {
        // Example event listener or other side effects
    }, []);

    return (
        <div className='screen'>
            <div className='top'>
                <TopBar />
            </div>
            <div className='container background_color'>
                <h1 className='center'>Bark N Found</h1>
                <div className='scrollable-container'>
                    <h2 className='center'>Lost</h2>
                    <div className='scrollable-content'>
                        <div className='card'>
                            <img src='./images' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                    </div>
                </div>
                <div className='scrollable-container'>
                    <h2 className='center'>Found</h2>
                    <div className='scrollable-content'>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                        <div className='card'>
                            <img src='path_to_image' alt='Animal' />
                            <p>Animal details</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;



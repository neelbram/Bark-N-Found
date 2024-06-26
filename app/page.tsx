'use client';

import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import dynamic from 'next/dynamic';
import ReactDOM from 'react-dom';

const DynamicLoginScreen = dynamic(() => import('./pages/open-screen'), { ssr: false });
const DynamicCreateAccount = dynamic(() => import('./pages/create-account'), { ssr: false });
const DynamicSigninPage = dynamic(() => import('./pages/signin'), { ssr: false });
const DynamicMapPage = dynamic(() => import('./pages/map-page'), { ssr: false });
const DynamicHomeScreen = dynamic(() => import('./pages/home-screen'), { ssr: false });
const DynamicProfileLost = dynamic(() => import('./pages/profile-lost'), { ssr: false });


const router = createBrowserRouter([
  {
    path: "/",
    element: <DynamicLoginScreen />,
  },
  {
    path: "/create-account",
    element: <DynamicCreateAccount />,
  },
  {
    path: "/signin",
    element: <DynamicSigninPage />,
  },
  {
    path: "/map-page",
    element: <DynamicMapPage />,
  },
  {
    path: "/home-screen",
    element: <DynamicHomeScreen />,
  },

  {

    path: "/profile-lost", 
    element: <DynamicProfileLost />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(<App />);
// } else {
//   console.error("Root element not found.");
// }


export default App;


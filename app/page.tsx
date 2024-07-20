'use client';

import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import dynamic from 'next/dynamic';
import ReactDOM from 'react-dom';

const DynamicLoginScreen = dynamic(() => import('./pages/open-screen'), { ssr: false });
const DynamicCreateAccount = dynamic(() => import('./pages/create-account'), { ssr: false });
const DynamicSigninPage = dynamic(() => import('./pages/signin'), { ssr: false });
const DynamicAboutPage = dynamic(() => import('./pages/about-page'), { ssr: false });
const DynamicMapPage = dynamic(() => import('./pages/map-page'), { ssr: false });
const DynamicLostPage = dynamic(() => import('./pages/lost-page'), { ssr: false });
const DynamicFoundPage = dynamic(() => import('./pages/found-page'), { ssr: false });
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
    path: "/about-page",
    element: <DynamicAboutPage />,
  },
  {
    path: "/map-page",
    element: <DynamicMapPage />,
  },
  {
    path: "/lost-page",
    element: <DynamicLostPage />,
  },
  {
    path: "/found-page",
    element: <DynamicFoundPage />,
  },

  {

    path: "profile-lost/:id", 
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


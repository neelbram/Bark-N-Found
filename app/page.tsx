'use client';

import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import dynamic from 'next/dynamic';

const DynamicLoginScreen = dynamic(() => import('./pages/open-screen'), { ssr: false });
const DynamicCreateAccount = dynamic(() => import('./pages/create-account'), { ssr: false });
const DynamicSigninPage = dynamic(() => import('./pages/signin'), { ssr: false });
const DynamicMapPage = dynamic(() => import('./pages/map-page'), { ssr: false });


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


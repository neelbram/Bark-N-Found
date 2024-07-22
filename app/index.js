// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app/page';

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(<App />);
// } else {
//   console.error('Root element not found.');
// }

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/page';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found.');
}

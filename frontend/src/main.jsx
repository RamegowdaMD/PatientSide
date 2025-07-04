// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';



// // 1. Import Bootstrap CSS to make it available globally
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; 

// import App from './App.jsx';


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* 2. Wrap your App component with BrowserRouter to enable routing */}
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );


// frontend/src/main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // We will use this router

// // Import Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
// // Import your custom CSS
// import './App.css'; 

// import App from './App.jsx';

// // This is the root of your application
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     {/* This is the one and only router for your entire application. */}
//     {/* It wraps the App component, so App and all its children can use routing. */}
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

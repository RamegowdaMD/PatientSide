// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 1. Import Bootstrap CSS to make it available globally
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap your App component with BrowserRouter to enable routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
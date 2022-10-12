import React from 'react';
import ReactDOM from 'react-dom/client';
import './View/Styles/index.css';
import App from './App'
import { Chart } from 'chart.js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

Chart.defaults.color = "#aacfd1";

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
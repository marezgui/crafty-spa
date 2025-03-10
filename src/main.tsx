import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from './Provider';

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SisenseContextProvider } from '@sisense/sdk-ui';

const sisenseUrl = process.env.REACT_APP_SISENSE_URL;
const sisenseToken = process.env.REACT_APP_SISENSE_TOKEN;

if (!sisenseUrl || !sisenseToken) {
  console.error('Sisense URL or Token is not defined in environment variables.');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SisenseContextProvider
      url={sisenseUrl || ''}
      token={sisenseToken || ''}
    >
      <App />
    </SisenseContextProvider>
  </React.StrictMode>
);

reportWebVitals();

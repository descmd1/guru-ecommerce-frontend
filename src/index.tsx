import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter  } from 'react-router-dom';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your publishable key');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Elements stripe={stripePromise}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Elements>
  </React.StrictMode>
);

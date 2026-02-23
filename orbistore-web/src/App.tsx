import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppRouter from './router/AppRouter';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

import './App.css'

function App() {
  return (
      <Elements stripe={stripePromise}>
        <AppRouter />
      </Elements>  
  )
}

export default App
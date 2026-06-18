import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/styles.css';
import './styles/FlowingMenu.css';
import App from './App.jsx';

/* Register GSAP plugins once at the top level */
gsap.registerPlugin(ScrollTrigger);

/* Prevent GSAP from crashing when elements are removed during route transitions */
gsap.config({ nullTargetWarn: false });

/* NOTE: React StrictMode removed — it double-renders in dev which
   causes GSAP's _getMatrix DOM helper to fail (removeChild errors).
   GSAP is fundamentally incompatible with StrictMode's double-invoke. */
createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

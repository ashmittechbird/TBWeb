import { useState } from 'react';
import LightfallBanner from './LightfallBanner';

const CATS = ['SOFTWARE', 'AI', 'CLOUD', 'MARTECH'];

export default function Hero() {
  const [activeCat, setActiveCat] = useState(0);

  return (
    <>
      <div className="hero-panel" id="heroPanel">
        <LightfallBanner />
        <div className="hero-vignette"></div>

        <div className="hero-center" id="heroCenter">
          <span className="hero-eye"><i></i>TechBird IT Services<i></i></span>
          <h1 className="headline" id="headline">
            DRIVING DIGITAL<br /><em>TRANSFORMATION</em>
          </h1>
          <p className="hero-desc">
            Scalable, secure &amp; intelligent technology — from expert consultancy and custom
            software to cutting-edge AI integration.
          </p>
        </div>

        <div className="hero-cats" id="heroCats">
          {CATS.map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={activeCat === i ? 'on' : ''}
              onClick={() => setActiveCat(i)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="stats" id="stats">
        <div className="stat reveal-up">
          <div className="stat-num"><span data-count="10">0</span>+</div>
          <div className="stat-label">Years of Expertise</div>
        </div>
        <div className="stat reveal-up">
          <div className="stat-num"><span data-count="50">0</span>+</div>
          <div className="stat-label">Countries Served</div>
        </div>
        <div className="stat reveal-up">
          <div className="stat-num"><span data-count="150">0</span>+</div>
          <div className="stat-label">Projects Delivered</div>
        </div>
      </div>
    </>
  );
}

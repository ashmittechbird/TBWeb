import FloatingLines from './FloatingLines';

export default function Hero() {
  return (
    <>
      <div className="hero-panel" id="heroPanel">
        <FloatingLines
          linesGradient={['#2a1a5e', '#3b1f8e', '#5227FF', '#1a103a']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 12, 16]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          parallaxStrength={0.2}
          animationSpeed={0.8}
          mixBlendMode="normal"
        />
        <div className="hero-vignette"></div>

        <div className="hero-center" id="heroCenter">
          <span className="hero-eye"><i></i>TechBird IT Services<i></i></span>
          <h1 className="headline" id="headline">
            DRIVING DIGITAL<br /><em>TRANSFORMATION</em>
          </h1>
          <p className="hero-desc">
            Scalable, secure &amp; intelligent technology - from expert consultancy and custom
            software to cutting-edge AI integration.
          </p>
        </div>

      </div>

      <div className="capabilities" id="capabilities">
        <div className="cap-item">
          <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93V12h2.75a2.5 2.5 0 0 1 2.5 2.5V16a4 4 0 1 1-2 0v-1.5a.5.5 0 0 0-.5-.5h-8.5a.5.5 0 0 0-.5.5V16a4 4 0 1 1-2 0v-1.5A2.5 2.5 0 0 1 7 12h2.75V9.93A4.001 4.001 0 0 1 12 2z" />
          </svg>
          <span className="cap-label">AI & Machine Learning</span>
        </div>
        <div className="cap-item">
          <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 8C4 8 2 10 2 12.5S4 17 6.5 17H8" />
            <path d="M16 8h1.5C19.985 8 22 10 22 12.5S20 17 17.5 17H16" />
            <path d="M8 12h8" />
            <path d="M12 8V4" /><path d="M10 4h4" />
          </svg>
          <span className="cap-label">Cloud Architecture</span>
        </div>
        <div className="cap-item">
          <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
          <span className="cap-label">Custom Software</span>
        </div>
        <div className="cap-item">
          <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className="cap-label">Automation & DevOps</span>
        </div>
      </div>
    </>
  );
}

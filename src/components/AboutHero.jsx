import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutScene3D from './AboutScene3D';

gsap.registerPlugin(ScrollTrigger);

/* About-us hero - real-time Three.js "spirit in cupped hands" scene
   (AboutScene3D) with a scroll-scrubbed content choreography on top. */
export default function AboutHero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.ab-hero-wrap', start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
        .to('.ab-title',    { yPercent: -120, opacity: 0 }, 0)
        .to('.ab-foot-row', { y: 80, opacity: 0 }, 0)
        .to('.ab-cue',      { opacity: 0 }, 0)
        .fromTo('.ab-mission', { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.45)
        .to('.ab-mission',  { opacity: 1 }, 0.85);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <div className="ab-hero-wrap">
        <section className="ab-hero">
          {/* faint CSS glow as a fallback if WebGL is unavailable */}
          <div className="ab-fallback" aria-hidden="true" />

          {/* real-time 3D scene */}
          <div className="ab-scene" aria-hidden="true">
            <AboutScene3D />
          </div>

          {/* foreground intro content */}
          <div className="ab-content">
            <h1 className="ab-title pd-display">Why we exist.</h1>
            <div className="ab-foot-row">
              <span className="ab-eyebrow">About TechBird</span>
              <p className="ab-tagline">We build systems enterprises actually run on.</p>
            </div>
          </div>

          {/* mission statement (resolves mid-scroll) */}
          <div className="ab-mission">
            <h2>Most enterprises don't need another IT vendor. They need a team that builds systems they actually run on - and sticks around after launch.</h2>
            <p>
              TechBird IT Services is headquartered in Pune, India. We build ERPNext systems, agentic AI tools,
              custom web applications, cloud infrastructure and proprietary products for enterprises worldwide.
            </p>
          </div>

          <div className="ab-cue"><span>Scroll</span><i /></div>
        </section>
      </div>
    </div>
  );
}

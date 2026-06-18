import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." noindex />
      <div style={{
        minHeight: '100vh', background: '#08080a', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        fontFamily: 'var(--display, "Space Grotesk", sans-serif)', color: '#fff', textAlign: 'center', padding: '2rem',
      }}>
        <p style={{ fontSize: 'clamp(80px,15vw,180px)', fontWeight: 700, lineHeight: 1, opacity: 0.08, margin: 0 }}>404</p>
        <h1 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 600, marginTop: '-2rem' }}>Page Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '420px', marginTop: '1rem', fontFamily: 'var(--body, "Manrope", sans-serif)', lineHeight: 1.6 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" style={{
          marginTop: '2rem', padding: '14px 32px', background: '#fff', color: '#08080a',
          borderRadius: '100px', fontWeight: 600, textDecoration: 'none', fontSize: '15px',
        }}>
          Back to Home
        </Link>
      </div>
    </>
  );
}

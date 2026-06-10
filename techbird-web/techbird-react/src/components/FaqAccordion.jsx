import { useReducer } from 'react';

function reducer(state, action) {
  if (action === 'click') return { open: !state.open };
  return state;
}

const ChevronDown = () => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: 18, height: 18, flexShrink: 0 }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function FaqAccordion({ q, a }) {
  const [{ open }, dispatch] = useReducer(reducer, { open: false });

  return (
    <div
      className={`tb-faq-item${open ? ' open' : ''}`}
      onClick={() => dispatch('click')}
    >
      <div className="tb-faq-header">
        <span className="tb-faq-q">{q}</span>
        <span className="tb-faq-icon"><ChevronDown /></span>
      </div>
      <div className="tb-faq-body">
        <p>{a}</p>
      </div>
    </div>
  );
}

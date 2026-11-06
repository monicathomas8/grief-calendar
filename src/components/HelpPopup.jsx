import { useState, useEffect, useRef } from 'react';

// Your Buy Me a Coffee page. Leave it empty ('') to hide the button.
const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/monicasweb';

// Support services (UK). Checked November 2026.
// Cruse is first because it's the service I personally trust and follow.
const SUPPORT = [
  {
    name: 'Cruse Bereavement Support',
    detail: 'Free bereavement helpline',
    phone: '0808 808 1677',
    tel: '08088081677',
    link: 'https://www.cruse.org.uk/',
    linkText: 'Opening times and more support',
  },
  {
    name: 'Samaritans',
    detail: 'Free, any time, day or night',
    phone: '116 123',
    tel: '116123',
  },
  {
    name: 'AtaLoss.org',
    detail: 'Find bereavement support near you, and GriefChat, a free online chat with a counsellor',
    link: 'https://www.ataloss.org/',
    linkText: 'Visit AtaLoss.org',
  },
];

// The same white feather as the card and the app icon
function Feather({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="140 70 240 400" aria-hidden="true">
      <path d="M300 78 C 360 110, 380 190, 352 262 L 330 252 L 344 276 C 322 330, 280 372, 236 404 L 228 384 L 222 410 C 196 428, 172 438, 158 440 C 150 380, 160 300, 196 228 L 214 238 L 206 214 C 230 160, 262 104, 300 78 Z"
        fill="#FFFFFF" />
      <path d="M150 462 C 190 380, 240 270, 300 84" fill="none" stroke="#D9DED5" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

export default function HelpPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  // When the pop-up opens: move focus into it (for keyboard and screen reader users),
  // and let the Escape key close it
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* The feather button, bottom right */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Support and information"
        title="Support and information"
        style={{
          position: 'fixed', right: 20, bottom: 20, zIndex: 5,
          width: 52, height: 52, borderRadius: '50%',
          background: '#5E6B5C', border: '2px solid rgba(255,255,255,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 4px 14px rgba(40, 45, 38, 0.25)',
        }}
      >
        <Feather />
      </button>

      {open && (
        // Dark see-through layer: clicking it (outside the box) closes the pop-up
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10,
            background: 'rgba(40, 45, 38, 0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            style={{
              position: 'relative',
              width: '100%', maxWidth: 440, maxHeight: '90vh', overflowY: 'auto',
              background: '#FBF9F4', borderRadius: 8,
              padding: '32px 28px 24px',
              fontFamily: "'Inter', sans-serif", color: '#3A362C',
            }}
          >
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 36, height: 36, borderRadius: '50%',
                border: 'none', background: 'transparent',
                fontSize: 20, color: '#8A7F68', cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <h2 id="help-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 28, margin: '0 0 8px' }}>
              You're not alone
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 20px', color: '#5B5648' }}>
              Grief can feel heavy to carry by yourself. If you need someone to talk to, these services are here for you.
            </p>

            {SUPPORT.map((s) => (
              <div key={s.name} style={{ padding: '14px 0', borderTop: '1px solid #E6DFD0' }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: '#6B624F', margin: '2px 0 6px' }}>{s.detail}</div>
                {s.phone && (
                  <a href={`tel:${s.tel}`} style={{ display: 'inline-block', fontSize: 16, fontWeight: 600, color: '#4A5A48' }}>
                    {s.phone}
                  </a>
                )}
                {s.link && (
                  <a href={s.link} target="_blank" rel="noopener" style={{ display: 'block', marginTop: 4, fontSize: 13, color: '#4A5A48' }}>
                    {s.linkText}
                  </a>
                )}
              </div>
            ))}

            <p style={{ fontSize: 13, lineHeight: 1.5, background: '#EFEBE2', borderRadius: 6, padding: '10px 12px', margin: '6px 0 20px' }}>
              If you or someone else is in danger right now, please call <a href="tel:999" style={{ color: '#4A5A48', fontWeight: 600 }}>999</a>.
            </p>

            {/* About and support the app */}
            <div style={{ borderTop: '1px solid #E6DFD0', paddingTop: 16, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#6B624F', margin: '0 0 12px' }}>
                Made with care by{' '}
                <a href="https://www.monica-webdeveloper.com/" target="_blank" rel="noopener" style={{ color: '#4A5A48' }}>
                  Monica | Web Developer
                </a>
              </p>
              {BUY_ME_A_COFFEE_URL && (
                <>
                <p style={{ fontSize: 13, color: '#6B624F', margin: '0 0 10px' }}>
                  If this helps you, you can buy me a coffee.
                </p>
                <a
                  href={BUY_ME_A_COFFEE_URL}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: 'inline-block', background: '#5E6B5C', color: '#FFFFFF',
                    fontSize: 14, fontWeight: 500, textDecoration: 'none',
                    padding: '10px 20px', borderRadius: 999,
                  }}
                >
                  ☕ Buy me a coffee
                </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

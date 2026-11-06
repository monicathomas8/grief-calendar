// Moving watercolour background: a different painting for each month.
//
// How it works, in three layers (back to front):
//   1. The month's painting, drifting and zooming very slowly (the "Ken Burns" effect).
//   2. Two soft bands of mist that float slowly across it.
//   3. A gentle fade at the edges, so the painting sits softly behind the card.
//
// The paintings live in public/backgrounds as 01.jpg (January) to 12.jpg (December).

export default function PaintingBackground({ monthIdx }) {
  // BASE_URL is "/grief-calendar/" on GitHub Pages, so the path works there and locally.
  const src = `${import.meta.env.BASE_URL}backgrounds/${String(monthIdx + 1).padStart(2, '0')}.jpg`;

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes paintingDrift {
          0%   { transform: scale(1.08) translate(0, 0); }
          50%  { transform: scale(1.14) translate(-1.5%, -1%); }
          100% { transform: scale(1.08) translate(0, 0); }
        }
        @keyframes paintingFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mistFloat {
          0%   { transform: translateX(-25%); }
          100% { transform: translateX(25%); }
        }
        .painting {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          animation: paintingDrift 60s ease-in-out infinite, paintingFadeIn 1.2s ease both;
        }
        .mist {
          position: absolute;
          left: -25%;
          width: 150%;
          height: 40%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%);
          animation: mistFloat 45s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .painting, .mist { animation: none; }
        }
      `}</style>

      {/* key={src} makes React redraw the layer when the month changes, so the new painting fades in */}
      <div key={src} className="painting" style={{ backgroundImage: `url(${src})` }} />

      <div className="mist" style={{ top: '20%' }} />
      <div className="mist" style={{ top: '60%', animationDuration: '60s', animationDirection: 'alternate-reverse', opacity: 0.7 }} />

      {/* soft edges, so the eye is drawn to the card in the middle */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(243,239,230,0) 45%, rgba(243,239,230,0.35) 100%)' }} />
    </div>
  );
}

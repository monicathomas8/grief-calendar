import { useState, useMemo } from 'react';
import { NOTES } from '../data/notes.js';

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function pad(n) { return n.toString().padStart(2, '0'); }

export default function GriefCalendar() {
  const today = new Date();
  const [monthIdx, setMonthIdx] = useState(today.getMonth());
  const [day, setDay] = useState(Math.min(today.getDate(), 31));

  const daysInMonth = useMemo(() => {
    const counts = [31,29,31,30,31,30,31,31,30,31,30,31];
    return counts[monthIdx];
  }, [monthIdx]);

  const dateKey = `${pad(monthIdx + 1)}-${pad(Math.min(day, daysInMonth))}`;
  const entry = NOTES.find(n => n.date === dateKey);

  const goToday = () => {
    setMonthIdx(today.getMonth());
    setDay(today.getDate());
  };

  const shiftDay = (delta) => {
    let newDay = day + delta;
    let newMonth = monthIdx;
    if (newDay < 1) {
      newMonth = (newMonth - 1 + 12) % 12;
      const counts = [31,29,31,30,31,30,31,31,30,31,30,31];
      newDay = counts[newMonth];
    } else if (newDay > daysInMonth) {
      newMonth = (newMonth + 1) % 12;
      newDay = 1;
    }
    setMonthIdx(newMonth);
    setDay(newDay);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#EFEBE2',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .feather {
          position: absolute;
          opacity: 0.35;
        }
        @keyframes seedDrift {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.75; }
          85% { opacity: 0.5; }
          100% { transform: translate(620px, -340px) rotate(70deg); opacity: 0; }
        }
        @keyframes stemSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .seed {
          position: absolute;
          animation-name: seedDrift;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        .stem-group {
          animation: stemSway 4.5s ease-in-out infinite;
          transform-origin: bottom center;
        }
        @media (prefers-reduced-motion: reduce) {
          .seed { animation: none; opacity: 0.25; }
          .stem-group { animation: none; }
        }
      `}</style>

      {/* Dandelion background */}
      <div style={{ position: 'fixed', left: -60, bottom: -40, width: 780, height: 900, pointerEvents: 'none', zIndex: 0 }} aria-hidden="true">
        <svg width="780" height="900" viewBox="0 0 260 320" className="stem-group" style={{ position: 'absolute', left: 0, top: 0, width: 780, height: 900 }}>
          <path d="M130 320 C 128 260, 132 210, 130 150" stroke="#B0AB92" strokeWidth="2.2" fill="none" />
          {Array.from({ length: 26 }).map((_, i) => {
            const angle = (i / 26) * Math.PI * 1.6 - Math.PI * 0.8;
            const len = 36 + (i % 4) * 3;
            const x1 = 130 + Math.cos(angle) * 6;
            const y1 = 150 + Math.sin(angle) * 6;
            const x2 = 130 + Math.cos(angle) * len;
            const y2 = 150 + Math.sin(angle) * len;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#DAD6C4" strokeWidth="0.6" />
                <circle cx={x2} cy={y2} r="1.8" fill="#DFDBC9" />
              </g>
            );
          })}
        </svg>

        {/* drifting seeds — separate absolutely-positioned elements so CSS animation works reliably */}
        {Array.from({ length: 20 }).map((_, i) => {
          const startX = 260 + (i * 19) % 220;
          const startY = 220 + (i * 27) % 260;
          const dur = 10 + (i % 5) * 2.4;
          const delay = i * 1.0;
          return (
            <div
              key={`seed-${i}`}
              className="seed"
              style={{
                left: startX, top: startY,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
              }}
            >
              <svg width="28" height="36" viewBox="0 0 12 16">
                <line x1="6" y1="0" x2="6" y2="10" stroke="#DAD6C4" strokeWidth="0.5" />
                <circle cx="6" cy="12" r="1.4" fill="#DFDBC9" />
              </svg>
            </div>
          );
        })}
      </div>

      <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 1 }}>

        {/* Month / day navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <select
            value={monthIdx}
            onChange={e => {
              const m = parseInt(e.target.value);
              setMonthIdx(m);
              const counts = [31,29,31,30,31,30,31,31,30,31,30,31];
              if (day > counts[m]) setDay(counts[m]);
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: '#5B5648',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 4px',
            }}
          >
            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>

          <button
            onClick={goToday}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#8A6A52',
              background: 'transparent',
              border: '1px solid #D8CFBE',
              borderRadius: 20,
              padding: '6px 16px',
              cursor: 'pointer',
            }}
          >
            Today
          </button>
        </div>

        {/* Main card */}
        <div style={{
          position: 'relative',
          background: '#FBF9F4',
          borderRadius: 4,
          border: '1px solid #DDD4C2',
          padding: '56px 48px',
          overflow: 'hidden',
        }}>
          {/* Signature feather element */}
          <svg className="feather" width="70" height="70" viewBox="0 0 70 70" style={{ top: 24, right: 24 }}>
            <path d="M35 4 C 20 14, 14 32, 20 50 C 24 60, 30 65, 35 66 C 32 55, 33 44, 38 34 C 42 26, 48 20, 55 16 C 46 10, 40 6, 35 4 Z"
              fill="none" stroke="#B8AC8F" strokeWidth="1.2" />
            <line x1="35" y1="6" x2="35" y2="64" stroke="#B8AC8F" strokeWidth="1" />
          </svg>

          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#A79A7C',
            marginBottom: 18,
          }}>
            {MONTHS[monthIdx]} {day}
          </div>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            lineHeight: 1.55,
            color: '#3A362C',
            margin: 0,
            minHeight: 140,
          }}>
            {entry ? entry.text : "No note written for this day yet."}
          </p>
        </div>

        {/* Prev / next */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
          <button
            onClick={() => shiftDay(-1)}
            style={navBtnStyle}
          >
            ← Previous day
          </button>
          <button
            onClick={() => shiftDay(1)}
            style={navBtnStyle}
          >
            Next day →
          </button>
        </div>

      </div>
    </div>
  );
}

const navBtnStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  color: '#8A7F68',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '8px 4px',
};

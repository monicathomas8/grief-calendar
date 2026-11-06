import { useState, useMemo } from 'react';
import { NOTES } from '../data/notes.js';
import PaintingBackground from './PaintingBackground.jsx';

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
      position: 'relative',
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
          opacity: 0.9;
        }
      `}</style>

      <PaintingBackground monthIdx={monthIdx} />

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
              background: 'rgba(251, 249, 244, 0.85)',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              padding: '6px 12px',
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
              background: 'rgba(251, 249, 244, 0.85)',
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
          // Frosted card: the painting glows through, but the words stay easy to read
          background: 'rgba(251, 249, 244, 0.82)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: 4,
          border: '1px solid #DDD4C2',
          padding: '56px 48px',
          overflow: 'hidden',
        }}>
          {/* Signature white feather: the same feather as the app icon, a sign that someone is close */}
          <svg className="feather" width="64" height="64" viewBox="140 70 240 400" style={{ top: 22, right: 22 }} aria-hidden="true">
            <path d="M300 78 C 360 110, 380 190, 352 262 L 330 252 L 344 276 C 322 330, 280 372, 236 404 L 228 384 L 222 410 C 196 428, 172 438, 158 440 C 150 380, 160 300, 196 228 L 214 238 L 206 214 C 230 160, 262 104, 300 78 Z"
              fill="#FFFFFF" stroke="#C9C2B0" strokeWidth="4" />
            <path d="M150 462 C 190 380, 240 270, 300 84" fill="none" stroke="#B8B09B" strokeWidth="5" strokeLinecap="round" />
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
  color: '#6B624F',
  background: 'rgba(251, 249, 244, 0.85)',
  border: 'none',
  borderRadius: 20,
  cursor: 'pointer',
  padding: '8px 14px',
};

"use client";

interface HangmanFigureProps {
  wrongCount: number; // 0–14
}

export default function HangmanFigure({ wrongCount }: HangmanFigureProps) {
  const stroke = "#1e293b";
  const sw = 4; // stroke-width for body parts

  return (
    <svg
      viewBox="0 0 200 260"
      className="w-full max-w-[220px] mx-auto"
      aria-label={`Hangman figure: ${wrongCount} wrong guesses`}
    >
      {/* Gallows — always shown */}
      {/* Base */}
      <line x1="10" y1="250" x2="100" y2="250" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      {/* Vertical pole */}
      <line x1="55" y1="250" x2="55" y2="10" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      {/* Horizontal beam */}
      <line x1="55" y1="10" x2="130" y2="10" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      {/* Rope */}
      <line x1="130" y1="10" x2="130" y2="32" stroke={stroke} strokeWidth="3" strokeLinecap="round" />

      {/* 1: Head */}
      {wrongCount >= 1 && (
        <circle cx="130" cy="50" r="18" stroke={stroke} strokeWidth={sw} fill="none" />
      )}

      {/* 2: Body */}
      {wrongCount >= 2 && (
        <line x1="130" y1="68" x2="130" y2="135" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 3: Left arm */}
      {wrongCount >= 3 && (
        <line x1="130" y1="85" x2="100" y2="115" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 4: Right arm */}
      {wrongCount >= 4 && (
        <line x1="130" y1="85" x2="160" y2="115" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 5: Left leg */}
      {wrongCount >= 5 && (
        <line x1="130" y1="135" x2="100" y2="175" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 6: Right leg */}
      {wrongCount >= 6 && (
        <line x1="130" y1="135" x2="160" y2="175" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 7: Left hand */}
      {wrongCount >= 7 && (
        <circle cx="100" cy="115" r="4" stroke={stroke} strokeWidth={sw - 1} fill="none" />
      )}

      {/* 8: Right hand */}
      {wrongCount >= 8 && (
        <circle cx="160" cy="115" r="4" stroke={stroke} strokeWidth={sw - 1} fill="none" />
      )}

      {/* 9: Left foot */}
      {wrongCount >= 9 && (
        <line x1="100" y1="175" x2="84" y2="182" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 10: Right foot */}
      {wrongCount >= 10 && (
        <line x1="160" y1="175" x2="176" y2="182" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      )}

      {/* 11: Left eye */}
      {wrongCount >= 11 && (
        <circle cx="123" cy="46" r="2.5" fill={stroke} />
      )}

      {/* 12: Right eye */}
      {wrongCount >= 12 && (
        <circle cx="137" cy="46" r="2.5" fill={stroke} />
      )}

      {/* 13: Nose */}
      {wrongCount >= 13 && (
        <circle cx="130" cy="52" r="1.5" fill={stroke} />
      )}

      {/* 14: Frown */}
      {wrongCount >= 14 && (
        <path d="M 122 60 Q 130 54 138 60" stroke={stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}

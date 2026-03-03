"use client";

import { getBaseAlphabet, getAccentButtons } from "@/lib/game-utils";
import type { AccentMode, Language } from "@/lib/game-utils";

interface KeyboardProps {
  guessed: Set<string>;
  word: string;
  accentMode: AccentMode;
  lang: Language; // "pt" = player guessing Portuguese word
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

export default function Keyboard({
  guessed,
  word,
  accentMode,
  lang,
  onGuess,
  disabled = false,
}: KeyboardProps) {
  const alphabet = getBaseAlphabet();
  const accentButtons = lang === "pt" && accentMode === "include" ? getAccentButtons() : [];

  const getButtonStyle = (letter: string): string => {
    if (!guessed.has(letter)) {
      return "bg-slate-200 hover:bg-slate-300 text-slate-800 active:scale-95";
    }
    const lowerWord = word.toLowerCase();
    const correct = lowerWord.includes(letter);
    if (correct) {
      return "bg-green-500 text-white cursor-default";
    }
    return "bg-red-400 text-white cursor-default";
  };

  const renderButton = (letter: string) => (
    <button
      key={letter}
      onClick={() => onGuess(letter)}
      disabled={disabled || guessed.has(letter)}
      aria-label={`Guess letter ${letter.toUpperCase()}`}
      className={`
        w-10 h-12 rounded-xl font-bold text-lg uppercase transition-all duration-150 shadow-sm
        disabled:cursor-default
        ${getButtonStyle(letter)}
      `}
    >
      {letter.toUpperCase()}
    </button>
  );

  // Split alphabet into rows: 9, 9, 8
  const rows = [
    alphabet.slice(0, 9),
    alphabet.slice(9, 18),
    alphabet.slice(18),
  ];

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {rows.map((row, ri) => (
        <div key={ri} className="flex flex-wrap justify-center gap-1.5">
          {row.map(renderButton)}
        </div>
      ))}
      {accentButtons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-1 pt-2 border-t border-slate-200 w-full">
          <span className="w-full text-center text-xs text-slate-500 mb-1">Accented letters</span>
          {accentButtons.map(renderButton)}
        </div>
      )}
    </div>
  );
}

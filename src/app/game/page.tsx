"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, Suspense } from "react";
import HangmanFigure from "@/components/HangmanFigure";
import WordDisplay from "@/components/WordDisplay";
import Keyboard from "@/components/Keyboard";
import GameResult from "@/components/GameResult";
import {
  getRandomWord,
  checkWin,
  isCorrectGuess,
  type Language,
  type Difficulty,
  type AccentMode,
} from "@/lib/game-utils";
import type { WordEntry } from "@/lib/words-en";

const MAX_WRONG = 14;

function GameScreen() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse URL params
  const nativeLang = (searchParams.get("lang") ?? "en") as Language;
  const difficulty = (searchParams.get("difficulty") ?? "normal") as Difficulty;
  const accentMode = (searchParams.get("accents") ?? "free") as AccentMode;

  // The player is guessing the OTHER language
  const targetLang: Language = nativeLang === "en" ? "pt" : "en";

  const [entry, setEntry] = useState<WordEntry>(() =>
    getRandomWord(targetLang, difficulty)
  );
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"win" | "lose" | null>(null);

  const startNewGame = useCallback(() => {
    setEntry(getRandomWord(targetLang, difficulty));
    setGuessed(new Set());
    setWrongCount(0);
    setShowHint(false);
    setResult(null);
  }, [targetLang, difficulty]);

  const handleGuess = useCallback(
    (letter: string) => {
      if (result !== null) return;
      const lower = letter.toLowerCase();
      if (guessed.has(lower)) return;

      const newGuessed = new Set(guessed);
      newGuessed.add(lower);

      const correct = isCorrectGuess(lower, entry.word, accentMode);
      const newWrong = correct ? wrongCount : wrongCount + 1;

      setGuessed(newGuessed);
      setWrongCount(newWrong);

      if (newWrong >= MAX_WRONG) {
        setResult("lose");
        return;
      }

      if (checkWin(entry.word, newGuessed, accentMode)) {
        setResult("win");
      }
    },
    [guessed, wrongCount, entry.word, accentMode, result]
  );

  // Physical keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (result !== null) return;
      const letter = e.key.toLowerCase();
      if (/^[a-záàâãéêíóôúçü]$/.test(letter)) {
        handleGuess(letter);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleGuess, result]);

  const flagEmoji = targetLang === "pt" ? "🇵🇹" : "🇬🇧";
  const langLabel = targetLang === "pt" ? "Portuguese" : "English";

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push("/")}
          className="text-slate-500 hover:text-slate-700 font-semibold text-sm flex items-center gap-1"
          aria-label="Back to setup"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-amber-100 text-amber-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wide">
            {entry.category}
          </span>
          <span className="text-lg">{flagEmoji}</span>
          <span className="text-sm font-semibold text-slate-600">{langLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint((h) => !h)}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold text-sm px-3 py-1.5 rounded-xl transition-colors"
            aria-label="Show hint"
          >
            💡 Hint
          </button>
          <span className="text-red-500 font-bold text-sm">
            {wrongCount}/{MAX_WRONG}
          </span>
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2 text-center text-sm text-yellow-800 mb-3 font-medium">
          {nativeLang === "en" ? "Hint:" : "Dica:"} {entry.hint}
        </div>
      )}

      {/* Main game area */}
      <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
        {/* Hangman figure */}
        <div className="w-48 flex-shrink-0">
          <HangmanFigure wrongCount={wrongCount} />
        </div>

        {/* Word + keyboard */}
        <div className="flex-1 w-full flex flex-col items-center">
          <WordDisplay
            word={entry.word}
            guessed={guessed}
            accentMode={accentMode}
            revealAll={result === "lose"}
          />

          <Keyboard
            guessed={guessed}
            word={entry.word}
            accentMode={accentMode}
            lang={targetLang}
            onGuess={handleGuess}
            disabled={result !== null}
          />
        </div>
      </div>

      {/* Win / Lose overlay */}
      {result !== null && (
        <GameResult
          outcome={result}
          word={entry.word}
          hint={entry.hint}
          nativeLang={nativeLang}
          onPlayAgain={startNewGame}
        />
      )}
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>}>
      <GameScreen />
    </Suspense>
  );
}

"use client";

import type { Language } from "@/lib/game-utils";

interface GameResultProps {
  outcome: "win" | "lose";
  word: string;
  hint: string; // translation / hint in native language
  nativeLang: Language; // player's native language
  onPlayAgain: () => void;
}

const messages = {
  win: {
    en: ["Amazing! 🎉", "You got it! ⭐", "Brilliant! 🌟", "Awesome work! 🏆"],
    pt: ["Incrível! 🎉", "Conseguiste! ⭐", "Fantástico! 🌟", "Ótimo trabalho! 🏆"],
  },
  lose: {
    en: ["Don't give up! 💪", "Almost! Try again! 🔄", "Keep practising! 📚"],
    pt: ["Não desistas! 💪", "Quase! Tenta de novo! 🔄", "Continua a praticar! 📚"],
  },
};

export default function GameResult({
  outcome,
  word,
  hint,
  nativeLang,
  onPlayAgain,
}: GameResultProps) {
  const msgList = messages[outcome][nativeLang];
  const msg = msgList[Math.floor(Math.random() * msgList.length)];

  const isWin = outcome === "win";
  const bgColor = isWin ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300";
  const headingColor = isWin ? "text-green-700" : "text-red-700";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className={`${bgColor} border-2 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl`}>
        <p className={`text-3xl font-extrabold ${headingColor} mb-4`}>{msg}</p>

        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">
            {isWin ? "The word was:" : "The answer was:"}
          </p>
          <p className="text-4xl font-black text-slate-800 tracking-widest uppercase">{word}</p>
          <p className="text-slate-500 mt-2 text-sm">
            {nativeLang === "en" ? "Hint:" : "Dica:"} <span className="font-semibold text-slate-700">{hint}</span>
          </p>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold text-xl py-4 rounded-2xl transition-all duration-150 shadow-md"
        >
          {nativeLang === "en" ? "Play Again 🔄" : "Jogar de Novo 🔄"}
        </button>
      </div>
    </div>
  );
}

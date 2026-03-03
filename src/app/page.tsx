"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LangChoice = "pt" | "en";
type Difficulty = "normal" | "challenging";
type AccentMode = "free" | "include";

export default function SetupPage() {
  const router = useRouter();
  const [lang, setLang] = useState<LangChoice | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [accentMode, setAccentMode] = useState<AccentMode>("free");

  const handlePlay = () => {
    if (!lang) return;
    const params = new URLSearchParams({ lang, difficulty, accents: accentMode });
    router.push(`/game?${params.toString()}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <h1 className="text-5xl font-black text-slate-800 mb-2">
          Hanging<span className="text-blue-500">Palavras</span>
        </h1>
        <p className="text-slate-500 text-lg">Bilingual Hangman • Ages 6–10</p>
      </div>

      {/* Language choice */}
      <section className="w-full max-w-md">
        <h2 className="text-center text-slate-600 font-semibold mb-3 text-sm uppercase tracking-wide">
          My language
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setLang("en")}
            className={`w-full py-5 px-6 rounded-2xl text-left font-bold text-lg transition-all duration-150 border-2 shadow-sm active:scale-95 ${
              lang === "en"
                ? "bg-blue-500 text-white border-blue-500 shadow-blue-200"
                : "bg-white text-slate-800 border-slate-200 hover:border-blue-300"
            }`}
          >
            <span className="text-2xl mr-3">🇬🇧</span> I speak English, learning Portuguese 🇵🇹
          </button>
          <button
            onClick={() => setLang("pt")}
            className={`w-full py-5 px-6 rounded-2xl text-left font-bold text-lg transition-all duration-150 border-2 shadow-sm active:scale-95 ${
              lang === "pt"
                ? "bg-green-500 text-white border-green-500 shadow-green-200"
                : "bg-white text-slate-800 border-slate-200 hover:border-green-300"
            }`}
          >
            <span className="text-2xl mr-3">🇵🇹</span> Falo Português, learning English 🇬🇧
          </button>
        </div>
      </section>

      {/* Difficulty */}
      <section className="w-full max-w-md">
        <h2 className="text-center text-slate-600 font-semibold mb-3 text-sm uppercase tracking-wide">
          Difficulty
        </h2>
        <div className="flex gap-3">
          {(["normal", "challenging"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`flex-1 py-4 rounded-2xl font-bold text-base capitalize border-2 transition-all duration-150 active:scale-95 ${
                difficulty === d
                  ? "bg-amber-400 text-white border-amber-400 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:border-amber-300"
              }`}
            >
              {d === "normal" ? "⭐ Normal" : "🔥 Challenging"}
            </button>
          ))}
        </div>
      </section>

      {/* Accent mode — only relevant for Portuguese words */}
      {(lang === "en" || lang === null) && (
        <section className="w-full max-w-md">
          <h2 className="text-center text-slate-600 font-semibold mb-1 text-sm uppercase tracking-wide">
            Accented letters
          </h2>
          <p className="text-center text-xs text-slate-400 mb-3">
            Applies when guessing Portuguese words
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setAccentMode("free")}
              className={`flex-1 py-4 rounded-2xl font-semibold text-sm border-2 transition-all duration-150 active:scale-95 ${
                accentMode === "free"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-slate-700 border-slate-200 hover:border-purple-300"
              }`}
            >
              A–Z only
              <br />
              <span className="font-normal text-xs opacity-80">Accents shown free</span>
            </button>
            <button
              onClick={() => setAccentMode("include")}
              className={`flex-1 py-4 rounded-2xl font-semibold text-sm border-2 transition-all duration-150 active:scale-95 ${
                accentMode === "include"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-slate-700 border-slate-200 hover:border-purple-300"
              }`}
            >
              Include ã, é, ç…
              <br />
              <span className="font-normal text-xs opacity-80">Guess accented letters too</span>
            </button>
          </div>
        </section>
      )}

      {/* Play button */}
      <button
        onClick={handlePlay}
        disabled={!lang}
        className="w-full max-w-md py-5 rounded-2xl font-black text-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {lang ? "Play! 🎮" : "Choose a language above"}
      </button>

      <footer className="text-xs text-slate-400 text-center">
        Made with ❤️ for Leiria International School
      </footer>
    </main>
  );
}

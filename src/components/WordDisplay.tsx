"use client";

import { isPositionRevealed } from "@/lib/game-utils";
import type { AccentMode } from "@/lib/game-utils";

interface WordDisplayProps {
  word: string;
  guessed: Set<string>;
  accentMode: AccentMode;
  revealAll?: boolean;
}

export default function WordDisplay({
  word,
  guessed,
  accentMode,
  revealAll = false,
}: WordDisplayProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-6" aria-label="Word to guess">
      {word.split("").map((char, i) => {
        const lower = char.toLowerCase();

        // Space or hyphen: render a gap
        if (lower === " ") {
          return <div key={i} className="w-6" aria-hidden="true" />;
        }
        if (lower === "-") {
          return (
            <div key={i} className="flex flex-col items-center justify-end">
              <span className="text-3xl font-bold text-slate-700 leading-none mb-1">-</span>
              <div className="w-8 h-1 bg-slate-400 rounded" />
            </div>
          );
        }

        const revealed = revealAll || isPositionRevealed(char, guessed, accentMode);
        const isAutoRevealed =
          !revealAll &&
          revealed &&
          !guessed.has(lower) &&
          accentMode === "free";

        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={`text-3xl font-bold leading-none w-9 text-center transition-all duration-200 ${
                revealAll && !isPositionRevealed(char, guessed, accentMode)
                  ? "text-red-500" // reveal wrong letters in red on loss
                  : isAutoRevealed
                  ? "text-amber-500" // accent auto-reveals shown in amber
                  : revealed
                  ? "text-green-600"
                  : "text-transparent"
              }`}
            >
              {revealed ? char.toUpperCase() : "_"}
            </span>
            <div
              className={`h-1 w-9 rounded ${
                revealed ? "bg-green-400" : "bg-slate-400"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

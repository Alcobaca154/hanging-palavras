import { WordEntry, englishNormal, englishChallenging } from "./words-en";
import { portugueseNormal, portugueseChallenging } from "./words-pt";

export type Language = "pt" | "en";
export type Difficulty = "normal" | "challenging";
export type AccentMode = "free" | "include";

// Accented characters that appear in Portuguese words
export const ACCENT_CHARS = ["á", "à", "â", "ã", "é", "ê", "í", "ó", "ô", "ú", "ç", "ü"];

// Map accented char to its base letter (for display stripping)
const ACCENT_MAP: Record<string, string> = {
  á: "a", à: "a", â: "a", ã: "a",
  é: "e", ê: "e",
  í: "i",
  ó: "o", ô: "o",
  ú: "u", ü: "u",
  ç: "c",
};

export function isAccented(char: string): boolean {
  return ACCENT_CHARS.includes(char.toLowerCase());
}

export function getWordList(lang: Language, difficulty: Difficulty): WordEntry[] {
  if (lang === "pt") {
    return difficulty === "challenging" ? portugueseChallenging : portugueseNormal;
  }
  return difficulty === "challenging" ? englishChallenging : englishNormal;
}

export function getRandomWord(lang: Language, difficulty: Difficulty): WordEntry {
  const list = getWordList(lang, difficulty);
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Returns the set of letter indices that are auto-revealed in A–Z only mode.
 * These are indices where the character is an accented letter.
 */
export function getAutoRevealedIndices(word: string): Set<number> {
  const revealed = new Set<number>();
  for (let i = 0; i < word.length; i++) {
    if (isAccented(word[i])) {
      revealed.add(i);
    }
  }
  return revealed;
}

/**
 * Returns the unique letters in the word that the player must guess.
 * In free mode, accented chars are excluded from the required set.
 */
export function getRequiredLetters(word: string, accentMode: AccentMode): Set<string> {
  const letters = new Set<string>();
  for (const char of word.toLowerCase()) {
    if (char === " " || char === "-") continue;
    if (accentMode === "free" && isAccented(char)) continue;
    letters.add(char);
  }
  return letters;
}

/**
 * Checks if the player has won:
 * - All letters they are responsible for have been guessed
 */
export function checkWin(
  word: string,
  guessed: Set<string>,
  accentMode: AccentMode
): boolean {
  const required = getRequiredLetters(word, accentMode);
  for (const letter of required) {
    if (!guessed.has(letter)) return false;
  }
  return true;
}

/**
 * Returns whether a letter is correct (in the word).
 * In free mode, normalized base letter matches count.
 */
export function isCorrectGuess(letter: string, word: string, accentMode: AccentMode): boolean {
  const lowerWord = word.toLowerCase();
  const lowerLetter = letter.toLowerCase();
  if (lowerWord.includes(lowerLetter)) return true;
  // In free mode, also count the base letter as matching its accented form
  if (accentMode === "free") {
    const base = ACCENT_MAP[lowerLetter];
    if (base && lowerWord.includes(lowerLetter)) return true;
  }
  return false;
}

/**
 * Determines if a position in the word should be shown to the player.
 * A position is revealed if:
 * - The char is a space or hyphen
 * - The char has been guessed
 * - The char is accented and accentMode is "free"
 */
export function isPositionRevealed(
  char: string,
  guessed: Set<string>,
  accentMode: AccentMode
): boolean {
  const lower = char.toLowerCase();
  if (lower === " " || lower === "-") return true;
  if (guessed.has(lower)) return true;
  if (accentMode === "free" && isAccented(lower)) return true;
  return false;
}

/**
 * Get the unique base letters on the keyboard to show (A–Z).
 * Always 26 letters.
 */
export function getBaseAlphabet(): string[] {
  return "abcdefghijklmnopqrstuvwxyz".split("");
}

/**
 * Get extra accent buttons to show when accentMode is "include" for a Portuguese word.
 */
export function getAccentButtons(): string[] {
  return ["á", "à", "â", "ã", "é", "ê", "í", "ó", "ô", "ú", "ç"];
}

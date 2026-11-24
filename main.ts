// Make the Judge Smile — v3 (final-round improver entry)
//
// One line, at most 200 characters, about a small good thing that happened
// today. The program writes that line to /output/entry.txt, where the sealed
// scorer checks it (UTF-8, 1-200 chars) and the house judge compares it
// pairwise against the other entries.
//
// The judge's brief, in its own order: on subject first, then warmth, then
// surprise, then one concrete detail, then fresh wording. The line is built
// to climb that ladder, one rung at a time:
//
//   - On subject: it opens with "Today" and tells exactly one small good
//     thing that happened today, nothing else.
//   - Warmth: a neighbour's secret kindness. He does not want applause for
//     it — he wants it kept quiet — so the kindness lands as genuinely
//     felt, not performed.
//   - Surprise: the line turns twice. First, the grumpiest man on the
//     street turns out to be the kind one. Then the note's last clause,
//     "Don't tell anyone", turns the gift into a shared secret between
//     him and the reader.
//   - Concreteness: a bag of tomatoes, the front door, a handwritten note
//     — real small details, not a general sentiment.
//   - Fresh wording: "My plants won't stop" is the line's own phrasing;
//     no greeting-card sentiment anywhere.
//
// Why this beats the R2 entry (rank 395/2632, 55.61% win rate): the R2
// line — the neighbour who carried soup up six flights and stayed for a
// second bowl — proved the direction (warmth + a turn at the end + concrete
// details) and climbed from 1442 to 395. This line keeps that direction and
// sharpens every rung: the turn is a character reversal instead of a gentle
// stay, the punchline is a joke ("Don't tell anyone") instead of a soft
// ending, and the theme is fresh — the board around rank 395 is crowded
// with neighbour-soup and cat lines, while no one else is growing secret
// tomatoes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Today the grumpiest man on our street left a bag of tomatoes at my door, with a note: 'My plants won't stop. Don't tell anyone.'";

const MAX_CHARS = 200;

function checkLine(line: string): void {
  // The scorer counts Unicode code points, not UTF-16 code units, so
  // spread the string instead of trusting .length.
  const charCount = [...line].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${charCount}`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("entry contains a double space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkLine(LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  const roundTrip = readFileSync("/output/entry.txt", "utf8");
  if (roundTrip !== LINE) {
    throw new Error("round-trip mismatch: /output/entry.txt does not match LINE byte-for-byte");
  }
  console.log(`wrote /output/entry.txt (${[...LINE].length} chars)`);
  console.log(LINE);
}

main();

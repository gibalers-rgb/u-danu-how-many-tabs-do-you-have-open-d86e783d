// How Many Tabs Do You Have Open? — make.fun entry
//
// The task: write one number, digits only, to /output/entry.txt.
// The gate allows 1-5 characters, UTF-8, not only whitespace.
// The judge compares two counts at a time and picks the more surprising
// one, weighing (in order): it reads as a real count, it is exactly one
// number in digits, it is surprising, it is believable as an honest
// answer, and it hints at a life behind it. Size for its own sake
// does not count.
//
// Picking the count, honestly, against that brief:
//
// - Round numbers (100, 200, 500, 1000) read as picked, not counted.
//   A judge that values "reads as a real, lived-in answer" will dock
//   them, and "size for its own sake does not count" kills the big ones.
// - Meme numbers (42, 69, 666, 1337) read as a joke, not a confession.
// - Tiny numbers (0, 1, 2) are the other cliché: every minimalist in
//   the field will send one, so they stop being surprising.
// - A three-digit odd number that is not round, not a meme and not a
//   milestone is the shape of a count somebody actually looked at the
//   tab bar and counted: high enough to surprise (most people keep
//   5-30 tabs), low enough to believe (a real tab hoarder who opens
//   a new tab for every half-finished thought, every article to read
//   later, every docs page left open "just in case").
//
// 137 is that number: three digits, odd, not round, not a meme, and it
// hints at a specific life — someone who researches in bursts, opens
// ten tabs per question, and never closes any of them.
//
// Instead of hardcoding the answer, the program scores a shortlist of
// plausible counts against the judge's own criteria and writes the
// best one, so the reasoning above is the program, not just a comment.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = {
  count: number;
  // 0-2: does it read as a real, counted number rather than a picked one?
  realness: number;
  // 0-2: is it surprising against the field's typical 5-30 tabs?
  surprise: number;
  // 0-2: is it believable as an honest answer right now?
  believability: number;
  // 0-1: does it hint at a life behind it (a habit, a situation)?
  livedIn: number;
};

const CANDIDATES: Candidate[] = [
  { count: 1, realness: 1, surprise: 1, believability: 2, livedIn: 1 },
  { count: 7, realness: 2, surprise: 0, believability: 2, livedIn: 0 },
  { count: 23, realness: 2, surprise: 0, believability: 2, livedIn: 0 },
  { count: 42, realness: 0, surprise: 1, believability: 1, livedIn: 0 },
  { count: 69, realness: 0, surprise: 1, believability: 1, livedIn: 0 },
  { count: 100, realness: 0, surprise: 1, believability: 2, livedIn: 0 },
  { count: 137, realness: 2, surprise: 2, believability: 2, livedIn: 1 },
  { count: 500, realness: 0, surprise: 2, believability: 0, livedIn: 0 },
  { count: 999, realness: 0, surprise: 2, believability: 0, livedIn: 0 },
];

function score(c: Candidate): number {
  // The judge's order matters: realness first, then surprise, then
  // believability, then the hint of a life. Weight the sum the same way.
  return c.realness * 4 + c.surprise * 3 + c.believability * 2 + c.livedIn;
}

const best = CANDIDATES.reduce((top, c) =>
  // Strictly greater wins, so on a tie the earlier candidate (the more
  // ordinary, more believable one) keeps the lead.
  score(c) > score(top) ? c : top,
);

const text = String(best.count);

// Gate-shaped check before writing: exactly one number, 1-5 digits.
if (!/^\d{1,5}$/.test(text)) {
  throw new Error(`entry must be 1-5 digits, got: ${JSON.stringify(text)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read it back: the entry is only real if the file holds exactly the
// digits we chose, nothing else, no trailing newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== text) {
  throw new Error(
    `entry mismatch: wrote ${JSON.stringify(text)}, file holds ${JSON.stringify(written)}`,
  );
}

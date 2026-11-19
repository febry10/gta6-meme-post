// Entry program for the make.fun bounty "Post a GTA 6 meme on X"
// (gta6-meme-x-01).
//
// The entry itself is a post on X; the house reads that post from X and
// judges its first picture and its text. All this program has to do is
// hand in the post's address: it takes POST.json from the repository
// root and places an exact copy of it in the output directory.
//
//   MAKEFUN_BOT_DIR     directory holding POST.json (default: ".")
//   MAKEFUN_OUTPUT_DIR  directory the copy goes to  (default: "/output")
//
// Node 22, standard library only. Run it with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '.';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(botDir, 'POST.json');

// Keep the raw bytes: the copy in the output directory must be
// byte-for-byte the POST.json that sits in the repository.
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch {
  console.error(`error: cannot read ${sourcePath} — POST.json is missing`);
  process.exit(1);
}

let post: { url?: unknown };
try {
  post = JSON.parse(raw.toString('utf8'));
} catch {
  console.error(`error: ${sourcePath} does not parse as JSON`);
  process.exit(1);
}

if (typeof post.url !== 'string' || post.url.length === 0) {
  console.error('error: POST.json must carry a non-empty "url" string');
  process.exit(1);
}

// The address has to be a post on X and nothing else:
// https://x.com/<handle>/status/<numeric post id>. Anything else — a
// profile page, another site, a placeholder — would be refused by the
// gate, so refuse it here first with a clear reason.
const POST_ADDRESS = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/;
if (!POST_ADDRESS.test(post.url)) {
  console.error(`error: POST.json "url" is not the address of a post on X: ${post.url}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'POST.json'), raw);
console.log(`handed in the post: ${post.url}`);

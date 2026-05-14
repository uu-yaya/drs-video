/**
 * measure-audio.ts — read every mp3 under public/audio/<chapter>/<n>.mp3
 * and emit src/registry/audio-durations.json with accurate (parsed-from-mp3)
 * duration in seconds, so the runtime can render a continuous video timeline
 * across all chapters without waiting for `loadedmetadata` on each audio element.
 *
 * Run: npm run measure-audio (after a re-synthesis).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mp3Duration from "mp3-duration";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const AUDIO_DIR = path.join(ROOT, "public", "audio");
const OUT_FILE = path.join(ROOT, "src", "registry", "audio-durations.json");

function measure(file: string): Promise<number> {
  return new Promise((resolve, reject) => {
    mp3Duration(file, (err: Error | null, durationSeconds: number) => {
      if (err) reject(err);
      else resolve(durationSeconds);
    });
  });
}

async function main() {
  if (!fs.existsSync(AUDIO_DIR)) {
    console.error(`✗ audio dir not found: ${AUDIO_DIR}`);
    process.exit(1);
  }

  const chapters = fs.readdirSync(AUDIO_DIR).filter((d) =>
    fs.statSync(path.join(AUDIO_DIR, d)).isDirectory(),
  );

  // shape: { "<chapter-id>": { "<step>": <seconds> } }
  const durations: Record<string, Record<string, number>> = {};
  let total = 0;
  let counted = 0;

  for (const chId of chapters) {
    const dir = path.join(AUDIO_DIR, chId);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mp3"))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    durations[chId] = {};
    for (const file of files) {
      const step = file.replace(/\.mp3$/, "");
      try {
        const d = await measure(path.join(dir, file));
        durations[chId][step] = Math.max(0, d);
        total += d;
        counted++;
      } catch (e) {
        console.warn(`  ✗ ${chId}/${file}: ${(e as Error).message}`);
      }
    }
    process.stdout.write(`  ✓ ${chId.padEnd(28)} ${files.length} files\n`);
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(durations, null, 2) + "\n");

  console.log(
    `\n✓ measured ${counted} mp3s, total ${total.toFixed(1)}s = ${Math.floor(total / 60)}m${(total % 60).toFixed(0)}s`,
  );
  console.log(`  → ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

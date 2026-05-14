import { useMemo } from "react";
import "./Subtitle.css";

export interface SubtitleProps {
  /** Current step narration text. Empty string → subtitle hidden. */
  text: string;
  /** Audio current time (seconds). 0 when no audio playing. */
  currentTime: number;
  /** Audio total duration (seconds). 0 when not yet loaded. */
  duration: number;
}

/**
 * Sentence-level subtitle that follows the audio playhead.
 *
 * - Splits the narration into sentences on Chinese terminators (。！？；)
 *   and the em-dash break (——), trimming empties.
 * - When audio is playing (duration > 0), allocates a time window per
 *   sentence proportional to its character count, then highlights the
 *   sentence covering the current time.
 * - When audio is idle (Manual mode or pre-load), shows the full text
 *   so readers aren't left blank.
 */
function splitSentences(text: string): string[] {
  if (!text) return [];
  // Split keeping terminators with their sentence. The em-dash break in
  // Chinese PM-style narration is typically "——" — we treat it as a soft
  // boundary so the subtitle can advance mid-thought instead of waiting
  // for the next full sentence.
  const parts = text
    .split(/(?<=[。！？；])|(?<=——)/)
    .map((s) => s.trim())
    .filter(Boolean);
  // Merge tiny fragments (< 4 chars) into the previous sentence so we
  // don't strobe through 2-3-character stragglers.
  const merged: string[] = [];
  for (const s of parts) {
    if (merged.length > 0 && s.length < 4) {
      merged[merged.length - 1] += s;
    } else {
      merged.push(s);
    }
  }
  return merged.length > 0 ? merged : [text];
}

/**
 * Pre-show offset (seconds) — Chinese TTS has natural pauses after 。 ！ ？，
 * so the char-count-proportional cutover would land *after* the audio has
 * already moved on to the next sentence. We bump the cutover earlier so the
 * subtitle leads the voice slightly, which feels in-sync to viewers.
 *
 * 0.4s ≈ a typical sentence-end pause + perceptual lead allowance.
 */
const LEAD_OFFSET = 0.4;

export function Subtitle({ text, currentTime, duration }: SubtitleProps) {
  const sentences = useMemo(() => splitSentences(text), [text]);

  if (!text) return null;

  // No audio loaded yet → show the full narration (Manual mode fallback)
  if (duration <= 0 || sentences.length <= 1) {
    return (
      <div className="subtitle">
        <div className="subtitle-inner serif-cn">{text}</div>
      </div>
    );
  }

  // Allocate a time window per sentence by char-count proportion.
  // The effective time is bumped by LEAD_OFFSET so subtitles change slightly
  // ahead of the audio, compensating for sentence-end pauses in Chinese TTS.
  const totalChars = sentences.reduce((sum, s) => sum + s.length, 0);
  const effectiveTime = currentTime + LEAD_OFFSET;
  let cumulative = 0;
  let activeIdx = sentences.length - 1; // default to last (post-end)
  for (let i = 0; i < sentences.length; i++) {
    const endFrac = (cumulative + sentences[i].length) / totalChars;
    cumulative += sentences[i].length;
    if (effectiveTime < endFrac * duration) {
      activeIdx = i;
      break;
    }
  }

  return (
    <div className="subtitle">
      <div className="subtitle-inner serif-cn" key={activeIdx}>
        {sentences[activeIdx]}
      </div>
    </div>
  );
}

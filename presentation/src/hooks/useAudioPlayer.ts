import { useEffect, useRef, useState } from "react";

export type PlaybackMode = "manual" | "audio" | "auto";

interface Options {
  /** Audio file path. `null` = no audio for this step (silent). */
  src: string | null;
  /** `manual` = no playback. `audio` = play but don't auto-advance.
   *  `auto` = play and auto-advance when finished. */
  mode: PlaybackMode;
  /** Small breathing pad (ms) after audio finishes before advancing,
   *  in `auto` mode. Default 200ms. Set to 0 if mp3 already has trailing
   *  silence. */
  trailMs?: number;
  /** Fallback duration (ms) for `auto` mode when the audio file is missing
   *  or fails to play. Typically computed from text length. */
  estimateFallbackMs?: number;
  /** Playback speed multiplier (1.0 = normal, 1.5 = 50% faster). Applied
   *  via HTMLAudioElement.playbackRate — runtime stretching, no resynth. */
  playbackRate?: number;
  /** Called when `auto` mode determines the step is finished. */
  onAutoAdvance: () => void;
  /** Has the user started auto playback? (Browsers block autoplay until
   *  the page receives a user gesture; the AutoStartGate flips this.) */
  autoStarted: boolean;
}

/**
 * Per-step audio playback for the presentation.
 *
 * Manages a single hidden `<audio>` element. Switches `src` whenever the
 * current step changes.
 *
 * In `auto` mode:
 *   • Audio file present → advance `trailMs` after the audio's `ended` event.
 *   • Audio file missing / blocked / src = null → advance after
 *     `estimateFallbackMs` (so previews and silent steps still work).
 *
 * Audio playback is the sole driver of step duration — there is intentionally
 * no "minimum hold" knob. If a chapter's visual animation needs more time,
 * the chapter should write longer narration, split the step, or speed the
 * animation up. This keeps Auto-mode behavior trivially predictable.
 */
export interface AudioProgress {
  /** Current playback time in seconds. 0 when idle. */
  currentTime: number;
  /** Total audio duration in seconds. 0 when not yet loaded. */
  duration: number;
  /** Whether audio is currently playing. */
  playing: boolean;
}

export function useAudioPlayer({
  src,
  mode,
  trailMs = 200,
  estimateFallbackMs = 1500,
  playbackRate = 1,
  onAutoAdvance,
  autoStarted,
}: Options): AudioProgress {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Latest callback ref so timers don't capture stale closures.
  const onAdvanceRef = useRef(onAutoAdvance);
  onAdvanceRef.current = onAutoAdvance;

  const [progress, setProgress] = useState<AudioProgress>({
    currentTime: 0,
    duration: 0,
    playing: false,
  });

  // Keep the currently-playing audio's playbackRate in sync without
  // re-creating the audio element (so a rate change mid-step doesn't restart).
  useEffect(() => {
    const a = audioRef.current;
    if (a) a.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const prev = audioRef.current;
    if (prev) {
      prev.pause();
      prev.removeAttribute("src");
      prev.load();
      audioRef.current = null;
    }
    setProgress({ currentTime: 0, duration: 0, playing: false });

    if (mode === "manual") return;
    if (mode === "auto" && !autoStarted) return;

    let advanced = false;
    let timer: number | null = null;

    const advanceAfter = (ms: number) => {
      if (mode !== "auto" || advanced) return;
      timer = window.setTimeout(() => {
        if (advanced) return;
        advanced = true;
        onAdvanceRef.current();
      }, Math.max(0, ms));
    };

    if (src) {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.preload = "auto";
      audio.playbackRate = playbackRate;

      const onTimeUpdate = () => {
        setProgress((p) => ({
          ...p,
          currentTime: audio.currentTime,
          duration: audio.duration || p.duration,
          playing: !audio.paused,
        }));
      };
      const onLoaded = () => {
        setProgress((p) => ({ ...p, duration: audio.duration || 0 }));
      };
      const onPlay = () => setProgress((p) => ({ ...p, playing: true }));
      const onPause = () => setProgress((p) => ({ ...p, playing: false }));
      const onEnded = () => {
        setProgress((p) => ({ ...p, playing: false, currentTime: audio.duration || p.currentTime }));
        advanceAfter(trailMs);
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoaded);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", () => {
        // Audio file missing or undecodable — fall back to estimate.
        if (mode === "auto") advanceAfter(estimateFallbackMs);
      });

      audio.play().catch((err) => {
        // Autoplay blocked (rare, AutoStartGate should prevent this) or
        // file missing — fall back to estimate in auto mode.
        console.warn("audio play failed:", err);
        if (mode === "auto") advanceAfter(estimateFallbackMs);
      });
    } else if (mode === "auto") {
      // No audio for this step (silent / empty narration) — use estimate
      // (divided by playbackRate so fallback scales with rate setting).
      advanceAfter(estimateFallbackMs / Math.max(0.25, playbackRate));
    }

    return () => {
      advanced = true;
      if (timer != null) clearTimeout(timer);
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.removeAttribute("src");
        a.load();
        audioRef.current = null;
      }
    };
    // playbackRate intentionally excluded so changing rate doesn't restart audio
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, mode, trailMs, estimateFallbackMs, autoStarted]);

  return progress;
}

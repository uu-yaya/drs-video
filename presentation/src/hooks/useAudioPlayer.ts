import { useCallback, useEffect, useRef, useState } from "react";

export type PlaybackMode = "manual" | "audio" | "auto";

interface Options {
  /** Audio file path. `null` = no audio for this step (silent). */
  src: string | null;
  /** `manual` = no playback. `audio` = play but don't auto-advance.
   *  `auto` = play and auto-advance when finished. */
  mode: PlaybackMode;
  /** Small breathing pad (ms) after audio finishes before advancing, in `auto`. */
  trailMs?: number;
  /** Fallback duration (ms) for `auto` when the audio is missing / fails. */
  estimateFallbackMs?: number;
  /** Playback speed multiplier (1.0 = normal). Live-updated via HTMLAudioElement.playbackRate. */
  playbackRate?: number;
  /** External pause flag. When true, audio pauses and auto-advance is suspended. */
  paused?: boolean;
  /** Called when `auto` mode determines the step is finished. */
  onAutoAdvance: () => void;
  /** Has the user started auto playback? (Used to gate audio behind a user gesture.) */
  autoStarted: boolean;
}

export interface AudioController {
  /** Current playback time within the active step's audio (seconds). */
  currentTime: number;
  /** Total duration of the active step's audio (seconds). 0 before loaded. */
  duration: number;
  /** Whether audio is currently playing (not paused, not ended). */
  playing: boolean;
  /** Jump audio to a specific time within the active step. Queues the seek
   *  if metadata hasn't loaded yet, consumes it on `loadedmetadata`. */
  seek: (seconds: number) => void;
}

/**
 * Per-step audio playback with imperative seek + pause control so the
 * containing component can drive a continuous video-style timeline.
 *
 * Manages a single hidden `<audio>` element. Switches `src` whenever the
 * step changes; `seek()` queues a pending currentTime that's applied on
 * `loadedmetadata` so cross-step jumps work even before the new audio loads.
 */
export function useAudioPlayer({
  src,
  mode,
  trailMs = 200,
  estimateFallbackMs = 1500,
  playbackRate = 1,
  paused = false,
  onAutoAdvance,
  autoStarted,
}: Options): AudioController {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** Pending currentTime to apply when audio metadata finishes loading. */
  const pendingSeekRef = useRef<number | null>(null);
  const onAdvanceRef = useRef(onAutoAdvance);
  onAdvanceRef.current = onAutoAdvance;
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const [progress, setProgress] = useState<{ currentTime: number; duration: number; playing: boolean }>({
    currentTime: 0,
    duration: 0,
    playing: false,
  });

  // Live-update playbackRate without recreating the audio element.
  useEffect(() => {
    const a = audioRef.current;
    if (a) a.playbackRate = playbackRate;
  }, [playbackRate]);

  // External pause/resume.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (paused) {
      a.pause();
    } else if (mode !== "manual") {
      a.play().catch(() => {/* gesture / file errors handled elsewhere */});
    }
  }, [paused, mode]);

  const seek = useCallback((seconds: number) => {
    const target = Math.max(0, seconds);
    pendingSeekRef.current = target;
    const a = audioRef.current;
    if (a && a.readyState >= 1 && !Number.isNaN(a.duration)) {
      try {
        a.currentTime = Math.min(target, a.duration);
        pendingSeekRef.current = null;
        setProgress((p) => ({ ...p, currentTime: a.currentTime }));
      } catch {
        /* readyState lied — leave it pending for loadedmetadata */
      }
    }
  }, []);

  useEffect(() => {
    const prev = audioRef.current;
    if (prev) {
      prev.pause();
      prev.removeAttribute("src");
      prev.load();
      audioRef.current = null;
    }
    setProgress({ currentTime: 0, duration: 0, playing: false });

    if (mode === "manual") {
      pendingSeekRef.current = null;
      return;
    }
    if (mode === "auto" && !autoStarted) {
      pendingSeekRef.current = null;
      return;
    }

    let advanced = false;
    let timer: number | null = null;

    const advanceAfter = (ms: number) => {
      if (mode !== "auto" || advanced) return;
      timer = window.setTimeout(() => {
        if (advanced || pausedRef.current) return;
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
          playing: !audio.paused && !audio.ended,
        }));
      };
      const onLoaded = () => {
        setProgress((p) => ({ ...p, duration: audio.duration || 0 }));
        const pending = pendingSeekRef.current;
        if (pending != null && audio.duration && !Number.isNaN(audio.duration)) {
          try {
            audio.currentTime = Math.min(pending, audio.duration);
          } catch {
            /* ignore */
          }
          pendingSeekRef.current = null;
        }
      };
      const onPlay = () => setProgress((p) => ({ ...p, playing: true }));
      const onPause = () => setProgress((p) => ({ ...p, playing: false }));
      const onEnded = () => {
        setProgress((p) => ({ ...p, playing: false, currentTime: audio.duration || p.currentTime }));
        if (!pausedRef.current) advanceAfter(trailMs);
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoaded);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", () => {
        if (mode === "auto" && !pausedRef.current) advanceAfter(estimateFallbackMs);
      });

      if (!pausedRef.current) {
        audio.play().catch((err) => {
          console.warn("audio play failed:", err);
          if (mode === "auto" && !pausedRef.current) advanceAfter(estimateFallbackMs);
        });
      }
    } else if (mode === "auto" && !pausedRef.current) {
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
    // playbackRate / paused intentionally excluded — both have their own effects above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, mode, trailMs, estimateFallbackMs, autoStarted]);

  return {
    currentTime: progress.currentTime,
    duration: progress.duration,
    playing: progress.playing,
    seek,
  };
}

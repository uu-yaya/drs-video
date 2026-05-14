import { useCallback } from "react";
import "./VideoControls.css";

export interface VideoControlsProps {
  /** Current playback time (seconds) on the global timeline. */
  currentTime: number;
  /** Total video duration (seconds). */
  totalDuration: number;
  /** Whether playback is currently running. */
  playing: boolean;
  /** Current playback rate (1.0–2.0). */
  rate: number;
  /** Minimum playback rate the slider allows. */
  rateMin: number;
  /** Maximum playback rate the slider allows. */
  rateMax: number;
  /** Rate slider step. */
  rateStep: number;
  /** Toggle play/pause. */
  onTogglePlay: () => void;
  /** User scrubbed to a new global time. */
  onSeek: (seconds: number) => void;
  /** Change playback rate. */
  onRateChange: (rate: number) => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function VideoControls({
  currentTime,
  totalDuration,
  playing,
  rate,
  rateMin,
  rateMax,
  rateStep,
  onTogglePlay,
  onSeek,
  onRateChange,
}: VideoControlsProps) {
  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSeek(parseFloat(e.target.value));
    },
    [onSeek],
  );

  const progressPct =
    totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="video-controls" data-no-advance>
      <button
        type="button"
        className="vc-btn vc-play"
        onClick={onTogglePlay}
        aria-label={playing ? "暂停" : "播放"}
        data-no-advance
      >
        {playing ? (
          // pause icon
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        ) : (
          // play icon
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M7 4 L20 12 L7 20 Z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="vc-track">
        <div className="vc-track-fill" style={{ width: `${progressPct}%` }} />
        <input
          type="range"
          className="vc-track-input"
          min={0}
          max={Math.max(1, totalDuration)}
          step={0.5}
          value={Math.min(currentTime, totalDuration || 0)}
          onChange={handleSeek}
          aria-label="播放进度"
          data-no-advance
        />
      </div>

      <div className="vc-time">
        <span className="vc-time-current">{formatTime(currentTime)}</span>
        <span className="vc-time-sep"> / </span>
        <span className="vc-time-total">{formatTime(totalDuration)}</span>
      </div>

      <div className="vc-rate">
        <span className="vc-rate-label">RATE</span>
        <input
          type="range"
          className="vc-rate-input"
          min={rateMin}
          max={rateMax}
          step={rateStep}
          value={rate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
          aria-label={`语速 ${rate.toFixed(2)} 倍`}
          data-no-advance
        />
        <span className="vc-rate-value">{rate.toFixed(2)}×</span>
      </div>
    </div>
  );
}

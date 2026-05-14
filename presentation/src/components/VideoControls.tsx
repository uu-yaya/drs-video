import { useCallback, useRef, useState } from "react";
import "./VideoControls.css";

export interface ChapterMarker {
  id: string;
  title: string;
  start: number;
  end: number;
}

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
  /** Chapter timeline markers (start/end seconds for each chapter). */
  chapters: ChapterMarker[];
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

function formatTimeShort(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
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
  chapters,
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

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const handleTrackMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect || totalDuration <= 0) {
        setHoverTime(null);
        return;
      }
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const t = (x / rect.width) * totalDuration;
      setHoverTime(t);
    },
    [totalDuration],
  );

  const handleTrackLeave = useCallback(() => setHoverTime(null), []);

  const progressPct =
    totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  // Find chapter the hover position is inside (for tooltip label)
  const hoverChapter =
    hoverTime != null
      ? chapters.find((c) => hoverTime >= c.start && hoverTime < c.end) ??
        chapters[chapters.length - 1]
      : null;
  const hoverPct =
    hoverTime != null && totalDuration > 0
      ? (hoverTime / totalDuration) * 100
      : 0;

  // Current chapter (for the always-visible label below the timeline)
  const currentChapter =
    chapters.find((c) => currentTime >= c.start && currentTime < c.end) ??
    chapters[chapters.length - 1];

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
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M7 4 L20 12 L7 20 Z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="vc-track-wrap">
        <div
          className="vc-track"
          ref={trackRef}
          onMouseMove={handleTrackMove}
          onMouseLeave={handleTrackLeave}
        >
          <div className="vc-track-fill" style={{ width: `${progressPct}%` }} />
          {/* Chapter boundary ticks — skip the very first start (0) */}
          {chapters.slice(1).map((c) => {
            const pct = totalDuration > 0 ? (c.start / totalDuration) * 100 : 0;
            return (
              <div
                key={c.id}
                className="vc-track-tick"
                style={{ left: `${pct}%` }}
              />
            );
          })}
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
          {hoverChapter && hoverTime != null && (
            <div
              className="vc-track-tooltip"
              style={{ left: `${hoverPct}%` }}
            >
              <div className="vc-track-tooltip-title">{hoverChapter.title}</div>
              <div className="vc-track-tooltip-time">
                {formatTimeShort(hoverTime)}
                <span className="vc-track-tooltip-range">
                  {" "}
                  · {formatTimeShort(hoverChapter.start)}
                  &nbsp;–&nbsp;
                  {formatTimeShort(hoverChapter.end)}
                </span>
              </div>
            </div>
          )}
        </div>
        {currentChapter && (
          <div className="vc-current-chapter">
            <span className="vc-current-chapter-tag">CH</span>
            <span className="vc-current-chapter-title">
              {currentChapter.title}
            </span>
            <span className="vc-current-chapter-range">
              {formatTimeShort(currentChapter.start)} – {formatTimeShort(currentChapter.end)}
            </span>
          </div>
        )}
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

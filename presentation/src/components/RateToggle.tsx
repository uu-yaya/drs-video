import "./RateToggle.css";

export const RATE_MIN = 1.0;
export const RATE_MAX = 2.0;
export const RATE_STEP = 0.05;

export interface RateSliderProps {
  rate: number;
  onChange: (rate: number) => void;
}

/**
 * Top-right corner playback rate slider (1.0× — 2.0×, step 0.05).
 *
 * Dimmed by default; lights up on hover. Drag to set rate, the active
 * audio updates immediately without restarting.
 */
export function RateToggle({ rate, onChange }: RateSliderProps) {
  return (
    <div className="rate-slider" data-no-advance>
      <div className="rate-slider-head">
        <span className="rate-slider-label">RATE</span>
        <span className="rate-slider-value">{rate.toFixed(2)}×</span>
      </div>
      <input
        type="range"
        className="rate-slider-input"
        min={RATE_MIN}
        max={RATE_MAX}
        step={RATE_STEP}
        value={rate}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={`音频语速 ${rate.toFixed(2)} 倍`}
      />
      <div className="rate-slider-ticks">
        <span>1.0×</span>
        <span>1.5×</span>
        <span>2.0×</span>
      </div>
    </div>
  );
}

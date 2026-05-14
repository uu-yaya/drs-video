import "./MindMap.css";

export interface MindMapBranchDetail {
  /** 示例值（字段表常用） */
  example?: string;
  /** 来源 */
  source?: string;
  /** 产出方式 */
  production?: string;
  /** 隐私边界 */
  boundary?: string;
  /** 优先级（P0 / P1 / 扩展） */
  priority?: string;
  /** 用途 */
  usage?: string;
  /** 数据方向（§2.1 模块全景表专用） */
  direction?: string;
  /** 支持体验（§2.1 专用，等价于 usage 的一种说法） */
  support?: string;
}

export interface MindMapBranch {
  id: string;
  cn: string;
  en?: string;
  note?: string;
  detail?: MindMapBranchDetail;
}

export interface MindMapProps {
  rootLabel: string;
  rootEn?: string;
  branches: MindMapBranch[];
  /** -1 = overview (no highlight, all branches visible); 0..N-1 highlights that branch */
  activeIndex: number;
  /** mono cue at top */
  ord?: string;
  /** Title shown above the canvas */
  title?: string;
  /** Subtitle shown right under the title */
  subtitle?: string;
  /** Visual radius scale (default 1) — bump for short branch lists, dial down for long ones */
  radiusScale?: number;
}

const STAGE_W = 1920;
const STAGE_H = 1080;
const CENTER_X = STAGE_W / 2;
/** Mind-map vertical center — back to dead center now that detail card floats next to the branch */
const CENTER_Y = STAGE_H / 2;
const BASE_RADIUS_X = 640;
const BASE_RADIUS_Y = 280;

const CARD_W = 460;
/** Estimated max card height — generous buffer so 6-row details (with multi-line wrapped boundary) never clip */
const CARD_H_EST = 560;

function positionFor(i: number, n: number, scale: number) {
  if (n === 1) {
    return { x: CENTER_X, y: CENTER_Y + BASE_RADIUS_Y * scale };
  }
  const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
  const rx = BASE_RADIUS_X * scale;
  const ry = BASE_RADIUS_Y * scale;
  return {
    x: CENTER_X + Math.cos(angle) * rx,
    y: CENTER_Y + Math.sin(angle) * ry,
  };
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * Place the floating detail card to the LEFT or RIGHT of the active branch
 * (never above/below — there isn't enough vertical room with a 560px-tall card
 * on a 1080px stage). The card sits beside the node with a small gap so the
 * node stays fully visible.
 *
 *   - node on stage left half → card on the right
 *   - node on stage right half → card on the left
 *   - if the preferred side doesn't fit, fall back to the other side
 *   - card vertical center tracks the node Y, then clamps into stage bounds
 */
function cardPositionFor(nodeX: number, nodeY: number) {
  const cardHalfW = CARD_W / 2;
  const cardHalfH = CARD_H_EST / 2;
  const inset = 32;
  /** keep the card clear of the bottom subtitle band (~96px + 32 inset) */
  const bottomReserve = 128;
  /** small breathing room between the node card and the floating detail card */
  const gap = 40;
  /**
   * Half the branch node visual width.
   * - Base min-width is 180px → halfW 90 + ~20 padding-half = ~110.
   * - Active branches `transform: scale(1.12)` → +12% → ~123.
   * - The active glow box-shadow extends a few more pixels visually.
   * Bumping this to 160 ensures the floating card never bleeds into the node.
   */
  const nodeHalfW = 160;

  const rightCx = nodeX + nodeHalfW + gap + cardHalfW;
  const leftCx = nodeX - nodeHalfW - gap - cardHalfW;
  const rightFits = rightCx + cardHalfW <= STAGE_W - inset;
  const leftFits = leftCx - cardHalfW >= inset;

  let cx: number;
  if (nodeX <= CENTER_X) {
    // node on the left → prefer right side
    cx = rightFits ? rightCx : leftFits ? leftCx : rightCx;
  } else {
    // node on the right → prefer left side
    cx = leftFits ? leftCx : rightFits ? rightCx : leftCx;
  }
  cx = clamp(cx, cardHalfW + inset, STAGE_W - cardHalfW - inset);

  // vertical center tracks the node, clamped so the card never overflows the
  // stage AND leaves the bottom strip clear for the subtitle band.
  const cy = clamp(nodeY, cardHalfH + inset, STAGE_H - cardHalfH - bottomReserve);

  return { cx, cy };
}

interface DetailRowSpec {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}

function detailRows(detail: MindMapBranchDetail): DetailRowSpec[] {
  const rows: DetailRowSpec[] = [];
  if (detail.direction) rows.push({ label: "数据方向", value: detail.direction });
  if (detail.example) rows.push({ label: "示例值", value: detail.example, mono: true });
  if (detail.source) rows.push({ label: "来源", value: detail.source });
  if (detail.production) rows.push({ label: "产出方式", value: detail.production });
  if (detail.boundary) rows.push({ label: "隐私边界", value: detail.boundary, accent: true });
  if (detail.priority) rows.push({ label: "优先级", value: detail.priority, mono: true });
  if (detail.support) rows.push({ label: "支持体验", value: detail.support });
  if (detail.usage) rows.push({ label: "用途", value: detail.usage });
  return rows;
}

export function MindMap({
  rootLabel,
  rootEn,
  branches,
  activeIndex,
  ord,
  title,
  subtitle,
  radiusScale = 1,
}: MindMapProps) {
  const n = branches.length;
  const scale = radiusScale;
  const active = activeIndex >= 0 ? branches[activeIndex] : null;
  const activeNode = active ? positionFor(activeIndex, n, scale) : null;
  const cardPos = activeNode ? cardPositionFor(activeNode.x, activeNode.y) : null;

  return (
    <div className="mm-canvas">
      {(ord || title || subtitle) && (
        <div className="mm-header">
          {ord && <div className="mm-ord label-mono">{ord}</div>}
          {title && <h2 className="mm-title serif-cn">{title}</h2>}
          {subtitle && <div className="mm-subtitle label-mono">{subtitle}</div>}
        </div>
      )}

      <svg className="mm-svg" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} preserveAspectRatio="xMidYMid slice">
        {branches.map((_, i) => {
          const p = positionFor(i, n, scale);
          const isActive = activeIndex === i;
          const isDim = activeIndex >= 0 && !isActive;
          const stroke = isActive
            ? "var(--accent)"
            : isDim
              ? "var(--text-faint)"
              : "var(--rule)";
          const strokeWidth = isActive ? 3 : isDim ? 1 : 2;
          const dashArray = isActive ? undefined : "6 5";
          return (
            <line
              key={i}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={p.x}
              y2={p.y}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              opacity={isDim ? 0.35 : 1}
            />
          );
        })}
        {/* leader line from active node to detail card */}
        {activeNode && cardPos && (
          <line
            x1={activeNode.x}
            y1={activeNode.y}
            x2={cardPos.cx}
            y2={cardPos.cy}
            stroke="var(--accent)"
            strokeWidth={2}
            strokeDasharray="4 4"
            opacity={0.7}
          />
        )}
      </svg>

      <div
        className="mm-root"
        style={{
          left: `${(CENTER_X / STAGE_W) * 100}%`,
          top: `${(CENTER_Y / STAGE_H) * 100}%`,
        }}
      >
        <div className="mm-root-inner">
          {rootEn && <div className="mm-root-en display-en">{rootEn}</div>}
          <div className="mm-root-cn serif-cn">{rootLabel}</div>
        </div>
      </div>

      {branches.map((b, i) => {
        const p = positionFor(i, n, scale);
        const isActive = activeIndex === i;
        const isDim = activeIndex >= 0 && !isActive;
        const cls = `mm-branch${isActive ? " mm-branch-active" : ""}${isDim ? " mm-branch-dim" : ""}`;
        return (
          <div
            key={b.id}
            className={cls}
            style={{
              left: `${(p.x / STAGE_W) * 100}%`,
              top: `${(p.y / STAGE_H) * 100}%`,
            }}
          >
            <div className="mm-branch-inner">
              {b.en && <div className="mm-branch-en display-en">{b.en}</div>}
              <div className="mm-branch-cn serif-cn">{b.cn}</div>
              {b.note && <div className="mm-branch-note label-mono">{b.note}</div>}
            </div>
          </div>
        );
      })}

      {/* Floating detail card next to the active branch */}
      {active && cardPos && (
        <div
          className="mm-detail-card"
          style={{
            left: `${(cardPos.cx / STAGE_W) * 100}%`,
            top: `${(cardPos.cy / STAGE_H) * 100}%`,
          }}
        >
          <div className="mm-detail-card-head">
            {active.en && <div className="mm-detail-card-en display-en">{active.en}</div>}
            <div className="mm-detail-card-cn serif-cn">{active.cn}</div>
          </div>
          <div className="mm-detail-card-rule" />
          <div className="mm-detail-card-body">
            {active.detail
              ? detailRows(active.detail).map((row, i) => (
                  <div className="mm-detail-card-row" key={i}>
                    <div className="mm-detail-card-row-label label-mono">{row.label}</div>
                    <div
                      className={
                        "mm-detail-card-row-value" +
                        (row.mono ? " mm-detail-card-row-value-mono" : " serif-cn") +
                        (row.accent ? " mm-detail-card-row-value-accent" : "")
                      }
                    >
                      {row.value}
                    </div>
                  </div>
                ))
              : (
                <div className="mm-detail-card-empty label-mono">// 字段详情待补充</div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

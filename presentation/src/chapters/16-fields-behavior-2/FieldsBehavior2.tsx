import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsBehavior2.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "heatmap",
    cn: "鼠标热区",
    en: "mouse_region_heatmap_top3",
    note: "P1",
    detail: {
      example: `["center", "top-right", "left"]`,
      source: "Consumer Runtime",
      production: "桶化派生：10s/1min 滚动窗口；仅统计区域分布",
      boundary: "桶化派生；绝不存原始按键；不形成 keylog",
      priority: "P1",
      usage: "专注 vs 休息判断",
    },
  },
  {
    id: "scroll",
    cn: "滚动强度",
    en: "scroll_intensity_signal",
    note: "P1",
    detail: {
      example: `none / low / mid / high`,
      source: "Consumer Runtime",
      production: "桶化派生：10s/1min 滚动窗口",
      boundary: "桶化派生；绝不存原始按键；不形成 keylog",
      priority: "P1",
      usage: "专注 vs 休息判断",
    },
  },
  {
    id: "events",
    cn: "操作语义事件",
    en: "semantic_events[]",
    note: "P1 · 白名单",
    detail: {
      example: `[{type:"save", at:"..."}]`,
      source: "记忆系统",
      production: "OS Event API 直采；仅监听白名单语义事件；pub/sub",
      boundary: "仅快捷键组合识别；不含字符流",
      priority: "P1",
      usage: `"刚保存 / 刚切 app"`,
    },
  },
  {
    id: "edit_burst",
    cn: "编辑动作 burst",
    en: "text_edit_action_burst",
    note: "P1 · 二阶派生",
    detail: {
      example: `true / false`,
      source: "Consumer Runtime",
      production: "基于 semantic_events 二阶统计派生；每 1min 增量更新",
      boundary: "二阶统计；不含字符流",
      priority: "P1",
      usage: `"在密集编辑长文档"`,
    },
  },
  {
    id: "undo",
    cn: "undo/redo 频率",
    en: "undo_redo_rate_per_min",
    note: "P1",
    detail: {
      example: `5`,
      source: "Consumer Runtime",
      production: "同 text_edit_action_burst 二阶统计派生",
      boundary: "二阶统计；不含字符流",
      priority: "P1",
      usage: `"频繁 undo = 改 bug"`,
    },
  },
  {
    id: "ime",
    cn: "输入法状态",
    en: "ime_state",
    note: "P1 · 非内容",
    detail: {
      example: `zh / en / off`,
      source: "Consumer Runtime",
      production: "同 text_edit_action_burst 二阶统计派生",
      boundary: "IME 状态非内容",
      priority: "P1",
      usage: "中文 vs 英文输入",
    },
  },
  {
    id: "session",
    cn: "编辑会话时长",
    en: "editing_session_duration_min",
    note: "P1",
    detail: {
      example: `45`,
      source: "Consumer Runtime",
      production: "同 text_edit_action_burst 二阶统计派生",
      boundary: "二阶统计；不含字符流",
      priority: "P1",
      usage: "长 session 识别",
    },
  },
];

export default function FieldsBehavior2Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.3 · 行为字段表 · 下半"
    : `§ 3.3 · ${String(step).padStart(2, "0")} / 07 · 下半`;
  return (
    <div className="fb2-scene">
      <MindMap
        rootLabel="行为 (2/2)"
        rootEn="§ 3.3 BEHAVIOR · B"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "行为字段表 · 下半 7 字段" : undefined}
        subtitle={step === 0 ? "二阶统计派生 · 不含字符流" : undefined}
        radiusScale={0.95}
      />
    </div>
  );
}

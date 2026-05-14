import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsPC.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "name",
    cn: "当前 app 名",
    en: "active_app.name",
    note: "P0 · OS API",
    detail: {
      example: `"VS Code"`,
      source: "记忆系统",
      production: "OS 进程 API 直采；每 1s 轮询 + 变更立即推送",
      boundary: "仅实时 snapshot；不读 app 内容；不进入长期画像",
      priority: "P0",
      usage: `"在游戏中" vs "在工作中"`,
    },
  },
  {
    id: "bundle",
    cn: "bundle ID",
    en: "active_app.bundle_id",
    note: "P0 · 白名单",
    detail: {
      example: `"com.microsoft.VSCode"`,
      source: "记忆系统",
      production: "同 active_app.name OS 进程 API 直采",
      boundary: "仅 snapshot；用于 app 分类和白名单匹配",
      priority: "P0",
      usage: `"在游戏中" vs "在工作中"`,
    },
  },
  {
    id: "fullscreen",
    cn: "全屏状态",
    en: "active_app.is_fullscreen",
    note: "P0 · 全屏=闭嘴",
    detail: {
      example: `false`,
      source: "记忆系统",
      production: "OS 窗口 API 直采 + 屏幕分辨率比对",
      boundary: "仅 OS 公开 API",
      priority: "P0",
      usage: "全屏 = 闭嘴",
    },
  },
  {
    id: "idle",
    cn: "闲置信号",
    en: "idle_signal",
    note: "P0 · 4 档",
    detail: {
      example: `active / >5min / >10min / >30min`,
      source: "Consumer Runtime",
      production: "基于 OS idle 时间阈值分级；每 30s + 状态变化推送",
      boundary: "仅 OS idle 时间，不含输入内容",
      priority: "P0",
      usage: `"用户离开"判断`,
    },
  },
  {
    id: "switch",
    cn: "切换 burst",
    en: "app_switch_burst",
    note: "P1 · 时序统计",
    detail: {
      example: `true / false`,
      source: "Consumer Runtime",
      production: "5min 滚动窗口切换次数 ≥N 触发；变化时增量更新",
      boundary: "仅时序统计；用于画像需行为数据授权",
      priority: "P1",
      usage: "识别频繁切换状态",
    },
  },
];

export default function FieldsPCChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.2 · PC 进程字段表"
    : `§ 3.2 · ${String(step).padStart(2, "0")} / 05`;
  return (
    <div className="fp-scene">
      <MindMap
        rootLabel="PC 进程行为"
        rootEn="§ 3.2 BEHAVIOR-PC"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "PC 进程字段表 · 5 字段" : undefined}
        subtitle={step === 0 ? "只看用户在用什么 app · 不读 app 内容" : undefined}
        radiusScale={0.85}
      />
    </div>
  );
}

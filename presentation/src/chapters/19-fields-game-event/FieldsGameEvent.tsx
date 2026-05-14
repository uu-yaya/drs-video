import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsGameEvent.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "start",
    cn: "对局开始",
    en: "game_session.start",
    note: "P0",
    detail: {
      example: `"2026-05-12T20:00Z"`,
      source: "记忆系统",
      production: "游戏 SDK 直采事件；游戏侧一局开始时推送",
      boundary: "首方游戏 SDK",
      priority: "P0",
      usage: "知道一局开始",
    },
  },
  {
    id: "end",
    cn: "对局结束",
    en: "game_session.end",
    note: "P0",
    detail: {
      example: `"2026-05-12T20:30Z"`,
      source: "记忆系统",
      production: "同上 SDK 直采事件；一局结束时推送",
      boundary: "首方游戏 SDK",
      priority: "P0",
      usage: "知道一局结束",
    },
  },
  {
    id: "in_game_time",
    cn: "游戏内时间",
    en: "game_session.in_game_time",
    note: "P0 · 可缺",
    detail: {
      example: `"游戏内第 5 日"`,
      source: "记忆系统",
      production: "游戏 SDK 实时推送游戏内时间；部分游戏可缺",
      boundary: "首方游戏 SDK",
      priority: "P0",
      usage: "游戏内时间",
    },
  },
  {
    id: "stream",
    cn: "事件流",
    en: "game_event.stream",
    note: "P0 · 去重整理",
    detail: {
      example: `[{type:"death", at:"..."}]`,
      source: "记忆系统",
      production: "游戏 SDK pub/sub；游戏声明 P0 事件集；记忆系统去重时序整理",
      boundary: "首方 SDK；payload 只允许游戏内最小必要字段",
      priority: "P0",
      usage: "桌宠按事件反应",
    },
  },
  {
    id: "duration",
    cn: "时长分级",
    en: "game_session.duration_signal",
    note: "P0 · 健康提示",
    detail: {
      example: `long_session`,
      source: "Consumer Runtime",
      production: "规则分级：基于 session.start 时间戳；阈值按游戏校准",
      boundary: "派生分级；需记录 rule_version",
      priority: "P0",
      usage: "健康提示触发",
    },
  },
  {
    id: "emotion",
    cn: "事件情绪线索",
    en: "event_emotion_signal",
    note: "P0 · 非诊断",
    detail: {
      example: `frustration`,
      source: "Consumer Runtime",
      production: "AI + 规则推断：game_event + idip_delta + 已授权情绪线索",
      boundary: "短期 event 信号；游戏场景情绪线索，非心理诊断",
      priority: "P0",
      usage: "当下回应 / 日记 / 高光的事件级情绪锚点",
    },
  },
  {
    id: "hint",
    cn: "回应策略",
    en: "event_response_hint",
    note: "P0 · 规则+AI",
    detail: {
      example: `comfort`,
      source: "Consumer Runtime",
      production: "规则优先 + AI 辅助：emotion + game_event + profile",
      boundary: "短期 runtime 信号；服务当下回应，不写现实人格判断",
      priority: "P0",
      usage: "决定桌宠怎么回应",
    },
  },
  {
    id: "highlight",
    cn: "高光排序分",
    en: "episode.highlight_score",
    note: "P1 · 0-1",
    detail: {
      example: `0.82`,
      source: "Memory Intelligence",
      production: "待校准评分：milestone / 事件重要度 / 用户保存 / 情绪强度 / 稀有度",
      boundary: "派生标量；需记录 score_version 和 score_reason[]",
      priority: "P1",
      usage: "高光排序 / 日记素材推荐",
    },
  },
];

export default function FieldsGameEventChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.6 · 实时事件字段表"
    : `§ 3.6 · ${String(step).padStart(2, "0")} / 08`;
  return (
    <div className="fg-scene">
      <MindMap
        rootLabel="实时事件"
        rootEn="§ 3.6 GAME EVENT"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "实时事件字段表 · 8 字段" : undefined}
        subtitle={step === 0 ? "首方游戏事件流 · payload 仅必要游戏内字段" : undefined}
        radiusScale={1}
      />
    </div>
  );
}

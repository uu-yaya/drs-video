import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsPrefs1.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "ct_enabled",
    cn: "启用内容类型",
    en: "content_type.enabled",
    note: "P1",
    detail: {
      example: `["light_reflection", "emotion_companion", "diary"]`,
      source: "用户设置（memory 持久化）",
      production: "偏好设置页 UI 写入；用户显式勾选",
      boundary: "用户显式开关；用户主动设置永远优先",
      priority: "P1",
      usage: "生成内容类型；枚举 8 类",
    },
  },
  {
    id: "ct_priority",
    cn: "优先级排序",
    en: "content_type.priority",
    note: "P1",
    detail: {
      example: `["emotion_companion", "diary", "light_reflection"]`,
      source: "用户设置（memory 持久化）",
      production: "偏好设置页 UI 写入；用户拖拽排序",
      boundary: "用户主动输入",
      priority: "P1",
      usage: "多内容竞争时输出顺序",
    },
  },
  {
    id: "ct_feedback",
    cn: "内容反馈",
    en: "content_type.user_feedback",
    note: "P1",
    detail: {
      example: `[{target:"tactical_advice", value:0, source:"button"}]`,
      source: "用户显式反馈行为（memory 记录）",
      production: "系统自动写；不直接覆盖 enabled",
      boundary: "仅记录反馈行为；显式开关优先",
      priority: "P1",
      usage: "反馈学习辅助权重",
    },
  },
  {
    id: "ds_freq",
    cn: "日记频率",
    en: "diary_style.frequency",
    note: "P1 · 4 枚举",
    detail: {
      example: "event_driven",
      source: "用户设置（memory 持久化）",
      production: "偏好设置页 UI 写入；AI 严禁自动写入",
      boundary: "用户主动输入",
      priority: "P1",
      usage: "daily / weekly / event_driven / off",
    },
  },
  {
    id: "ds_length",
    cn: "日记长度",
    en: "diary_style.length",
    note: "P1 · 3 枚举",
    detail: {
      example: "medium",
      source: "用户设置（memory 持久化）",
      production: "偏好设置页 UI 写入；AI 严禁自动",
      boundary: "用户主动输入",
      priority: "P1",
      usage: "short / medium / long",
    },
  },
  {
    id: "ds_focus",
    cn: "日记重点",
    en: "diary_style.focus",
    note: "P1 · 4 枚举",
    detail: {
      example: "emotion",
      source: "用户设置（memory 持久化）",
      production: "偏好设置页 UI 写入；AI 严禁自动",
      boundary: "用户主动输入",
      priority: "P1",
      usage: "events / emotion / growth / mixed",
    },
  },
  {
    id: "ds_quote",
    cn: "引用用户原话",
    en: "quote_user_original",
    note: "P1 · 受授权约束",
    detail: {
      example: "true",
      source: "用户设置（memory 持久化）",
      production: "偏好设置页 UI 写入",
      boundary: "需 diary_quote 授权 + quote_eligible=true",
      priority: "P1",
      usage: "是否偏好日记引用对话原文",
    },
  },
  {
    id: "pg_chat",
    cn: "聊天内容授权",
    en: "privacy_grants.chat_content",
    note: "P0 · 默认 false",
    detail: {
      example: `{granted:true, granted_at:"...", revoked_at:null}`,
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "隐私设置页主动勾选；AI 严禁自动设置",
      boundary: "默认 false；用户主动",
      priority: "P0",
      usage: "首方对话是否可入长期画像",
    },
  },
  {
    id: "pg_game",
    cn: "游戏事件画像授权",
    en: "game_event_memory",
    note: "P0 · 默认 false",
    detail: {
      example: "同 chat_content 格式",
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户主动勾选；实时反应与长期画像分开",
      boundary: "核心实时反应可用；长期画像可关",
      priority: "P0",
      usage: "进度 / 成就 / 风格画像",
    },
  },
  {
    id: "pg_behavior",
    cn: "行为数据画像授权",
    en: "behavior_data",
    note: "P1 · 默认 false",
    detail: {
      example: "同 chat_content 格式",
      source: "用户显式授权 / 撤回（consent ledger）",
      production: "用户主动勾选",
      boundary: "默认 false",
      priority: "P1",
      usage: "低敏行为信号用于打扰 / 玩法推断",
    },
  },
];

export default function FieldsPrefs1Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.12 · 用户偏好字段表 · 上半"
    : `§ 3.12 · ${String(step).padStart(2, "0")} / 10 · 上半`;
  return (
    <div className="fpr1-scene">
      <MindMap
        rootLabel="用户偏好 (1/2)"
        rootEn="§ 3.12 PREFS · A"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "用户偏好字段表 · 上半 10 字段" : undefined}
        subtitle={step === 0 ? "内容类型 · 日记风格 · 隐私授权前 3 项" : undefined}
        radiusScale={1}
      />
    </div>
  );
}

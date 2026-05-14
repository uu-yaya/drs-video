import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsMetaDetail.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "summary",
    cn: "证据短解释",
    en: "evidence_summary",
    note: "P1 · 不引新事实",
    detail: {
      example: `"最近 5 局多次选择稳健发育路线"`,
      source: "Memory Intelligence",
      production: "可选短解释；基于 evidence_ids，不引入新事实",
      boundary: "不含原始敏感内容",
      priority: "P1",
      usage: "画像页解释「为什么这么判断」",
    },
  },
  {
    id: "first_seen",
    cn: "首次见时间",
    en: "first_seen_at",
    note: "P0 · 衰减起点",
    detail: {
      example: `"2026-04-21T09:10:00Z"`,
      source: "记忆系统",
      production: "系统时间戳；写入时记录",
      boundary: "系统时间戳",
      priority: "P0",
      usage: "时效衰减起点",
    },
  },
  {
    id: "last_confirmed",
    cn: "末次确认",
    en: "last_confirmed_at",
    note: "P0 · 衰减基准",
    detail: {
      example: `"2026-04-21T09:10:00Z"`,
      source: "记忆系统",
      production: "用户设置 / 正反馈 / 行为再次验证时更新",
      boundary: "系统时间戳",
      priority: "P0",
      usage: "时效衰减计算",
    },
  },
  {
    id: "is_active",
    cn: "当前是否可用",
    en: "is_active",
    note: "P0 · 硬判断",
    detail: {
      example: "true / false",
      source: "记忆系统",
      production: "系统状态：true=可用于陪伴 / 展示 / 复盘",
      boundary: "状态布尔值",
      priority: "P0",
      usage: "使用前的硬判断",
    },
  },
  {
    id: "inactive_reason",
    cn: "不可用原因",
    en: "inactive_reason",
    note: "P0 · 5 枚举",
    detail: {
      example: "user_rejected",
      source: "记忆系统",
      production: "系统记录；仅当 is_active=false 填写",
      boundary: "不含原始内容",
      priority: "P0",
      usage: "解释为什么不能用",
    },
  },
  {
    id: "inactive_at",
    cn: "失效时间",
    en: "inactive_at",
    note: "P0 · 审计",
    detail: {
      example: `"2026-05-13T21:30:00Z"`,
      source: "记忆系统",
      production: "系统时间戳；true→false 时写入",
      boundary: "系统时间戳",
      priority: "P0",
      usage: "审计与排查",
    },
  },
  {
    id: "decay",
    cn: "衰减分",
    en: "decay_score",
    note: "P0 · 规则派生",
    detail: {
      example: "0.95",
      source: "Memory Intelligence",
      production: "规则时间衰减派生；基于 last_confirmed_at",
      boundary: "派生标量",
      priority: "P0",
      usage: "桌宠不用自己做衰减逻辑",
    },
  },
  {
    id: "feedback",
    cn: "用户反馈",
    en: "user_feedback[]",
    note: "P1 · 反哺闭环",
    detail: {
      example: `[{value:0, source:"chat", at:"...", target:"..."}]`,
      source: "记忆系统",
      production: "系统自动写记录用户显式反馈 / 更正",
      boundary: "反馈事件，无原始内容",
      priority: "P1",
      usage: "反馈反哺闭环；负向可触发 inactive",
    },
  },
];

export default function FieldsMetaDetailChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.9 · profile_meta 生命周期字段"
    : `§ 3.9 · ${String(step).padStart(2, "0")} / 08`;
  return (
    <div className="fmd-scene">
      <MindMap
        rootLabel="meta 生命周期"
        rootEn="§ 3.9 META · LIFECYCLE"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "profile_meta 生命周期 · 8 字段" : undefined}
        subtitle={step === 0 ? "时效衰减 · 失效记录 · 用户反馈反哺" : undefined}
        radiusScale={1}
      />
    </div>
  );
}

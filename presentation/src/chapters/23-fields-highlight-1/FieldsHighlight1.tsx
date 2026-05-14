import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsHighlight1.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "id",
    cn: "高光 ID",
    en: "highlight_id",
    note: "P1 · UUID",
    detail: {
      example: `"hl_2026042100001"`,
      source: "记忆系统",
      production: "系统生成 UUID；highlight 触发命中时分配",
      boundary: "系统 UUID",
      priority: "P1",
      usage: "主键",
    },
  },
  {
    id: "title",
    cn: "标题",
    en: "title",
    note: "P1 · ≤20 字",
    detail: {
      example: `"首次单杀王者打野"`,
      source: "Memory Intelligence / Runtime → 用户可编辑",
      production: "AI 生成建议（≤20 字）；用户编辑后覆盖",
      boundary: "引用 atomic_facts 必须 quote_eligible=true",
      priority: "P1",
      usage: "标题（≤20 字）",
    },
  },
  {
    id: "time",
    cn: "时间",
    en: "time",
    note: "P1 · 上游 ts",
    detail: {
      example: `"2026-04-20T22:15:33Z"`,
      source: "记忆系统",
      production: "系统直接：上游 trigger event 时间戳",
      boundary: "系统时间戳",
      priority: "P1",
      usage: "事件时间",
    },
  },
  {
    id: "scene",
    cn: "场景",
    en: "scene",
    note: "P1 · AI 合成",
    detail: {
      example: `"王者荣耀 - 河道遭遇战"`,
      source: "Memory Intelligence / Consumer Runtime",
      production: "AI 合成：active_app + 标题 + VLM 标签",
      boundary: "不输出个人身份信息",
      priority: "P1",
      usage: "场景描述",
    },
  },
  {
    id: "summary",
    cn: "事件摘要",
    en: "event_summary",
    note: "P1 · ≤80 字",
    detail: {
      example: `"在野区被对方打野针对 3 次后..."`,
      source: "Memory Intelligence / Runtime → 用户可编辑",
      production: "AI 生成（≤80 字）；用户编辑后覆盖",
      boundary: "引用 atomic_facts 必须 quote_eligible=true",
      priority: "P1",
      usage: "摘要",
    },
  },
  {
    id: "category",
    cn: "分类",
    en: "category",
    note: "P1 · 6 枚举",
    detail: {
      example: "achievement / growth / emotion / social / ...",
      source: "Memory Intelligence / Runtime → 用户可改",
      production: "AI 分类输出枚举；schema 强约束禁自由文本",
      boundary: "enum 强约束",
      priority: "P1",
      usage: "6 类枚举",
    },
  },
  {
    id: "tags",
    cn: "标签",
    en: "tags[]",
    note: "P1 · ≤5",
    detail: {
      example: `["反蹲", "单杀", "首次"]`,
      source: "Memory Intelligence / Runtime → 用户可改",
      production: "AI 生成标签建议（≤5 条，去重）；用户改后覆盖",
      boundary: "不输出个人身份信息",
      priority: "P1",
      usage: "自由标签",
    },
  },
];

export default function FieldsHighlight1Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.11 · 高光字段表 · 上半"
    : `§ 3.11 · ${String(step).padStart(2, "0")} / 07 · 上半`;
  return (
    <div className="fh1-scene">
      <MindMap
        rootLabel="高光 (1/2)"
        rootEn="§ 3.11 HIGHLIGHT · A"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "高光字段表 · 上半 7 字段" : undefined}
        subtitle={step === 0 ? "AI 生成建议 · 用户可编辑覆盖" : undefined}
        radiusScale={0.95}
      />
    </div>
  );
}

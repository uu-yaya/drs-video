import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsHighlight2.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "source",
    cn: "触发源",
    en: "source",
    note: "P1 · 3 枚举",
    detail: {
      example: "idip_milestone / episode_highlight_score / user_starred",
      source: "记忆系统",
      production: "系统标记触发源 enum",
      boundary: "角色相似度结果不生成高光，避免自证循环",
      priority: "P1",
      usage: "触发源",
    },
  },
  {
    id: "privacy",
    cn: "隐私级别",
    en: "privacy_level",
    note: "P1 · 默认 private",
    detail: {
      example: "private / shareable",
      source: "记忆系统",
      production: "用户输入：默认 private；主动分享时生成 shareable",
      boundary: "private 不可分享；用户可改",
      priority: "P1",
      usage: "private / shareable",
    },
  },
  {
    id: "pinned",
    cn: "置顶",
    en: "pinned",
    note: "P1 · 用户操作",
    detail: {
      example: "true / false",
      source: "记忆系统",
      production: "用户输入直接（偏好设置页 UI 置顶操作）",
      boundary: "用户输入",
      priority: "P1",
      usage: "置顶 bool",
    },
  },
  {
    id: "evidence",
    cn: "证据 IDs",
    en: "evidence_ids[]",
    note: "P1 · 反查实证",
    detail: {
      example: `["game_event_xx", "idip_milestone_xx"]`,
      source: "记忆系统",
      production: "系统直接写入上游 episode / event / milestone ID",
      boundary: "指向 ID，不含原始内容",
      priority: "P1",
      usage: "分享卡片 / 复盘 / 相似度解释反查实证",
    },
  },
  {
    id: "is_active",
    cn: "是否可用",
    en: "is_active",
    note: "P1 · 默认 true",
    detail: {
      example: "true",
      source: "记忆系统",
      production: "系统记录：默认 true；删除 / 否定 / 替换后 false",
      boundary: "false 后不可展示、引用、作为相似度证据",
      priority: "P1",
      usage: "统一生命周期",
    },
  },
  {
    id: "inactive_reason",
    cn: "不可用原因",
    en: "inactive_reason",
    note: "P1 · 5 枚举",
    detail: {
      example: "user_deleted / user_rejected / expired / ...",
      source: "记忆系统",
      production: "系统记录；仅当 is_active=false 填写",
      boundary: "不含原始内容",
      priority: "P1",
      usage: "解释为什么不能用",
    },
  },
  {
    id: "inactive_at",
    cn: "失效时间",
    en: "inactive_at",
    note: "P1 · 审计",
    detail: {
      example: `"2026-05-13T10:50:00Z"`,
      source: "记忆系统",
      production: "系统记录：删除 / 否定 / 替换 / 过期时写入",
      boundary: "系统时间戳",
      priority: "P1",
      usage: "审计 / 恢复",
    },
  },
];

export default function FieldsHighlight2Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.11 · 高光字段表 · 下半"
    : `§ 3.11 · ${String(step).padStart(2, "0")} / 07 · 下半`;
  return (
    <div className="fh2-scene">
      <MindMap
        rootLabel="高光 (2/2)"
        rootEn="§ 3.11 HIGHLIGHT · B"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "高光字段表 · 下半 7 字段" : undefined}
        subtitle={step === 0 ? "触发源 · 隐私级别 · 统一生命周期" : undefined}
        radiusScale={0.95}
      />
    </div>
  );
}

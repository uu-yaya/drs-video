import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsSimilarity2.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "unmatched",
    cn: "未命中特点",
    en: "unmatched_traits[]",
    note: "P1 · 不羞辱",
    detail: {
      example: `[{dimension:"social_style", match_score:0}]`,
      source: "产品内大模型服务",
      production: "只包含证据足够但 not_matched 的 trait",
      boundary: "UI 默认可折叠；避免羞辱性表达",
      priority: "P1",
      usage: "解释差异 / 用户更正",
    },
  },
  {
    id: "not_evaluable",
    cn: "不可判断特点",
    en: "not_evaluable_traits[]",
    note: "P1 · 不进总分",
    detail: {
      example: `[{dimension:"content_preference", reason:"insufficient_evidence"}]`,
      source: "记忆系统 + 大模型服务",
      production: "未授权 / 证据不足 / 不确定不参与总分",
      boundary: "不把未知当作不符合",
      priority: "P1",
      usage: "解释为什么没测出来",
    },
  },
  {
    id: "window",
    cn: "数据窗口",
    en: "data_window",
    note: "P1 · 可解释",
    detail: {
      example: `{from:"...", to:"...", session_count:62}`,
      source: "记忆系统",
      production: "调用前统计可用数据窗口范围",
      boundary: "系统统计",
      priority: "P1",
      usage: "可解释",
    },
  },
  {
    id: "at",
    cn: "测定时间",
    en: "assessment_at",
    note: "P1",
    detail: {
      example: `"2026-05-13T10:40:00Z"`,
      source: "记忆系统",
      production: "系统时间戳",
      boundary: "系统时间戳",
      priority: "P1",
      usage: "测定时间",
    },
  },
  {
    id: "feedback",
    cn: "用户反馈",
    en: "user_feedback[]",
    note: "P1 · 反馈信号",
    detail: {
      example: `[{value:1, source:"chat", at:"..."}]`,
      source: "记忆系统",
      production: "用户显式反馈写入；按钮 / 口头 / 文本",
      boundary: "用户输入",
      priority: "P1",
      usage: "结果反馈信号",
    },
  },
  {
    id: "use_for",
    cn: "用于陪伴策略",
    en: "use_for_companion",
    note: "P1 · 默认 false",
    detail: {
      example: "false",
      source: "记忆系统",
      production: "用户接受结果后可单独开启；默认 false",
      boundary: "默认不影响桌宠对话策略",
      priority: "P1",
      usage: "防止测定污染日常陪伴",
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
      production: "默认 true；删除 / 否定 / 过期后 false",
      boundary: "false 后不可展示 / 引用 / 作参考",
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
      production: "仅当 is_active=false 时填写",
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
      example: `"2026-05-20T10:40:00Z"`,
      source: "记忆系统",
      production: "测定结果变为不可用时写入",
      boundary: "系统时间戳",
      priority: "P1",
      usage: "审计 / 重测提示",
    },
  },
];

export default function FieldsSimilarity2Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.13 · 角色相似度字段表 · 下半"
    : `§ 3.13 · ${String(step).padStart(2, "0")} / 09 · 下半`;
  return (
    <div className="fs2-scene">
      <MindMap
        rootLabel="角色相似度 (2/2)"
        rootEn="§ 3.13 SIMILARITY · B"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "角色相似度字段表 · 下半 9 字段" : undefined}
        subtitle={step === 0 ? "未命中 / 不可判断 / 数据窗口 / 反馈 / 生命周期" : undefined}
        radiusScale={1}
      />
    </div>
  );
}

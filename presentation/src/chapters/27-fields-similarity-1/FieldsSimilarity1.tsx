import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsSimilarity1.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "id",
    cn: "测定 ID",
    en: "assessment_id",
    note: "P1 · UUID",
    detail: {
      example: `"char_sim_2026051300001"`,
      source: "记忆系统",
      production: "系统生成 UUID",
      boundary: "系统 UUID",
      priority: "P1",
      usage: "主键",
    },
  },
  {
    id: "taxonomy",
    cn: "角色体系版本",
    en: "taxonomy_version",
    note: "P1 · 防过期",
    detail: {
      example: `"public_character_taxonomy_v1.2"`,
      source: "产品内角色配置",
      production: "返回当前游戏可用角色体系版本",
      boundary: "禁止内部代号 / 未授权 IP 信息",
      priority: "P1",
      usage: "防止结果过期",
    },
  },
  {
    id: "scope",
    cn: "输入范围",
    en: "input_scope",
    note: "P1 · 授权裁剪",
    detail: {
      example: `{profile:true, game_event:true, chat:false}`,
      source: "记忆系统",
      production: "调用前记录；只纳入授权且 active 的证据",
      boundary: "用户授权快照；可审计",
      priority: "P1",
      usage: "解释用了哪些数据",
    },
  },
  {
    id: "consent",
    cn: "授权快照",
    en: "consent_snapshot",
    note: "P1 · 审计",
    detail: {
      example: `{profile_inference:true, character_similarity:true}`,
      source: "记忆系统",
      production: "测定前复制本次实际生效授权",
      boundary: "不含原始内容",
      priority: "P1",
      usage: "审计 / 解释",
    },
  },
  {
    id: "evidence_types",
    cn: "证据类型",
    en: "allowed_evidence_types_used",
    note: "P1",
    detail: {
      example: `["playstyle_profile", "game_event", "highlight_event"]`,
      source: "记忆系统",
      production: "角色 trait 配置 ∩ 本次授权",
      boundary: "只记录类型，不含原文",
      priority: "P1",
      usage: "说明用了哪些证据",
    },
  },
  {
    id: "status",
    cn: "测定状态",
    en: "assessment_status",
    note: "P1 · 3 枚举",
    detail: {
      example: "completed / insufficient_authorization / ...",
      source: "记忆系统 + 大模型服务",
      production: "测定流程状态机写入",
      boundary: "未完成时不展示确定角色",
      priority: "P1",
      usage: "区分未授权 / 证据不足 / 已完成",
    },
  },
  {
    id: "char_id",
    cn: "最相似角色 ID",
    en: "matched_character_id",
    note: "P1",
    detail: {
      example: `"mage_mentor"`,
      source: "产品内大模型服务",
      production: "基于授权数据分析返回；来自授权角色体系",
      boundary: "不写内部代号",
      priority: "P1",
      usage: "结果主键",
    },
  },
  {
    id: "char_name",
    cn: "最相似角色名",
    en: "matched_character_name",
    note: "P1",
    detail: {
      example: `"星轨导师"`,
      source: "产品内大模型服务",
      production: "返回可展示角色名；未完成时为 null",
      boundary: "仅授权可展示名称",
      priority: "P1",
      usage: "UI 展示",
    },
  },
  {
    id: "score",
    cn: "相似度分数",
    en: "similarity_score",
    note: "P1 · 0-1",
    detail: {
      example: "0.75",
      source: "产品内大模型服务",
      production: "可判断 traits 的 match_score × weight 加权",
      boundary: "不作为人格分数；UI 可不展示数字",
      priority: "P1",
      usage: "排序 / 结果稳定性",
    },
  },
  {
    id: "matched",
    cn: "命中特点",
    en: "matched_traits[]",
    note: "P1 · UI 主展示",
    detail: {
      example: `[{dimension:"playstyle", match_score:1}]`,
      source: "产品内大模型服务",
      production: "只包含 match_status=matched；带 evidence_ids",
      boundary: "解释必须基于 evidence",
      priority: "P1",
      usage: "UI 主展示「你像 TA 的地方」",
    },
  },
];

export default function FieldsSimilarity1Chapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.13 · 角色相似度字段表 · 上半"
    : `§ 3.13 · ${String(step).padStart(2, "0")} / 10 · 上半`;
  return (
    <div className="fs1-scene">
      <MindMap
        rootLabel="角色相似度 (1/2)"
        rootEn="§ 3.13 SIMILARITY · A"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "角色相似度字段表 · 上半 10 字段" : undefined}
        subtitle={step === 0 ? "ID / 体系版本 / 授权快照 / 测定状态 / 结果" : undefined}
        radiusScale={1}
      />
    </div>
  );
}

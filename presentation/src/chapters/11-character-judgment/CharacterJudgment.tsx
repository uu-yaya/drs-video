import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./CharacterJudgment.css";

const STATUSES: MindMapBranch[] = [
  {
    id: "matched",
    cn: "命中",
    en: "matched",
    note: "进总分 · score=1",
    detail: {
      example: "match_score = 1",
      usage: "证据足够，且满足角色 trait 的 requirement",
      production: "进总分",
      boundary: "必须基于 evidence_ids，不得引入新事实",
    },
  },
  {
    id: "not_matched",
    cn: "未命中",
    en: "not_matched",
    note: "进总分 · score=0",
    detail: {
      example: "match_score = 0",
      usage: "证据足够，但不满足 requirement 或命中反向信号",
      production: "进总分",
      boundary: "默认 UI 折叠；避免羞辱性表达",
    },
  },
  {
    id: "uncertain",
    cn: "不确定",
    en: "uncertain",
    note: "不进总分",
    detail: {
      usage: "证据冲突严重或 judge 低置信",
      production: "不进总分",
      boundary: "不把模糊判定塞进结果",
    },
  },
  {
    id: "insufficient",
    cn: "证据不足",
    en: "insufficient_evidence",
    note: "不进总分",
    detail: {
      usage: "已授权但数据不足",
      production: "不进总分",
      boundary: "不把未知当作不符合",
    },
  },
  {
    id: "not_auth",
    cn: "未授权",
    en: "not_authorized",
    note: "不进总分",
    detail: {
      usage: "用户未授权该维度所需 evidence",
      production: "不进总分",
      boundary: "撤回授权后历史结果仍可解释，但不可新增测定",
    },
  },
];

export default function CharacterJudgmentChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.13 · 5 种判定状态"
    : `§ 3.13 · ${String(step).padStart(2, "0")} / 05`;
  return (
    <div className="cj-scene">
      <MindMap
        rootLabel="判定状态"
        rootEn="JUDGMENT STATUS"
        branches={STATUSES}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "判定状态 · 5 种" : undefined}
        subtitle={step === 0 ? "matched + not_matched 进总分 · 后三种不进" : undefined}
        radiusScale={0.9}
      />
    </div>
  );
}

import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./Character.css";

const DIMENSIONS: MindMapBranch[] = [
  {
    id: "playstyle",
    cn: "玩法风格",
    en: "playstyle",
    note: "rule + AI judge",
    detail: {
      example: "稳健发育 / 团队支援 / 优先目标",
      source: "playstyle_profile.* / game_event / idip_delta / highlight_event",
      production: "规则优先 + AI judge 兜底",
      usage: "用户怎么玩",
    },
  },
  {
    id: "goal",
    cn: "游戏目标",
    en: "goal_orientation",
    note: "rule first",
    detail: {
      example: "rank / practice_char / 通关",
      source: "game_profile.game_goals / progress_profile.current_goal / idip_milestone",
      production: "规则优先",
      usage: "用户最近追求什么",
    },
  },
  {
    id: "progress",
    cn: "成长路径",
    en: "progress_pattern",
    note: "rule first",
    detail: {
      example: "卡点 → 突破 → 通关 → 里程碑",
      source: "progress_profile.* / idip_milestone / highlight_event",
      production: "规则优先",
      usage: "用户如何推进、卡关、突破",
    },
  },
  {
    id: "emotion",
    cn: "情绪反应",
    en: "emotional_response",
    note: "AI judge w/ rules",
    detail: {
      example: "失败后想被安慰 / 想被直接复盘",
      source: "companion_profile.* / episode / atomic_facts / user_feedback",
      production: "AI judge with rules",
      usage: "输赢、失败、压力下的反应偏好",
    },
  },
  {
    id: "social",
    cn: "社交方式",
    en: "social_style",
    note: "rule + AI judge",
    detail: {
      example: "solo / duo / squad / mixed",
      source: "social_profile.social_preference / team_game_event",
      production: "规则 + AI judge",
      usage: "单人、组队、协作、分享倾向",
    },
  },
  {
    id: "content",
    cn: "内容偏好",
    en: "content_preference",
    note: "rule first",
    detail: {
      example: "想聊刺客职业 / 不想聊高压复盘",
      source: "user_preferences.* / companion_profile.*",
      production: "规则优先",
      usage: "用户希望桌宠聊什么、记录什么",
    },
  },
];

export default function CharacterChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.13 · 角色相似度 6 维度"
    : `§ 3.13 · ${String(step).padStart(2, "0")} / 06`;
  return (
    <div className="ce-scene">
      <MindMap
        rootLabel="角色相似度"
        rootEn="CHARACTER SIMILARITY"
        branches={DIMENSIONS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "角色相似度 · 6 固定维度" : undefined}
        subtitle={step === 0 ? "不是 82% 像 TA · 是在哪几个特点上像 TA" : undefined}
        radiusScale={0.9}
      />
    </div>
  );
}

import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./ProfileStructure.css";

const SUB_OBJECTS: MindMapBranch[] = [
  {
    id: "identity",
    cn: "基础昵称",
    en: "profile_identity",
    note: "user_set",
    detail: {
      example: "display_name=\"uu\" / preferred_call_name=\"队长\"",
      source: "记忆系统（用户输入）",
      usage: "用户希望被叫作什么；UI 展示和桌宠称呼",
      boundary: "用户直接编辑；不包含称呼风格；AI 严禁自动设置",
    },
  },
  {
    id: "relation",
    cn: "桌宠关系",
    en: "pet_relationship",
    note: "user_set",
    detail: {
      example: "friend / teasing_partner / assistant / quiet_companion",
      source: "记忆系统（用户选择）",
      usage: "用户希望桌宠扮演的关系定位",
      boundary: "用户直接选择；不改变 IP 固定语气；AI 只读",
    },
  },
  {
    id: "game",
    cn: "游戏偏好",
    en: "game_profile",
    note: "user + inferred",
    detail: {
      example: "favorite_roles[\"法师\"] / game_goals[\"rank\"]",
      source: "用户输入 + AI 推断画像项",
      usage: "偏好角色 / 模式 / 游戏目标，决定鼓励方向",
      boundary: "用户可改；AI 推断必须带 evidence_ids；用户更正后不覆盖",
    },
  },
  {
    id: "playstyle",
    cn: "玩法风格",
    en: "playstyle_profile",
    note: "AI + rule",
    detail: {
      example: "playstyle_tags=[\"steady_growth\", \"team_support\"]",
      source: "Memory Intelligence + 用户可改",
      production: "AI + 规则混合；输入 chat / game_event / idip_delta",
      boundary: "只描述游戏内行为，不能上升到现实人格",
    },
  },
  {
    id: "companion",
    cn: "陪伴偏好",
    en: "companion_profile",
    note: "user priority",
    detail: {
      example: "emotion_support=\"comfort_first\" / 打扰边界 / 雷点话题",
      source: "用户输入优先 + AI 话题推断",
      usage: "情绪陪伴方式 / 打扰边界 / 想聊 / 不想聊的话题",
      boundary: "用户直接设置优先；AI 严禁覆盖；不踩雷",
    },
  },
  {
    id: "progress",
    cn: "进度成就",
    en: "progress_profile",
    note: "game_event",
    detail: {
      example: "current_goal / stuck_points / recent_achievements",
      source: "首方 game_event + 用户更正",
      usage: "知道用户最近在忙什么、卡哪儿、刚成就什么",
      boundary: "仅游戏内进度；用户可删 / 说『这不准』",
    },
  },
  {
    id: "social",
    cn: "社交偏好",
    en: "social_profile",
    note: "low-conf only",
    detail: {
      example: "social_preference = solo / duo / squad / mixed",
      source: "用户输入 + AI 推断画像项",
      usage: "控制组队语气",
      boundary: "用户设置优先；AI 只做低置信推断；不记录队友个人信息",
    },
  },
];

export default function ProfileStructureChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.10 · 用户画像 7 子对象"
    : `§ 3.10 · ${String(step).padStart(2, "0")} / 07`;
  return (
    <div className="ps-scene">
      <MindMap
        rootLabel="用户画像"
        rootEn="PROFILE"
        branches={SUB_OBJECTS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "用户画像 · 7 子对象" : undefined}
        subtitle={step === 0 ? "只写游戏内行为偏好 · 不写现实人格" : undefined}
        radiusScale={0.95}
      />
    </div>
  );
}

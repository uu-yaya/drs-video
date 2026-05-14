import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./ProfileMetaDetail.css";

const AI_MATRIX: MindMapBranch[] = [
  {
    id: "user_direct",
    cn: "用户直接定义",
    en: "USER-DEFINED",
    note: "AI 只读",
    detail: {
      example: "display_name / preferred_call_name / relationship_mode / 情绪偏好 / 打扰边界",
      production: "AI 只读，不可写",
      usage: "用户身份与陪伴方式的硬偏好",
      boundary: "用户可改 / 删 / 重置；AI 不得自动设置",
    },
  },
  {
    id: "ip_locked",
    cn: "IP 固定只读",
    en: "IP-LOCKED",
    note: "用户不可改",
    detail: {
      example: "addressing_style / tone_preferences / 口癖 / 毒舌 / 温柔 / 直率",
      source: "游戏 IP runtime 配置注入",
      production: "AI 只能遵守；不进 profile",
      boundary: "用户不可修改；属于 IP 角色设定",
    },
  },
  {
    id: "user_pref",
    cn: "用户明确偏好",
    en: "USER PREF",
    note: "inferred 可写",
    detail: {
      example: "preferred_topics / avoided_topics / game_goals",
      production: "可写入 inferred 项；必须带 evidence_ids / source / method / confidence",
      usage: "AI 推断补充用户偏好",
      boundary: "用户改后不再被 AI 覆盖",
    },
  },
  {
    id: "inferred",
    cn: "游戏内推断",
    en: "GAME INFERRED",
    note: "证据驱动",
    detail: {
      example: "playstyle_profile.* / progress_profile.* / social_preference",
      source: "chat + first-party game_event + idip + feedback",
      production: "必须带 evidence_ids / source / method / confidence",
      boundary: "用户可编辑 / 删除 / 说『这不像 / 这不准』",
    },
  },
  {
    id: "summary",
    cn: "总结字段",
    en: "profile.summary",
    note: "授权可写",
    detail: {
      example: "\"偏好法师与稳健发育，最近在练排位节奏\"",
      production: "profile_inference=true 时自动重写；关闭后仅『重新总结我』可触发",
      usage: "一句话画像，给桌宠上下文定调",
      boundary: "用户可点『重新总结』/ 删除",
    },
  },
  {
    id: "forbidden",
    cn: "禁止写入",
    en: "FORBIDDEN",
    note: "现实身份等",
    detail: {
      example: "现实身份 / 年龄 / 性别 / 住址 / 职业 / 健康 / 政治宗教 / 性取向",
      production: "禁止推断和写入",
      usage: "不展示、不写日志、不写测定结果",
      boundary: "羞辱性标签 / 队友个人信息一并禁止",
    },
  },
];

export default function ProfileMetaDetailChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.10 · AI 写入权限矩阵"
    : `§ 3.10 · ${String(step).padStart(2, "0")} / 06`;
  return (
    <div className="pd-scene">
      <MindMap
        rootLabel="AI 写入权限"
        rootEn="AI WRITE MATRIX"
        branches={AI_MATRIX}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "AI 写入权限矩阵 · 6 类" : undefined}
        subtitle={step === 0 ? "用户改过的字段 · AI 不再覆盖" : undefined}
        radiusScale={0.9}
      />
    </div>
  );
}

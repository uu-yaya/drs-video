import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./Modules.css";

const MODULES: MindMapBranch[] = [
  {
    id: "chat",
    cn: "聊天数据",
    en: "chat",
    note: "P0",
    detail: {
      direction: "首方对话回写 + 记忆系统供给摘要 / 原子事实",
      usage: "陪伴对话、AI 推断画像项、日记 / 高光素材",
      boundary: "只读用户和桌宠的对话；不读用户第三方 IM / 邮件",
    },
  },
  {
    id: "behavior-pc",
    cn: "PC 进程行为",
    en: "behavior_pc",
    note: "P0",
    detail: {
      direction: "记忆系统供给低敏 OS 信号",
      usage: "判断用户是否在游戏 / 工作 / 离开，避免乱打扰",
      boundary: "只看用户在用什么 app；不读 app 内容",
    },
  },
  {
    id: "behavior-ui",
    cn: "UI 行为操作",
    en: "behavior_ui",
    note: "P0 + P1",
    detail: {
      direction: "记忆系统供给低敏信号 + 桌宠侧实时生成状态",
      usage: "打扰判断、当前状态理解、界面提示理解",
      boundary: "不记录用户按了什么键；窗口标题去除文件名 / 路径 / 用户名",
    },
  },
  {
    id: "mcp",
    cn: "MCP 信号",
    en: "mcp_summary",
    note: "P1",
    detail: {
      direction: "用户授权后由记忆系统供给 app 元数据 / 摘要",
      usage: "任务 / 平台状态提醒、跨 app 轻量上下文",
      boundary: "仅 app 元数据 / 摘要；不读消息 / 邮件 / 文档正文",
    },
  },
  {
    id: "idip",
    cn: "游戏 idip",
    en: "game_idip",
    note: "P0",
    detail: {
      direction: "合作游戏数据进入记忆系统，供桌宠读取 / 复盘",
      usage: "理解等级、段位、任务进度、卡点和突破",
      boundary: "首方游戏数据；不存真实账号 / 付费记录 / 实名信息",
    },
  },
  {
    id: "game-event",
    cn: "游戏实时事件",
    en: "game_event",
    note: "P0",
    detail: {
      direction: "合作游戏实时事件进入记忆系统，供桌宠即时反应",
      usage: "对局中建议、死亡 / 通关 / 结算反应、赛后复盘",
      boundary: "首方游戏 SDK 推送的事件流",
    },
  },
  {
    id: "vlm",
    cn: "VLM 画面理解",
    en: "game_vlm",
    note: "P1",
    detail: {
      direction: "桌宠侧实时生成语义标签；必要时只回写语义结果",
      usage: "识别当前游戏场景，支持即时吐槽、提醒、高光解释",
      boundary: "用户单 app 显式开启（默认关）；只看当前授权游戏窗口；不存原图",
    },
  },
  {
    id: "current_context",
    cn: "当前上下文",
    en: "current_context",
    note: "P0",
    detail: {
      direction: "桌宠侧实时生成，短期服务当前体验",
      usage: "判断现在该不该说话、说什么、用什么力度",
      boundary: "派生切面（仅状态标签，不存原始内容）",
    },
  },
  {
    id: "profile_meta",
    cn: "元字段",
    en: "profile_meta",
    note: "P0",
    detail: {
      direction: "记忆系统供给来源 / 证据 / 置信度；桌宠可回写用户反馈",
      usage: "解释为什么这么懂我，支撑用户更正",
      boundary: "每条画像标证据来源、生成方式和证据 ID；用户改过的不再自动覆盖",
    },
  },
  {
    id: "profile",
    cn: "用户画像",
    en: "profile",
    note: "P0 + P1",
    detail: {
      direction: "记忆系统供给长期画像；桌宠回写 AI 推断画像项 / 用户更正",
      usage: "长期个性化陪伴、建议、复盘、内容雷点规避",
      boundary: "不含个人身份信息；用户更正后 AI 不再覆盖",
    },
  },
  {
    id: "highlight_event",
    cn: "高光事件",
    en: "highlight_event",
    note: "P1",
    detail: {
      direction: "桌宠侧生成建议；用户保存 / 编辑后回写记忆系统",
      usage: "保存成就、成长节点、可分享记忆、日记素材",
      boundary: "引用对话原文要先过个人身份信息检测；用户标私密的不进分享卡片",
    },
  },
  {
    id: "user_preferences",
    cn: "用户偏好",
    en: "user_preferences",
    note: "P0 + P1",
    detail: {
      direction: "用户显式配置与控制，记忆系统持久化，桌宠读取执行",
      usage: "让用户控制怎么陪、记什么、删什么、哪里不准",
      boundary: "授权默认关；必须用户主动勾选才开启；AI 不准自动设置",
    },
  },
  {
    id: "character_similarity",
    cn: "角色相似度",
    en: "char_similarity",
    note: "P1",
    detail: {
      direction: "产品内大模型基于授权数据生成；结果必须回写记忆系统",
      usage: "核心卖点——告诉用户像哪个游戏角色，以及像在哪里",
      boundary: "用户主动触发并同意本次测定后调用；测定结果默认不驱动陪伴策略",
    },
  },
];

export default function ModulesChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord =
    step === 0
      ? "§ 2.1 · 13 数据模块全景"
      : `§ 2.1 · ${String(step).padStart(2, "0")} / 13`;

  return (
    <div className="mo-scene">
      <MindMap
        rootLabel="13 数据模块"
        rootEn="DATA MODULES"
        branches={MODULES}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "13 个数据模块全景" : undefined}
        subtitle={step === 0 ? "每个模块 · 字段表 / 语义 / 边界 / Schema" : undefined}
        radiusScale={1.05}
      />
    </div>
  );
}

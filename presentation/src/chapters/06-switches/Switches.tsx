import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./Switches.css";

const SWITCHES: MindMapBranch[] = [
  {
    id: "chat",
    cn: "聊天入长期记忆",
    en: "chat_memory",
    note: "P0",
    detail: {
      usage: "允许用户与桌宠的首方对话进入长期记忆",
      production: "首启询问；未选择即视为关",
      priority: "P0",
    },
  },
  {
    id: "game_event",
    cn: "游戏事件长期画像",
    en: "game_event_memory",
    note: "P0",
    detail: {
      usage: "首方 game_event / idip 可用于进度 / 成就 / 目标画像",
      production: "核心实时反应可用；长期画像写入可关",
      priority: "P0",
    },
  },
  {
    id: "ai_infer",
    cn: "AI 推断画像项",
    en: "profile_inference",
    note: "P0",
    detail: {
      usage: "允许产品内大模型基于授权数据整理用户画像字段",
      production: "首启询问；用户可暂停",
      priority: "P0",
    },
  },
  {
    id: "mem_ctl",
    cn: "记忆管理",
    en: "memory_controls",
    note: "P0",
    detail: {
      usage: "删除 / 清空 / 重新总结我 / 以后别这样记",
      production: "始终可用",
      priority: "P0",
    },
  },
  {
    id: "companion",
    cn: "基础陪伴偏好",
    en: "companion_basic",
    note: "P0",
    detail: {
      usage: "设置打扰强度、复盘颗粒度、失败后是否复盘",
      production: "首启可选；未设置走保守默认",
      priority: "P0",
    },
  },
  {
    id: "behavior",
    cn: "行为数据画像",
    en: "behavior_data",
    note: "P1",
    detail: {
      usage: "OS 低敏行为信号可用于打扰判断 / 玩法风格推断",
      production: "默认关",
      priority: "P1",
    },
  },
  {
    id: "vlm",
    cn: "画面理解",
    en: "vlm_visual",
    note: "P1",
    detail: {
      usage: "桌宠理解当前授权游戏窗口画面，生成场景标签",
      production: "默认关；按 app 开启",
      priority: "P1",
    },
  },
  {
    id: "ui_text",
    cn: "界面文字读取",
    en: "ui_text_reading",
    note: "P1",
    detail: {
      usage: "读取当前授权窗口的按钮、弹窗、游戏提示文字",
      production: "默认关；按 app 开启",
      priority: "P1",
    },
  },
  {
    id: "mcp",
    cn: "MCP 接入",
    en: "mcp_sources",
    note: "P1",
    detail: {
      usage: "启用 MCP app 列表（用户单 app 勾选）",
      production: "默认关",
      priority: "P1",
    },
  },
  {
    id: "diary",
    cn: "日记 / 高光生成",
    en: "diary_highlight",
    note: "P1",
    detail: {
      usage: "允许桌宠生成日记草稿、高光摘要和分享文案",
      production: "默认关；用户开启或保存时触发",
      priority: "P1",
    },
  },
  {
    id: "char_sim",
    cn: "角色相似度测定",
    en: "char_similarity",
    note: "P1",
    detail: {
      usage: "基于授权数据生成『像哪个游戏角色』结果",
      production: "默认关；用户主动触发",
      priority: "P1",
    },
  },
  {
    id: "audio",
    cn: "系统音频感知",
    en: "audio_music",
    note: "EXT",
    detail: {
      usage: "扩展能力；只允许提取音乐 / 氛围等低敏语义",
      production: "默认关",
      priority: "扩展",
    },
  },
];

export default function SwitchesChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 2.2 · 12 项用户开关"
    : `§ 2.2 · ${String(step).padStart(2, "0")} / 12`;
  return (
    <div className="sw-scene">
      <MindMap
        rootLabel="用户开关"
        rootEn="USER SWITCHES"
        branches={SWITCHES}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "12 项用户开关" : undefined}
        subtitle={step === 0 ? "5 P0 + 6 P1 + 1 扩展 · 几乎全部默认关" : undefined}
        radiusScale={1.05}
      />
    </div>
  );
}

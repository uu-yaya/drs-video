import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsVlm.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "enabled",
    cn: "VLM 单 app 开关",
    en: "vlm_enabled_for_this_app_instance",
    note: "P1 · 默认关",
    detail: {
      example: `true / false`,
      source: "记忆系统",
      production: "用户在该 app 实例的桌宠设置面板手动开启；默认关闭",
      boundary: "用户单 app 显式开启（默认关）",
      priority: "P1",
      usage: "每个 app 实例独立开关",
    },
  },
  {
    id: "category",
    cn: "app 类别",
    en: "app_category",
    note: "P1 · 仅游戏窗口",
    detail: {
      example: `game`,
      source: "记忆系统",
      production: "用户输入：桌宠设置加入白名单时选定；当前仅支持游戏窗口",
      boundary: "用户配置",
      priority: "P1",
      usage: "区分当前能力范围",
    },
  },
  {
    id: "tags",
    cn: "场景语义标签",
    en: "semantic_tags[]",
    note: "P1 · ≤5 · 枚举",
    detail: {
      example: `["boss_fight", "low_hp"]`,
      source: "桌宠侧实时生成 / 产品内大模型服务",
      production: "输入授权游戏窗口视觉帧 buffer ≤60s；输出枚举 schema 标签",
      boundary: "授权窗口 + buffer ≤60s；不存原图；不训练；不留帧日志",
      priority: "P1",
      usage: "场景标签（boss_fight / low_hp / scene_funny 等）",
    },
  },
  {
    id: "summary",
    cn: "用户可见摘要",
    en: "user_visible_summary",
    note: "P1 · ≤50 字",
    detail: {
      example: `"BOSS 战残血，紧张时刻"`,
      source: "桌宠侧实时生成 / 产品内大模型服务",
      production: "输入授权游戏窗口视觉帧 buffer；输出一句话用户可见描述",
      boundary: "不输出用户身份 / 账号 / 聊天 / 字幕原文 / 他人信息",
      priority: "P1",
      usage: `"刚才那段是搞笑剧情"`,
    },
  },
];

export default function FieldsVlmChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.7 · VLM 字段表"
    : `§ 3.7 · ${String(step).padStart(2, "0")} / 04`;
  return (
    <div className="fv-scene">
      <MindMap
        rootLabel="VLM 画面理解"
        rootEn="§ 3.7 VLM"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "VLM 字段表 · 4 字段" : undefined}
        subtitle={step === 0 ? "默认关 · 按 app 开启 · 不存原图 · 不训练 · 不留帧日志" : undefined}
        radiusScale={0.8}
      />
    </div>
  );
}

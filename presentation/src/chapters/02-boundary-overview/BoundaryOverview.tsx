import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./BoundaryOverview.css";

const BOUNDARIES: MindMapBranch[] = [
  {
    id: "core",
    cn: "核心业务数据",
    en: "CORE BUSINESS",
    note: "用户优先级最高",
    detail: {
      example: "用户配置 / 首方游戏 / 首方对话 / 角色相似度",
      source: "用户输入 + 首方游戏 + 首方桌宠交互",
      usage: "桌宠体验骨架；用户最高优先级",
      boundary: "大模型不能自动开启授权、改删除策略或覆盖用户更正",
    },
  },
  {
    id: "enhance",
    cn: "授权增强数据",
    en: "AUTHORIZED ENHANCEMENT",
    note: "默认全关",
    detail: {
      example: "低敏 PC context / MCP / VLM / 系统音频 / 产品内模型",
      source: "OS API / MCP / VLM / 产品内大模型",
      usage: "理解上下文、跨 app 信号、画面语义",
      boundary: "默认关 · 按 app 授权 · 字段白名单 · 不读 app 正文",
    },
  },
  {
    id: "semantic",
    cn: "语义结果保留",
    en: "SEMANTIC-ONLY",
    note: "原始内容丢",
    detail: {
      example: "场景标签 / 音频氛围 / 输入强度桶 / app 摘要",
      production: "只保留语义标签与可见摘要，丢弃原始 payload",
      usage: "复盘、高光解释、状态判断",
      boundary: "不存原图 / 原音 / raw OS context / 第三方正文",
    },
  },
  {
    id: "forbid",
    cn: "禁止采集与回写",
    en: "FORBIDDEN",
    note: "5 条死禁红线",
    detail: {
      example: "Recall / keylog / 第三方正文 / 原图原音 / 人声转写",
      production: "不采、不存、不上传、不训练、不进画像",
      usage: "明确写死的硬边界，不留灰区",
      boundary: "任何模型、后台任务都不能绕过；用户授权也不打开",
    },
  },
];

export default function BoundaryOverviewChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 1.2 · 数据与隐私边界"
    : `§ 1.2.${step} · ${String(step).padStart(2, "0")} / 04`;
  return (
    <div className="bo-scene">
      <MindMap
        rootLabel="数据边界"
        rootEn="DATA BOUNDARY"
        branches={BOUNDARIES}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "数据边界 · 4 类" : undefined}
        subtitle={step === 0 ? "DRS §1.2 · 用户授权 / 删除策略 / 用户更正 三道闸" : undefined}
        radiusScale={0.85}
      />
    </div>
  );
}

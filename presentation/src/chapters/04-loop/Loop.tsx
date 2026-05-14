import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./Loop.css";

const PATHS: MindMapBranch[] = [
  {
    id: "user-config",
    cn: "用户配置",
    en: "USER → MEMORY",
    note: "优先级最高",
    detail: {
      direction: "用户 → 记忆系统 → 桌宠读取",
      example: "称呼 / 关系 / 打扰边界 / 授权开关 / 删除 / 重新总结 / 更正",
      usage: "用户最高优先级；大模型不能自动开启或覆盖",
      boundary: "授权 / 删除 / 清空 / 重新总结 只能由用户触发",
    },
  },
  {
    id: "memory-feed",
    cn: "记忆系统供给",
    en: "MEMORY → PET",
    note: "反查来源",
    detail: {
      direction: "记忆系统 → 桌宠",
      example: "画像 / 长期记忆 / 摘要 / 进度 / 成就 / 高光 / 证据",
      usage: "桌宠只能在授权范围内读取",
      boundary: "每条可解释数据都能追溯来源或证据",
    },
  },
  {
    id: "pet-realtime",
    cn: "桌宠实时生成",
    en: "PET RUNTIME",
    note: "默认不入长期",
    detail: {
      direction: "桌宠 / 产品内大模型 → 当前体验",
      example: "实时对话 / 建议 / 打扰判断 / 草稿 / VLM 语义标签",
      usage: "默认只服务当前体验",
      boundary: "VLM 只留语义结果不存原图；需长期引用才回写",
    },
  },
  {
    id: "pet-writeback",
    cn: "桌宠回写记忆",
    en: "PET → MEMORY",
    note: "必带证据",
    detail: {
      direction: "桌宠 → 记忆系统",
      example: "对话 / 反馈 / 更正 / AI 推断画像项 / 高光 / 角色相似度",
      production: "必须带来源、时间、证据、授权快照或用户动作",
      boundary: "角色相似度结果必须回写，便于查看 / 删除 / 反馈 / 重测",
    },
  },
  {
    id: "never-enters",
    cn: "不进循环",
    en: "⊘ NEVER ENTERS",
    note: "不采 · 不存 · 不回写",
    detail: {
      direction: "不采 / 不存 / 不回写",
      example: "原图 / 原音 / 人声转写 / 通话 / keylog / 第三方正文",
      boundary: "授权后只允许最小化处理的必要语义结果",
      usage: "对应 §1.2.4 五条死禁红线",
    },
  },
];

export default function LoopChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 1.3.1 · 五类数据循环"
    : `§ 1.3.1 · ${String(step).padStart(2, "0")} / 05`;
  return (
    <div className="lp-scene">
      <MindMap
        rootLabel="数据循环"
        rootEn="DATA LOOP"
        branches={PATHS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "五类数据循环" : undefined}
        subtitle={step === 0 ? "桌宠 ↔ 记忆系统 · 5 条流向" : undefined}
        radiusScale={0.9}
      />
    </div>
  );
}

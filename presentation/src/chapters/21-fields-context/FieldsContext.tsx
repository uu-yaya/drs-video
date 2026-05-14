import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsContext.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "topic",
    cn: "活动主题",
    en: "activity_topic",
    note: "P0 · 规则 + AI 补",
    detail: {
      example: `"在打游戏 BOSS 战"`,
      source: "Consumer Runtime",
      production: "规则优先 + 大模型按需补充；结构化变化推送 + 心跳",
      boundary: "滑窗派生，不含原始内容",
      priority: "P0",
      usage: "桌宠对话的话题锚",
    },
  },
  {
    id: "mood",
    cn: "情绪估计",
    en: "mood_estimate",
    note: "P0 · AI + 规则",
    detail: {
      example: "紧张 / 平静 / 兴奋 / 沮丧 / unknown",
      source: "Consumer Runtime",
      production: "AI + 规则滑窗推导；低置信输出 unknown",
      boundary: "游戏场景情绪线索，不做心理诊断",
      priority: "P0",
      usage: "决定回应策略",
    },
  },
  {
    id: "interrupt",
    cn: "打扰适宜度",
    en: "interrupt_suitability",
    note: "P0 · 加权派生",
    detail: {
      example: "high / medium / low",
      source: "Consumer Runtime",
      production: "多信号加权派生；跨级变化立即推送",
      boundary: "派生标量",
      priority: "P0",
      usage: "打扰决策唯一输入（桌宠不自判）",
    },
  },
  {
    id: "attention",
    cn: "注意力目标",
    en: "attention_target",
    note: "P0 · 规则映射",
    detail: {
      example: `"游戏" / "IDE" / "视频"`,
      source: "Consumer Runtime",
      production: "active_app + 标题 + app_category 规则映射",
      boundary: "派生标量",
      priority: "P0",
      usage: "桌宠决定看哪个屏幕方向",
    },
  },
  {
    id: "confidence",
    cn: "置信度",
    en: "confidence",
    note: "P0 · 滑窗信号",
    detail: {
      example: "0.85",
      source: "Consumer Runtime",
      production: "规则：滑窗内有效信号数量；< 阈值则低置信",
      boundary: "派生标量",
      priority: "P0",
      usage: "低置信时桌宠保守",
    },
  },
  {
    id: "trigger",
    cn: "推送原因",
    en: "trigger",
    note: "P0 · 4 枚举",
    detail: {
      example: "mood_change / heartbeat / 等",
      source: "记忆系统",
      production: "系统标签；每次 push 时设置",
      boundary: "系统标签",
      priority: "P0",
      usage: "标识推送原因",
    },
  },
  {
    id: "source",
    cn: "来源掩码",
    en: "source_mask",
    note: "P0 · 审计 / 解释",
    detail: {
      example: "{chat_realtime:true, behavior_runtime:true, ...}",
      source: "Consumer Runtime",
      production: "授权裁剪记录；生成时同步写入",
      boundary: "不含原始内容；用于审计和解释",
      priority: "P0",
      usage: "解释当前判断用了哪些数据",
    },
  },
];

export default function FieldsContextChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.8 · current_context 字段表"
    : `§ 3.8 · ${String(step).padStart(2, "0")} / 07`;
  return (
    <div className="fctx-scene">
      <MindMap
        rootLabel="current_context"
        rootEn="§ 3.8 CONTEXT"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "current_context 字段表 · 7 字段" : undefined}
        subtitle={step === 0 ? "桌宠对话决策核心切面 · 派生标量 · 不沉淀原始内容" : undefined}
        radiusScale={0.95}
      />
    </div>
  );
}

import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsChat.css";

const FIELDS: MindMapBranch[] = [
  {
    id: "chat_text",
    cn: "聊天原文",
    en: "chat_text",
    note: "P0 · 首方 only",
    detail: {
      example: `"刚才那把翻盘了！"`,
      source: "记忆系统",
      production: "桌宠 chat runtime 直采，允许保存为首方对话历史",
      boundary: "首方对话 only；不读第三方 IM / 邮件；可按消息删除",
      priority: "P0",
      usage: "对话历史、实时上下文",
    },
  },
  {
    id: "atomic_facts",
    cn: "原子事实",
    en: "atomic_facts[]",
    note: "P0 · AI 抽取",
    detail: {
      example: `[{fact:"用户喜欢稳定策略", quote_eligible:true}]`,
      source: "Memory Intelligence",
      production: "Memory Subagent AI 抽取；segment 闭合触发；schema 约束",
      boundary: "引用必须 quote_eligible=true；关闭聊天入长期记忆后不新增",
      priority: "P0",
      usage: "短期对话引用",
    },
  },
  {
    id: "episode",
    cn: "情节",
    en: "episode",
    note: "P0 · AI 摘要",
    detail: {
      example: `{title:"讨论刺客天赋树调整", time_range:{...}}`,
      source: "Memory Intelligence",
      production: "Memory Subagent AI 摘要；聚合 N 条 atomic_facts → 1 episode",
      boundary: "同 atomic_facts；元数据仅时间和参与方",
      priority: "P0",
      usage: "跨日召回",
    },
  },
  {
    id: "emotion_signal",
    cn: "情绪信号",
    en: "emotion_signal",
    note: "P0 · 分类器",
    detail: {
      example: `"兴奋"（紧张/兴奋/沮丧/平静）`,
      source: "Consumer Runtime",
      production: "本地轻量分类器 + 关键词规则；chat 每 segment 实时",
      boundary: "派生标量，不含内容",
      priority: "P0",
      usage: "决定语气",
    },
  },
  {
    id: "quote_eligible",
    cn: "原话可引用",
    en: "atomic_facts.quote_eligible",
    note: "P0 · 个人身份信息检测",
    detail: {
      example: `true / false`,
      source: "Memory Intelligence",
      production: "规则个人身份信息检测：正则 + NER；生产 atomic_facts 时同步打标",
      boundary: "个人身份信息检测：人名/邮箱/手机/财务关键词",
      priority: "P0",
      usage: "日记 / 高光引用原话的隐私安全开关",
    },
  },
];

export default function FieldsChatChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.1 · chat 字段表"
    : `§ 3.1 · ${String(step).padStart(2, "0")} / 05`;
  return (
    <div className="fc-scene">
      <MindMap
        rootLabel="chat 聊天"
        rootEn="§ 3.1 CHAT"
        branches={FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "chat 字段表 · 5 字段" : undefined}
        subtitle={step === 0 ? "首方对话 only · 不读第三方 IM / 邮件" : undefined}
        radiusScale={0.85}
      />
    </div>
  );
}

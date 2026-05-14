import { MindMap, type MindMapBranch } from "../../components/MindMap";
import type { ChapterStepProps } from "../../registry/types";
import "./ProfileMeta.css";

const META_FIELDS: MindMapBranch[] = [
  {
    id: "confidence",
    cn: "置信度",
    en: "confidence",
    note: "4 档 high—blocked",
    detail: {
      example: "0.7",
      source: "Memory Intelligence",
      production: "由来源可靠性、证据数量、新鲜度、用户反馈共同决定",
      usage: "引用前判断『是否说出来』",
      boundary: "AI judge 只提供证据解释，不自评置信度",
    },
  },
  {
    id: "source",
    cn: "证据来源域",
    en: "source_category",
    note: "9 枚举",
    detail: {
      example: "[\"chat\", \"game_event\", \"idip\"]",
      source: "记忆系统",
      production: "每条 profile 字段写入时记录证据来自哪里",
      usage: "解释这条画像基于什么数据",
      boundary: "可数组或主来源 + 次来源；与生成方式分开",
    },
  },
  {
    id: "method",
    cn: "生成方式",
    en: "generation_method",
    note: "3 枚举",
    detail: {
      example: "user_set / system_record / inferred",
      source: "记忆系统",
      production: "user_set / system_record / inferred 三选一",
      usage: "解释这条画像怎么来的",
      boundary: "与 source_category 分离；避免混淆来源和生成方式",
    },
  },
  {
    id: "evidence",
    cn: "证据 ID 数组",
    en: "evidence_ids",
    note: "可反查",
    detail: {
      example: "[\"game_event_2026050800123\", \"episode_2026051000031\"]",
      source: "记忆系统",
      production: "AI / 规则推断画像项必须写入；user_set 可空或指 user_action_id",
      usage: "来源反查、解释、用户质疑时定位证据",
      boundary: "指向 ID，不含原始内容",
    },
  },
];

export default function ProfileMetaChapter({ step }: ChapterStepProps) {
  const activeIndex = step === 0 ? -1 : step - 1;
  const ord = step === 0
    ? "§ 3.9 · profile_meta 4 核心字段"
    : `§ 3.9 · ${String(step).padStart(2, "0")} / 04`;
  return (
    <div className="pm-scene">
      <MindMap
        rootLabel="profile_meta"
        rootEn="META FIELDS"
        branches={META_FIELDS}
        activeIndex={activeIndex}
        ord={ord}
        title={step === 0 ? "profile_meta · 4 核心字段" : undefined}
        subtitle={step === 0 ? "每条画像字段都拖着一份元字段 · 来源可解释" : undefined}
        radiusScale={0.85}
      />
    </div>
  );
}
